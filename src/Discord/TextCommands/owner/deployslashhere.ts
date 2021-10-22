import {
    Message
} from "discord.js"
import {addhere} from "../../util/others/slash"
export = {
    "name": "deployslashhere",
    "usage": `${require("../../default").defaultprefix}owner deployslashhere `,
    "description": "Deploy Slash Command To This Server",
    "execute": async function (msg: Message, command: string, args: Array < string > , prefix: string) {
        await addhere(msg.client,msg)
    }
}