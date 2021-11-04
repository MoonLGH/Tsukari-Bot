import {
  Message,
} from "discord.js";
import {addpublic} from "../../util/others/slash";
import config from "../../default";

export = {
  "name": "deploypublicslash",
  "usage": `${config.defaultprefix}owner deploypublicslash `,
  "description": "Deploy Slash Command To Public",
  "execute": async function(msg: Message) {
    await addpublic(msg.client, msg);
  },
}
