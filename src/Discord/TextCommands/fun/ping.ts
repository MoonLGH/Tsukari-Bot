import {Message} from "discord.js";
import config from "../../default";

export = {
  "name": "ping",
  "usage": `${config.defaultprefix}ping`,
  "description": "Reply With Pong",
  "alias": ["pong"],
  "execute": async function(msg:Message, command:string, args:Array<string>, prefix:string, alias:string) {
    if (alias === "pong") {
      return msg.reply("ping");
    }
    return msg.reply("Pong");
  },
}
