import {Message, Embed, ActionRow, ButtonComponent, ButtonInteraction, ButtonStyle, ComponentType} from "discord.js";
import * as fs from "fs";
import * as Interface from "../../util/others/typing";
import config from "../../default";

export = {
  "name": "help",
  "usage": `${config.defaultprefix}help <Command/Category> <Category>`,
  "description": "Get Help of a Command",
  "execute": async function(msg:Message, command:string, args:Array<string>) {
    if (args.length === 0) {
      const commandFiles = fs.readdirSync("./src/Discord/TextCommands", {withFileTypes: true}).filter((dirent) => dirent.isDirectory()).map((dirent) => dirent.name);

      const cats = [];
      for (const folder of commandFiles) {
        cats.push(folder);
      }
      const embed = new Embed()
          .setAuthor({name: "Help", iconURL: msg.client.user!.displayAvatarURL({size: 1024, extension: "png", forceStatic: true})})
          .addField({name: "Categories", value: cats.join("\n")});

      const buts:Array<ButtonComponent> = [];
      cats.forEach((cat:string) =>{
        const but = new ButtonComponent()
            .setCustomId(cat)
            .setStyle(ButtonStyle.Primary)
            .setLabel(cat);
        buts.push(but);
      });
      const result = buts.reduce((resultArray:Array<Array<ButtonComponent>>, item:ButtonComponent, index:number) => {
        const chunkIndex = Math.floor(index/5);

        if (!resultArray[chunkIndex]) {
          resultArray[chunkIndex] = []; // start a new chunk
        }

        resultArray[chunkIndex].push(item);

        return resultArray;
      }, []);
      const component:Array<ActionRow<ButtonComponent>> = [];
      result.forEach((buttons:Array<ButtonComponent>)=>{
        const row = new ActionRow()
            .addComponents(...buttons);
        component.push((row as ActionRow<ButtonComponent>));
      });
      const sended = await msg.channel.send({embeds: [embed], components: component});
      const filter = (interaction:ButtonInteraction) => interaction.user.id === msg.author.id;
      const maincollector = sended.createMessageComponentCollector({
        componentType: ComponentType.Button,
        filter: filter,
        time: 15000,
      });
      maincollector.on("collect", async (interaction:ButtonInteraction) => {
        const cmds:Array<Interface.HelpInterface> = [];
        for (const file of fs.readdirSync("./src/Discord/TextCommands/"+interaction.customId).filter((file:string) => file.endsWith(".ts"))) {
          const cmd = await import(`../${interaction.customId}/${file}`);
          const obj:Interface.HelpInterface = {CmdName: cmd.name||"No Name Setted", description: cmd.description||"No Description Setted", usage: cmd.usage||"No Usage Setted"};
          if (cmd.alias && cmd.alias.length > 0) {
            obj.alias = "Alias:"+cmd.alias.join("/");
          } else if (!cmd.alias) {
            obj.alias = "";
          }
          cmds.push(obj);
        }
        const embed = new Embed()
            .setAuthor({name: `${interaction.customId} List`, iconURL: msg.client.user?.displayAvatarURL()});
        cmds.forEach((cmd:Interface.HelpInterface)=>{
          embed.addField({name: cmd.CmdName, value: cmd.usage+"\n"+cmd.description+"\n"+cmd.alias});
        });
        sended.edit({embeds: [embed], components: []});
      });
    }
  },
}
