import fetch from "node-fetch";

import {
    Collection,
    GuildMember,
    Message, MessageEmbed
} from "discord.js"
import config from "../../default"
export = {
    "name": "banner",
    "usage": `${config.defaultprefix}banner [Id/Member Nick/Mentions]`,
    "description": "Give user banner",
    "execute": async function (msg: Message, command: string, args: Array < string >) {
        let user
        if(!args[0]){
            user = msg.author
        }else if(msg.mentions.users.first()){
            user = msg.mentions.users.first()
        }else if(isNaN((args[0] as unknown) as number)){
            user = await msg.guild?.members.fetch({
                query: args.join(' '),
                limit: 1
            }).then((members:Collection<string,GuildMember>) => members.first()?.user).catch(() => null)
        }else if(!(isNaN((args[0] as unknown) as number))){
            user = await msg.client.users.fetch(args[0])
        }else {
            return msg.reply("I Found No One")
        }

        if(!user){
            return msg.reply("Please Mention A User")
        }
        const banner = await getBanner(user.id,msg)

        const embed = new MessageEmbed().setAuthor(user.username,user.displayAvatarURL())
        if(!banner){
            embed.setDescription("No Banner Found")
            msg.channel.send({embeds:[embed]})
        }
        embed.setImage(banner!)
        msg.channel.send({embeds:[embed]})
    }
}

async function getBanner(id:string,msg:Message){
    const response = await fetch(`https://discord.com/api/v8/users/${id}`, {
        method: 'GET',
        headers: {
            Authorization: `Bot ${msg.client.token}`
        }
    })

    const status = response.status;
    if (status === 404)
        return Promise.resolve(null);

    const jsonData = await response.json();

    const banner = jsonData["banner"];

    if (!banner)
        return null

    const isGif:boolean = banner.startsWith("a_")

    if (isGif === true) {
        return `https://cdn.discordapp.com/banners/${id}/${banner}.gif?size=1024`
    }

    return `https://cdn.discordapp.com/banners/${id}/${banner}.png?size=1024`
}
