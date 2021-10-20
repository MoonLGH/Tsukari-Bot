import { Collection } from "discord.js"
import { command,slash } from "./typing"

let commands = new Collection<string,command>()
let slashes = new Collection<string,slash>()

export {
    commands,
    slashes
}