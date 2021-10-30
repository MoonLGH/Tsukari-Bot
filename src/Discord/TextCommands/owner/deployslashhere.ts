import {
    Message
} from "discord.js"
import {addhere} from "../../util/others/slash"
import config from "../../default"

export = {
    "name": "deployslashhere",
    "usage": `${config.defaultprefix}owner deployslashhere `,
    "description": "Deploy Slash Command To This Server",
    "execute": async function (msg: Message) {
        await addhere(msg.client,msg)
    }
}