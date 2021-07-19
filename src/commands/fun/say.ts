import { Message } from "discord.js"
module.exports = {
    "name":"say",
    "usage":`${require("../../default").defaultprefix}say "Message Here"`,
    "description":"Say Something",
    "alias":["echo"],
    "execute":async function(msg:Message, command:String, args:Array<any>, prefix:string,alias:string){
        msg.channel.send(args.join(" "))
    }
}