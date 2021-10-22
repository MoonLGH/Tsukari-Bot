import { Message } from "discord.js"
export = {
    "name":"ping",
    "usage":`${require("../../default").defaultprefix}ping`,
    "description":"Reply With Pong",
    "alias":["pong"],
    "execute":async function(msg:Message, command:string, args:Array<string>, prefix:string,alias:string){
        if(alias === "pong"){
           return msg.reply("ping")
        }else{
            return msg.reply("Pong")
        }
    }
}