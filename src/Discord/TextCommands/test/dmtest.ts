import { Message } from "discord.js"
import config from "../../default"
export = {
    "name":"dmtest",
    "usage":`${config.defaultprefix}dmtest`,
    "description":"Reply With Testt",
    "DMOnly":true,
    "execute":async function(msg:Message){
        msg.reply("Testt")
    }
}