// express side
import * as Express from "express"
var router = Express.Router();


// dotenv
import env from "dotenv"
env.config()

// djs side
import { REST } from "@discordjs/rest"
import { Routes } from 'discord-api-types/v9';
import { Permissions } from 'discord.js';

// more side
import DJS from "../../Discord/index"
import DB from "../../MongoDB/db"
import fetch from "node-fetch"
import { URLSearchParams } from "url";

interface GuildInterface {
    id: string,
    name: string,
    icon: string,
    permissions: Array<string>|string,
    status:string,
    hasTsukari:boolean,
    owner:boolean,
    letters:string
}    

interface GuildsInterface {
    id: string,
    name: string,
    icon: string,
    owner: boolean,
    permissions: number,
    features: Array<string>,
}   
/* GET home page. */

declare module "express-session" {
    interface Session {
      user: {
        accessToken: string,
        tokenType: string,
      };
    }
  }

async function verifySession(req:Express.Request, res:Express.Response, next:Function) {
    if (req.session.user) {
        let { accessToken,tokenType } = req.session.user
        if((await GETMe(accessToken,tokenType))){
            next();
        }else{
            req.session.destroy((err) => {console.log(err)})
            res.redirect("/dashboard/error?message=UserTimeout Please Relogin")
        }
    } else {
        res.redirect("/dashboard/login");
    }
}

async function hasGuild(req:Express.Request, res:Express.Response, next:Function) {
    if (req.session.user) {
        let { accessToken,tokenType } = req.session.user

        if((await GETMe(accessToken,tokenType))){
            let { id } = req.params

            const rest = new REST({ version: '9' }).setToken(accessToken);
            let Guilds = await rest.get(Routes.userGuilds(), {authPrefix:"Bearer"})

            for(let guild of (Guilds as GuildInterface[])){
                guild.hasTsukari = DJS.client.guilds.cache.has(guild.id)
                    if(guild.id === id){
                       if(guild.hasTsukari){
                        let permission = new Permissions(BigInt((guild.permissions as string))).toArray()
                    
                        if(permission.includes("MANAGE_GUILD") || guild.owner){
                            next()
                        }else {
                            res.redirect("/dashboard/error?message=You didnt have needed permission to edit tsukari here")
                        }
                    }else{
                        res.redirect("/dashboard/error?message=Guild not found in tsukari data")
                    }
                }
            }
        }else{
            req.session.destroy((err) => {console.log(err)})
            res.redirect("/dashboard/error?message=UserTimeout Please Relogin")
        }
    } else {
        res.redirect("/dashboard/error?message=Not Logined");
    }
}

async function GETMe(token:string,type:string) {
    try{
        let fetchthings = await fetch('https://discord.com/api/users/@me', {
            headers: {
                authorization: `${type} ${token}`,
            },
        })

        if(fetchthings.status === 200) {
            return fetchthings
        }
    }catch (err){
        return false
    }
}

router.get('/', verifySession, async function(req:Express.Request, res:Express.Response, next?:Function) {
    try {
        let { accessToken,tokenType } = req.session.user
        const rest = new REST({ version: '9' }).setToken(accessToken);
        let Guilds = await rest.get(Routes.userGuilds(), {authPrefix:"Bearer"})

        Guilds = (Guilds as GuildsInterface[]).map((Guild:GuildsInterface) => ({ name:Guild.name, id:Guild.id, icon:Guild.icon, owner:Guild.owner, permissions:new Permissions(BigInt(Guild.permissions)).toArray() }))
            
        let results:GuildInterface[] = []
        for (let guild of (Guilds as GuildInterface[])) {
            guild.hasTsukari = DJS.client.guilds.cache.has(guild.id)
            guild.letters = guild.name.toUpperCase().split(" ").map((letter:string) => letter[0]).join("")
            if(guild.icon){
                guild.icon = `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.${guild.icon.startsWith('a_') ? 'gif' :'jpg'}`
            }
            if(guild.owner){
                guild.status = "OWNER"
            }else if(guild.permissions.includes("MANAGE_GUILD")){
                guild.status = "MANAGE_GUILD"
            }
            if(guild.status){
                results.push(guild)
            }
        }
            // sort results by hasTsukari
            results.sort((a:GuildInterface,b:GuildInterface) => {
                if(a.hasTsukari && !b.hasTsukari){
                    return -1
                }else if(!a.hasTsukari && b.hasTsukari){
                    return 1
                }else{
                    return 0
                }
            })
            return res.render('dashboard/index',{status:"Connected",accessToken:accessToken,tokenType:tokenType,userGuilds:results});
    }catch(err){
        console.log(err)
        res.redirect(`dashboard/error?message=${err}`);
    }
});


