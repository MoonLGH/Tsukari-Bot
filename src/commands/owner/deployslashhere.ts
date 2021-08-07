import {
    Message
} from "discord.js"
import {addhere} from "../../util/others/slash"
module.exports = {
    "name": "deployslashhere",
    "usage": `${require("../../default").defaultprefix}owner deployslashhere `,
    "description": "Deploy Slash Command To This Server",
    "execute": async function (msg: Message, command: String, args: Array < any > , prefix: string) {
        await addhere(msg.client,msg)
    }
}