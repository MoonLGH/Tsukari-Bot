import { Collection, Message,MessageEmbed,Snowflake } from "discord.js"
export = {
    "name":"delmsg",
    "usage":`${require("../../default").defaultprefix}say "Message Here"`,
    "description":"Say Something",
    "guildOnly":true,
    "alias":["purge"],
    "permission":["MANAGE_MESSAGES"],
    "execute":async function(msg:Message, command:string, args:Array<string>, prefix:string,alias:string){
        let failEmbed = new MessageEmbed().setColor("RED").setDescription(`Please provide a number of messages to delete.`)
        if(!isNaN((args[0] as unknown) as number)||!args[0]) return msg.channel?.send({embeds:[failEmbed]})
        const messages:Collection<Snowflake,Message> = await msg.channel.messages.fetch({limit:((args[0] as unknown) as number)})
            let loopcounter:number = 0
            if ((messages.size <= 100 && messages.size > 0) || ((args[0] as unknown) as number) <= 100) {
                messages.forEach(function(message:Message) {
                    message.delete().catch(console.error);
                    loopcounter++
                    if(loopcounter >= messages.size){
                        let doneembed:MessageEmbed = new MessageEmbed()
                        .setAuthor(msg.client.user?.username!,msg.client.user?.displayAvatarURL())
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