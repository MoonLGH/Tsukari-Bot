import {
  Message,
} from "discord.js";
import {
  handler,
} from "../util/handler/CommandHandler";
import config from "../default";

type prefix = string|undefined
export = {
  name: "messageCreate",
  async execute(msg: Message) {
    let prefix:prefix = undefined;
    if (msg.channel.id === config.botconsole) return; /* returning all console channel message, cause in the development time it's so annoying */
    // if(msg.author.bot) return   /* returning all bot messages */
    if (process.env.TESTPREFIX) {
      if (msg.content.toLowerCase().startsWith(process.env.TESTPREFIX.toLowerCase())) {
        prefix = process.env.TESTPREFIX;
      }
    }
    if (!prefix) {
      prefix = config.defaultprefixes.find((p: string) => msg.content.toLowerCase().startsWith(p.toLowerCase()));
    }

    try {
      if (!prefix || !msg.content.toLowerCase().startsWith(prefix.toLowerCase())) return;
      const args = msg.content.slice(prefix.length).split(/ +/);
      const command = args.shift() !.toLowerCase();
      handler(msg, command, args, (prefix as string));
    } catch (err) {
      (await import("../util/others/error")).execute((err as Error), msg);
    }
  },
};
