import {
    Message
} from "discord.js"
const D = require("discord.js")
import {addpublic} from "../../util/others/slash"
module.exports = {
    "name": "deploypublicslash",
    "usage": `${require("../../default").defaultprefix}owner deploypublicslash `,
    "description": "Deploy Slash Command To Public",
    "execute": async function (msg: Message, command: String, args: Array < any > , prefix: string) {
        await addpublic(msg.client,msg)
    }
}