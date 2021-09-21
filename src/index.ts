// Process Enviroment detector
require("dotenv").config("../")
// Making Variable
const config = require("./default.js")
const D = require("discord.js")

const Tokens = process.env.Token?.split(",")

if(Tokens?.length === 1){
    const client = new D.Client({intents: config.intents,partials:config.partials})
    client.login(process.env.Token || Tokens[0])
    require("./util/handler/EventHandler.ts").setup(client)
}else{
    for (let tok = 0; tok < Tokens!.length; tok++) {
        const client = new D.Client({intents: config.intents,partials:config.partials})
        const token = Tokens![tok];
        client.login(token)
       require("./util/handler/EventHandler.ts").setup(client)
    }
}
