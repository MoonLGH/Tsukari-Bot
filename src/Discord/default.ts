import {GatewayIntentBits as Intents} from "discord-api-types/v9";
import {Partials} from "discord.js";
const dprefix = "Tsu!";

export = {
  defaultprefix: dprefix,
  defaultprefixes: ["Tsu+", "Tsu-", dprefix],
  botconsole: "831195323820408902",
  botlog: "827236403263569980",
  boterror: "827236403263569980",
  defaultStatus: "My waifu smiles",
  ownerid: "460361291962515457",
  intents: [Intents.GuildMessages, Intents.GuildMessageReactions, Intents.Guilds, Intents.GuildPresences, Intents.DirectMessages, Intents.GuildMembers],
  partials: [Partials.Channel],
  devserver: "815213544218951740",
  token: "No",
}
