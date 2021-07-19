import { Client } from 'discord.js'
const config = require("../default.js")
const slash = require("./slash.ts")
exports.ready = async (client:Client)=>{
    console.log(`${client.user?.tag} Ready.`)
    // Calling SetActivity Function
    SetActivity(client)
    // Adding slash Command
    slash.add(client)
}

// Function To Set Client User setActivity 
async function SetActivity(client:Client){
    const presence = await client.user?.setActivity(config.defaultStatus, { type: 'LISTENING' })
    console.log(`Activity Changed To ${presence?.activities[0].type} ${presence?.activities[0].name} \nStatus=${presence?.status}`)
}