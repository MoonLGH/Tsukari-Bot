/* eslint-disable no-unexpected-multiline */
import D from "discord.js"
import def from "../../default"

async function execute(err:Error,msg:D.Message) {
    const embed = new D.MessageEmbed()
        .setAuthor(msg.client.user!.tag, msg.client.user!.displayAvatarURL())
        // eslint-disable-next-line no-control-regex
        .addField("Error Occured!", err.message.substr(0,1000).split(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g).join(""))
        .setFooter(msg.client.user!.tag, msg.client.user!.displayAvatarURL())
        .setTimestamp();

    (msg.client.channels.cache.get(def.boterror) as D.TextChannel).send({embeds:[embed]})
}

export { execute }