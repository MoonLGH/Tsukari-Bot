import {Message} from "discord.js";
import config from "../../default";

export = {
  "name": "say",
  "usage": `${config.defaultprefix}say [Message Here]`,
  "description": "Say Something",
  "alias": ["echo"],
  "execute": async function(msg:Message, command:string, args:Array<string>) {
    msg.channel.send(args.join(" "));
  },
}
