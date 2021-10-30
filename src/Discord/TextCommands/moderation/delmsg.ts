import { Collection, Message,MessageEmbed,Snowflake } from "discord.js"
import config from "../../default"

export = {
    "name":"delmsg",
    "usage":`${config.defaultprefix}delmsg [ammout]`,
    "description":"Delete Message on channel for spesific ammout",
    "guildOnly":true,
    "alias":["purge"],
    "permission":["MANAGE_MESSAGES"],
    "execute":async function(msg:Message, command:string, args:Array<string>){
        const failEmbed = new MessageEmbed().setColor("RED").setDescription(`Please provide a number of messages to delete.`)
        if(!args[0]) return msg.channel?.send({embeds:[failEmbed]})
        const messages:Collection<Snowflake,Message> = await msg.channel.messages.fetch({limit:((args[0] as unknown) as number)})
            let loopcounter = 0
            if ((messages.size <= 100 && messages.size > 0) || ((args[0] as unknown) as number) <= 100) {
                messages.forEach(function(message:Message) {
                    message.delete().catch(console.error);
                    loopcounter++
                    if(loopcounter >= messages.size){
                        const doneembed:MessageEmbed = new MessageEmbed()
                        .setAuthor((msg.client.user?.username as string),msg.client.user?.displayAvatarURL())
                        .setColor(0xFFB200)
                        .setDescription(`${loopcounter} Messages Deleted`)
                        msg.channel.send({embeds:[doneembed]})
                    }
                })
            } else {
                msg.channel.send(`:warning: You can't delete more than 100 messages at once.`);
            }
    }
}