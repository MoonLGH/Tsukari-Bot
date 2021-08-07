// Process Enviroment detector
require("dotenv").config("../")
// Making Variable
const config = require("./default.js")
const D = require("discord.js")
const client = new D.Client({intents: config.intents})

// Setup
require("./util/handler/EventHandler.ts").setup(client)

// Login to bot
client.login(process.env.TOKEN)