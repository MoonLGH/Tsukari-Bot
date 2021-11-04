import {Message} from "discord.js";
import config from "../../default";
export = {
  "name": "test",
  "usage": `${config.defaultprefix}test`,
  "description": "Reply With Testt",
  "execute": async function(msg:Message) {
    msg.reply("Testt");
  },
}
