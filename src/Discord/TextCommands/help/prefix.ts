import { Message, MessageEmbed } from "discord.js"
import db from "../../../MongoDB/db"

export = {
    "name":"prefix",
    "usage":`${require("../../default").defaultprefix}prefix`,
    "description":"Show Prefix",
    "execute":async function(msg:Message, command:String, args:Array<any>, prefix:string){
        let botprefix:Array<string> = require("../../default").defaultprefixes
        if(msg.guild){
            let getdb = await db.fetchGuild(msg.guild.id)
            botprefix = getdb.prefix
        }
        let Embed = new MessageEmbed()
        .setTitle("Prefix")
        .addField("Prefixes", botprefix.join(", "))
        .addField("DefaultPrefix", botprefix[0])
        if(msg.guild){
            Embed.addField("Add Prefix",`Add new prefix by using ${botprefix[0]}prefix add <PrefixHere>`)
            Embed.addField("Remove Prefix",`Remove prefix by using ${botprefix[0]}prefix remove <PrefixHere>`)
        }

        if(args.length === 0){
            msg.channel.send({embeds:[Embed]})
        }else if(args[0].toLowerCase() === "add" && msg.guild){
            let getdb = await db.fetchGuild(msg.guild.id)
 
            if(getdb.prefix.includes(args[1])){
                msg.channel.send("Prefix already exists")
            }else{
                getdb.prefix.push(args[1])
                getdb.save()
                msg.channel.send("Prefix added")
            }
        }else if(args[0].toLowerCase() === "remove" && msg.guild){
            let getdb = await db.fetchGuild(msg.guild.id)
            if(getdb.prefix.includes(args[1])){
                getdb.prefix = getdb.prefix.filter(x => x.toLowerCase() !== args[1].toLowerCase())
                getdb.save()
                msg.channel.send("Prefix Removed")
            }else{
                msg.channel.send("Prefix doesn't exist")
            }
        }
    }
}