import { Message } from "discord.js";
import { handleCommand, search, Vars } from "../others/handleutil";

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
      require(`../../commands/${getcmd.folder}/${getcmd.file}`).execute(msg,command,args,prefix,getcmd.alias || getcmd.file);
   }
}
