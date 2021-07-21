import { Message } from "discord.js"
module.exports = {
    "name":"search",
    "usage":`${require("../../default").defaultprefix}search "title" <--type>`,
    "description":"Say Something",
    "alias":["echo"],
    "execute":async function(msg:Message, command:String, args:Array<any>, prefix:string,alias:string){
        msg.channel.send(args.join(" "))
    }
}