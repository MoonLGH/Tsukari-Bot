import { Client } from 'discord.js'
const config = require("../default.js")
const { PlayTogether } = require("@miudiscord/together")
const slash = require("./slash.ts")
exports.ready = async (client:any)=>{
    await console.log("==========")
    await console.log("Ready Event")
    console.log(`${client.user?.tag} Ready.`)
    // Calling SetActivity Function
    await SetActivity(client)
    // Adding slash Command
    await slash.add(client)
    await console.log("Renewing Client to load Youtube Together")
    client.together = new PlayTogether(client)
    await console.log("End of Ready Event")
    await console.log("==========")
}

// Function To Set Client User setActivity 
async function SetActivity(client:Client){
    const presence = await client.user?.setActivity(config.defaultStatus, { type: 'LISTENING' })
    await console.log(`Activity Changed To ${presence?.activities[0].type} ${presence?.activities[0].name} \nStatus=${presence?.status}`)
}