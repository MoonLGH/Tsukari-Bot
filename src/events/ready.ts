import { Client, TextChannel } from 'discord.js'
const config = require("../default.js")

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