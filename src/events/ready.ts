import { Client, TextChannel } from 'discord.js'
const config = require("../default.js")
import {commands,slashes} from "../util/others/globalVar"
import {loadSlashCommand, loadTextCommand} from "../util/others/handleutil"
async function SetActivity(client:Client){
    const presence = await client.user?.setActivity(config.defaultStatus, { type: 'LISTENING' })
    await console.log(`Activity Changed To ${presence?.activities[0].type} ${presence?.activities[0].name} \nStatus=${presence?.status}`)
}

module.exports = {
	name: 'ready',
	async execute(client:Client) {
        await console.log("==========")
        await console.log("Ready Event")
        console.log(`${client.user?.tag} Ready.`)
        // Calling SetActivity Function
        await SetActivity(client)
        await loadTextCommands()
        // Adding slash Command
        await console.log("End of Ready Event")
        await console.log("==========")

        const oldLog = console.log;
        console.log = m => {
          logToDiscord(m,client);
          oldLog(m);
        }
	},
};


async function logToDiscord(m:any,client:Client){
    (client.channels.cache.get(config.botconsole) as TextChannel)?.send(`Console Log: ${m.toString()}`)
}

async function loadTextCommands(){
  const text = await loadTextCommand()

  for (let cmd of text){
    commands.set(cmd.name,cmd)
  }

  const slash = await loadSlashCommand()

  for (let cmd of slash){
    slashes.set(cmd.name,cmd)
  }
}