exports.execute = async (err:any,msg:any,D:any)=>{
    const embed = new D.MessageEmbed()
        .setAuthor(msg.client.user.tag, msg.client.user.displayAvatarURL())
        .addField("Error Occured!", err.message.substr(0,1000).split(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g).join(""))
        .setFooter(msg.client.user.tag, msg.client.user.displayAvatarURL())
        .setTimestamp()
    msg.channel.send({embeds:[embed]})
    msg.client.channels.cache.get(require("../default").boterror).send({embeds:[embed]})
}