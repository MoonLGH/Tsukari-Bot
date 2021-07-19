const chalk = require("chalk")
import { Client } from 'discord.js'
exports.ready = async (client:Client)=>{
    console.log(`${client.user?.tag} Ready.`)
    // Calling SetActivity Function
    SetActivity(client)
}

// Function To Set Client User setActivity 
async function SetActivity(client:Client){
    client.user?.setActivity(require("../default.js").defaultStatus, { type: 'LISTENING' })
    console.log(`Activity set to ${chalk.cyan(client.user?.presence.activities[0].type)} ${chalk.cyan(client.user?.presence.activities[0].name)}`)
}