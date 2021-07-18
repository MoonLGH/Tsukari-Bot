import { Message } from "discord.js"
module.exports = {
    "name":"test",
    "usage":`${require("../../default").defaultprefix}test`,
    "description":"Reply With Testt",
    "execute":async function(msg:Message, command:String, args:Array<any>, prefix:string){
        msg.reply("Testt")
    }
}