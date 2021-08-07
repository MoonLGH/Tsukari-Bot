import {
    Message
} from 'discord.js';
import {
    handler
} from '../util/handler/CommandHandler';

const config = require("../default.js")

module.exports = {
    name: 'messageCreate',
    async execute(msg: Message) {
        let prefix: any = undefined
        if (msg.channel.id === config.botconsole) return /* returning all console channel message, cause in the development time it's so annoying */
        if (process.env.TESTPREFIX) {
            if (msg.content.toLowerCase().startsWith(process.env.TESTPREFIX.toLowerCase())) {
                prefix = process.env.TESTPREFIX
            }
        }
        if (prefix === undefined) {
            prefix = config.defaultprefixes.find((p: string) => msg.content.toLowerCase().startsWith(p.toLowerCase()))
        }
        try {
            if (prefix === undefined || !msg.content.toLowerCase().startsWith(prefix.toLowerCase())) return
            const args = msg.content.slice(prefix.length).split(/ +/)
            const command = args.shift() !.toLowerCase()
            handler(msg, command, args, prefix)
        } catch (err) {
            require("../util/others/error.ts").execute(err, msg, D)
        }
    },
};