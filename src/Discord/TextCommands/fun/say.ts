import { Message } from "discord.js"
export = {
    "name":"say",
    "usage":`${require("../../default").defaultprefix}say "Message Here"`,
    "description":"Say Something",
    "alias":["echo"],
    "execute":async function(msg:Message, command:string, args:Array<string>, prefix:string,alias:string){
        msg.channel.send(args.join(" "))
    }
}