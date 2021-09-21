import {
    ButtonInteraction, CommandInteraction, GuildMember, Message, MessageCollector,MessageEmbed,Collection
} from 'discord.js'
module.exports = {
    name: "avatar",
    description: "Challange Someone to play Rock Paper Scissors",
    options: [{
        "name": "target",
        "type": "STRING",
        "required": false,
        "description": "Member Nickname/ID"
    }],
    interaction: async function (interaction: CommandInteraction) {
        let person:any = interaction.options.getString("target")?.replace("<@","").replace("!", "").replace(">","");
        
        let Embed = new MessageEmbed()
        if(!person){
            person = interaction.user;
        }else if(isNaN(person)){
            person = await interaction.guild?.members.fetch({
                query: person,
                limit: 1
            }).then((members:Collection<any,GuildMember>) => members.first()?.user).catch(() => interaction.user)
            if(!person){
                person = interaction.user;
                Embed.setDescription("No Member found with that nickname,So i've give your avatar instead")
            }
        }else if(!isNaN(person)){
            person = await interaction.client.users.fetch(person)
        }

        let avatar = person.displayAvatarURL({format: "png", size: 1024});

        Embed.setAuthor(person.tag, avatar)
        .setImage(avatar)
        .setFooter(person.tag, avatar)
        .setTimestamp()
        .setColor("#AF98CA")

        interaction.reply({embeds: [Embed]})
    }
}