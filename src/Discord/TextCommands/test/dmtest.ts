import { Message } from "discord.js"
export = {
    "name":"dmtest",
    "usage":`${require("../../default").defaultprefix}dmtest`,
    "description":"Reply With Testt",
    "DMOnly":true,
    "execute":async function(msg:Message, command:string, args:Array<string>, prefix:string){
        msg.reply("Testt")
    }
}