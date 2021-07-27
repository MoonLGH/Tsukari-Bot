import { Message } from "discord.js"
module.exports = {
    "name":"search",
    "usage":`${require("../../default").defaultprefix}anime search "title" {type(anime, manga, person, character)}`,
    "description":"Search anime/manga/person/character",
    "execute":async function(msg:Message, command:String, args:Array<any>, prefix:string,alias:string){
        msg.channel.send(args.join(" "))
    }
}