import {Client, TextChannel} from "discord.js";
import config from "../default";
import {commands, slashes} from "../util/others/globalVar";
import {loadSlashCommand, loadTextCommand} from "../util/others/handleutil";
async function SetActivity(client:Client) {
  const presence = client.user?.setActivity(config.defaultStatus, {type: "WATCHING"});
  console.log(`Activity Changed To ${presence?.activities[0].type} ${presence?.activities[0].name} \nStatus=${presence?.status}`);
}

export = {
  name: "ready",
  async execute(client:Client) {
    console.log("==========");
    console.log("Ready Event");
    console.log(`${client.user?.tag} Ready.`);
    // Calling SetActivity Function
    await SetActivity(client);
    await loadTextCommands();
    // Adding slash Command
    console.log("End of Ready Event");
    console.log("==========");

    const oldLog = console.log;
    console.log = (m) => {
      logToDiscord(m, client);
      oldLog(m);
    };
  },
};


async function logToDiscord(m:string|object, client:Client) {
  (client.channels.cache.get(config.botconsole) as TextChannel)?.send(`Console Log: ${m.toString()}`);
}

async function loadTextCommands() {
  const text = await loadTextCommand();

  for (const cmd of text) {
    commands.set(cmd.name, cmd);
  }

  const slash = await loadSlashCommand();

  for (const cmd of slash) {
    slashes.set(cmd.name, cmd);
  }
}
