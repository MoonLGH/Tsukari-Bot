import {Message, PermissionsString, ChannelType} from "discord.js";
import {handleCommand, search, Vars} from "../others/handleutil";
import def from "../../default";

async function getCommand(command: string, args: Array<string>) {
  let getcmd = null;
  if (search(command, Vars.forwardable)) {
    const folder = command;
    command = args.shift()!;
    if (command) {
      getcmd = await handleCommand(command, folder);
    }
  }
  return getcmd;
}

export async function handler(msg: Message, command: string, args: Array<string>, prefix: string) {
  const getcmd = await getCommand(command, args) || await handleCommand(command);
  if (getcmd) {
    if (getcmd.folder === "owner" && msg.author.id !== def.ownerid) return msg.reply("You are not the bot owner, and cant do this type of command");
    if (getcmd.other.guildOnly && msg.channel?.type !== ChannelType.GuildText) return msg.channel.send("This command can only be used in a Server TextChannel");
    else if (getcmd.other.DMOnly && msg.channel?.type !== ChannelType.DM) return msg.channel.send("This command can only be used in a DM");

    if (getcmd.other.permission) {
      if (!msg.member?.permissions.has((getcmd.other.permission as PermissionsString[]))) {
        return msg.reply("You do not have permission to use this command");
      }
    }
    try {
      const cmd = await import(`../../TextCommands/${getcmd.folder}/${getcmd.name}`);
      cmd.execute(msg, command, args, prefix, getcmd.alias || getcmd.file);
    } catch (err) {
      if (err === "DiscordAPIError: Missing Permission") {
        return msg.reply("I don't have permission to do that!");
      }
    }
  }
}
