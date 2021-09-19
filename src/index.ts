// Process Enviroment detector
require("dotenv").config("../")
// Making Variable
const config = require("./default.js")
const D = require("discord.js")

const Tokens = process.env.Token?.split(",")

if(Tokens?.length === 1){
    const client = new D.Client({intents: config.intents})
    client.login(process.env.TOKEN)
    require("./util/handler/EventHandler.ts").setup(client)
}else{
// for of tokens array
    for (let tok = 0; tok < Tokens!.length; tok++) {
        const client = new D.Client({intents: config.intents})
        const token = Tokens![tok];
        client.login(token)
       require("./util/handler/EventHandler.ts").setup(client)
    }
}
