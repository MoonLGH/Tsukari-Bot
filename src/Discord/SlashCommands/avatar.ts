import {
  ChatInputCommandInteraction, Embed, Util,
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
  interaction: async function(interaction: ChatInputCommandInteraction) {
    const person = interaction.options.getUser("target", true);
    const embed = new Embed();

    const avatar = person.displayAvatarURL({size: 1024, extension: "png", forceStatic: true});

    embed.setAuthor({name: person.tag, iconURL: avatar})
        .setImage(avatar)
        .setFooter({text: person.tag, iconURL: avatar})
        .setTimestamp()
        .setColor(Util.resolveColor("#AF98CA"));

    interaction.reply({embeds: [embed]});
  },
}
