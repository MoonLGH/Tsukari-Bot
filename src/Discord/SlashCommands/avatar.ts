import {
  CommandInteraction, MessageEmbed,
} from "discord.js";
export = {
  name: "avatar",
  description: "Show User/Member avatar",
  options: [{
    "name": "target",
    "type": "USER",
    "required": false,
    "description": "Member Nickname/ID",
  }],
  interaction: async function(interaction: CommandInteraction) {
    const person = interaction.options.getUser("target", true);
    const Embed = new MessageEmbed();

    const avatar = person.displayAvatarURL({format: "png", size: 1024});

    Embed.setAuthor(person.tag, avatar)
        .setImage(avatar)
        .setFooter(person.tag, avatar)
        .setTimestamp()
        .setColor("#AF98CA");

    interaction.reply({embeds: [Embed]});
  },
}
