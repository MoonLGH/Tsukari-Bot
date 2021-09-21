import fetch from "node-fetch";

import {
    Message, MessageEmbed
} from "discord.js"
module.exports = {
    "name": "banner",
    "usage": `${require("../../default").defaultprefix}banner [Id/Member Nick/Mentions]`,
    "description": "Reply With Pong",
    "execute": async function (msg: Message, command: String, args: Array < any > , prefix: string) {
        let user
        if(!args[0]){
            user = msg.author
        }else if(msg.mentions.users.first()){
            user = msg.mentions.users.first()
        }else if(isNaN(args[0])){
            user = await msg.guild?.members.fetch({
                query: args.join(' '),
                limit: 1
            }).then((members:any) => members.first().user).catch(() => null)
        }else if(!isNaN(args[0])){
            user = await msg.client.users.fetch(args[0])
        }else {
            return msg.reply("I Found No One")
        }

        if(!user){
            return msg.reply("Please Mention A User")
        }
        const banner = await getBanner(user.id,msg)

        const embed = new MessageEmbed().setAuthor(user.username,user.displayAvatarURL()).setImage(banner!)
        msg.channel.send({embeds:[embed]})
    }
}

async function getBanner(id:String,msg:Message){
    let response = await fetch(`https://discord.com/api/v8/users/${id}`, {
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
        return Promise.resolve(null);

    const isGif: Boolean = banner.startsWith("a_")

    if (isGif === true) {
        return `https://cdn.discordapp.com/banners/${id}/${banner}.gif?size=1024`
    }
    return `https://cdn.discordapp.com/banners/${id}/${banner}.png?size=1024`
}
