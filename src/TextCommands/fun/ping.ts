import { Message } from "discord.js"
module.exports = {
    "name":"ping",
    "usage":`${require("../../default").defaultprefix}ping`,
    "description":"Reply With Pong",
    "alias":["pong"],
    "execute":async function(msg:Message, command:String, args:Array<any>, prefix:string,alias:string){
        if(alias === "pong"){
           return msg.reply("ping")
        }else{
            return msg.reply("Pong")
        }
    }
}