router.get("/login", async function(req:Express.Request, res:Express.Response, next?:Function) {
    const { code } = req.query
    let oauth2 = process.env.oauthUrlLoginURL!
    if (code) {
		try {
            let params = new URLSearchParams({
                client_id: DJS.client.user!.id,
                client_secret: process.env.SecretClient || "",
                code:code.toString(),
                grant_type: 'authorization_code',
                redirect_uri: `https://${process.env.host || "localhost:3000"}/dashboard/login`,
                scope: 'identify',
            })

			const oauthResult = await fetch('https://discord.com/api/oauth2/token', {
				method: 'POST',
				body: params,
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
			});

			const oauthData = await oauthResult.json();

			const userResult = await fetch('https://discord.com/api/users/@me', {
				headers: {
					authorization: `${oauthData.token_type} ${oauthData.access_token}`,
				},
			});

            req.session.user = {
                accessToken: oauthData.access_token,
                tokenType: oauthData.token_type,
            }
            return res.redirect('/dashboard');
        } catch (error) {
			// NOTE: An unauthorized token will not throw an error;
			// it will return a 401 Unauthorized response in the try block above
			console.error(error);
        	return res.render('dashboard/login',{status:"Failed",oauth2LoginURL:oauth2});
        }
	}
    return res.render('dashboard/login',{status:"Not Connected",oauth2LoginURL:oauth2});
})

router.get("/guild/:id", hasGuild, async function(req:Express.Request, res:Express.Response, next?:Function) {
    const { id } = req.params
    let { accessToken } = req.session.user
    let dbguild = await DB.fetchGuild(id)

    const rest = new REST({ version: '9' }).setToken(accessToken);
    let Guilds = await rest.get(Routes.userGuilds(), {authPrefix:"Bearer"})
    let dapiguild = (Guilds as GuildInterface[]).find(guild => guild.id === id)

    res.render('dashboard/guild',{dbguild:dbguild,guild:dapiguild})
})

router.get("/guild/:id/prefix", hasGuild, async function(req:Express.Request, res:Express.Response, next?:Function) {
    const { id } = req.params
    let { accessToken } = req.session.user
    let dbguild = await DB.fetchGuild(id)

    const rest = new REST({ version: '9' }).setToken(accessToken);
    let Guilds = await rest.get(Routes.userGuilds(), {authPrefix:"Bearer"})
    let dapiguild = (Guilds as GuildInterface[]).find(guild => guild.id === id)

    let { prefixes } = req.query
    
    dapiguild!.letters = dapiguild!.name.toUpperCase().split(" ").map((letter:string) => letter[0]).join("")

    if(dapiguild!.icon){
        dapiguild!.icon = `https://cdn.discordapp.com/icons/${dapiguild!.id}/${dapiguild!.icon}.${dapiguild!.icon.startsWith('a_') ? 'gif' :'jpg'}`
    }

    if(prefixes){
        let parsedprefix = JSON.parse((prefixes as string))

        if(Array.isArray(parsedprefix)){
            dbguild.prefix = parsedprefix
            await dbguild.save()
        }

        if(parsedprefix.length === 0){
            dbguild.prefix = require("../../Discord/default.js").defaultprefixes
            await dbguild.save()
        }
    }
    res.render('dashboard/prefix',{dbguild:dbguild,guild:dapiguild})
})

router.get("/error", async function(req:Express.Request, res:Express.Response, next?:Function) {
    let message = req.query.message
    res.render('dashboard/error',{Message:message||"404 Request Not Valid"});
})
export = router