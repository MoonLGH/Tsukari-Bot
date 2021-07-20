import { Message } from "discord.js"
module.exports = {
    "name":"ytt",
    "usage":`${require("../../default").defaultprefix}ytt`,
    "description":"Play Something together on yt",
    "execute":async function(msg:any, command:String, args:Array<any>, prefix:string){
        const invite = await msg.client.together.generateTogetherCode(msg.member.voice.channelID, 'youtube')
        msg.channel.send(`${invite.code}`); // Click the blue link !x
    }
}