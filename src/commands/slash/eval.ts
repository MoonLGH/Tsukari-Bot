import { Interaction, Message } from "discord.js"
const D = require("discord.js")
const { inspect } = require('util');
const text = require('../../util/string.js');
const config = require('../../default.js');
const fetch = require('node-fetch');
module.exports = {
    name: "eval",
    description: "Bot Owner Only <Owner>, Eval A Code",
    options: [{
        "name": "code",
        "type": "STRING",
        "required": true,
        "description": "Code To Run"
    }],
    interaction: async function (interaction:any) {
        let code:any = interaction.options.get("code")?.value
        if(interaction.user.id !== config.ownerid) return interaction.reply("You are not the bot owner, You cant run this")
        const interactiontime:any = Date.now()
        try {
            let evaled = eval(code);
            let raw = evaled;
            let promise:any, output:any, bin:any, download:any, type:any, color:any;
      
            if (evaled instanceof Promise){
              interaction.channel.sendTyping();
              promise = await evaled
              .then(res => { return { resolved: true, body: inspect(res, { depth: 0 })};})
              .catch(err => { return { rejected: true, body: inspect(err, { depth: 0 })};});
            };
      
            if (typeof evaled !== 'string'){
              evaled = inspect(evaled, { depth: 0 });
            };
      
            if (promise){
              output = text.clean(promise.body)
            } else {
              output = text.clean(evaled)
            };
      
            if (promise?.resolved){
              color = 'GREEN'
              type = 'Promise (Resolved)'
            } else if (promise?.rejected){
              color = 'RED'
              type = 'Promise (Rejected)'
            } else {
              color = 'GREY'
              type = (typeof raw).charAt(0).toUpperCase() + (typeof raw).slice(1)
            };
      
            const elapsed = Math.abs(Date.now() - interactiontime);
            const embed = new D.MessageEmbed()
            .setColor(color)
            .addField('\\📥 Input',`\`\`\`js\n${text.truncate(text.clean(code),1000).replaceAll("```","")}\`\`\``)
            .setFooter([
              `Type: ${type}`,
              `Evaluated in ${elapsed}ms.`,
              `Eval | \©️${new Date().getFullYear()} ${interaction.guild?.me?.displayName || interaction.client.user?.username }`].join('\u2000•\u2000')
            );
      
            if (output.length > 1000){
              await fetch('https://hastebin.com/documents', {
                method: 'POST',
                body: output,
                headers: { 'Content-Type': 'text/plain' }
              }).then((res:any) => res.json())
              .then((json:any) => bin = 'https://hastebin.com/' + json.key + '.js')
              .catch(() => null)
      
            };
      
            
            embed.addFields([
              {
                name: '\\📤 Output',
                value: output.length > 1000
                ? `\`\`\`fix\nExceeded 1000 characters\nCharacter Length: ${output.length}\`\`\``
                : `\`\`\`js\n${output}\n\`\`\``
              },
              { name: '\u200b', value: `[\`📄 View\`](${bin}) • [\`📩 Download\`](${download})` }
            ].splice(0, Number(output.length > 1000) + 1))
    
            return interaction.reply({embeds:[embed]});
        } catch (err) {
          const stacktrace = text.joinArrayAndLimit(err.stack.split('\n'),900,'\n');
          const value = [
            '```xl',
            stacktrace.text,
            stacktrace.excess ? `\nand ${stacktrace.excess} lines more!` : '',
            '```'
          ].join('\n');
            const embed = new D.MessageEmbed()
            .setColor('RED')
            .setFooter([
              `${err.name}`,
              `Evaluated in ${Math.abs(Date.now() - interactiontime)}ms.`,
              `Eval | \©️${new Date().getFullYear()} ${interaction.guild?.me?.displayName || interaction.client.user?.username}`].join('\u2000•\u2000'))
            .addFields([
              { name: '\\📥 Input', value: `\`\`\`js\n${text.truncate(text.clean(code),1000,'\n...').replaceAll("```","")}\`\`\``  },
              { name: '\\📤 Output', value }
            ])
          return interaction.reply({embeds:[embed]})
        }
    }
}