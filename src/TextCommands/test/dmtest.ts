import { Message } from "discord.js"
module.exports = {
    "name":"dmtest",
    "usage":`${require("../../default").defaultprefix}dmtest`,
    "description":"Reply With Testt",
    "DMOnly":true,
    "execute":async function(msg:Message, command:String, args:string[], prefix:string){
        msg.reply("Testt")
    }
}