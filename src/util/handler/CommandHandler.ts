import { Message } from "discord.js";
import { handleCommand, search, Vars } from "../others/handleutil";
const def = require("../../default.js")

async function getCommand(command: String,args: Array<String>) {
   let getcmd = null;
   if (search(command, Vars.forwardable)) {
      let folder = command;
      command = args.shift()!;
      if(command){
      getcmd = await handleCommand(command, folder);
      }
   }
   return getcmd;
}

export async function handler(msg: Message,command: String,args: Array<String>,prefix: string) {
   let getcmd: any = await getCommand(command, args);
   if (!getcmd) {
      getcmd = await handleCommand(command);
   }
   if (getcmd) {
      console.log(getcmd)
      if(getcmd.folder === "owner" && msg.author.id !== def.ownerid) return msg.reply("You are not the bot owner, and cant do this type of command")
      if(getcmd.other.guildOnly && msg.channel?.type !== "GUILD_TEXT") return msg.channel.send(`This command can only be used in a Server TextChannel`);
      else if(getcmd.other.DMOnly && msg.channel?.type !== "DM") return msg.channel.send(`This command can only be used in a DM`);
      else {
         if(getcmd.permission){
            if(!msg.member?.permissions.has(getcmd.permission)){
               return msg.reply(`You do not have permission to use this command`);
            }
         }
         try {
            require(`../../TextCommands/${getcmd.folder}/${getcmd.file}`).execute(msg,command,args,prefix,getcmd.alias || getcmd.file);
         } catch (err){
            if(err === "DiscordAPIError: Missing Permission"){
               return msg.reply(`I don't have permission to do that!`);
            }
         }
      }
   }
}
