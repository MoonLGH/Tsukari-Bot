import {Permissions} from "discord.js"
interface other {
    permission : Array<Permissions>|Array<string>|null,
    guildOnly : boolean,
    DMOnly : boolean
}

interface command {
    name: string,
    file:string,
    folder: string,
    alias: Array<string>,
    other : other,
    filepath : string, 
    description: string
}

interface Opt{
    name: string,
    type: string,
    required: boolean,
    description: string
}

interface HelpInterface {
    CmdName: string,
    description: string
    usage: string
    alias? : string
}

interface slash {
    name: string,
    file:string,
    filepath : string,
    options:Array<Opt>,
    description:string,
    interaction:Function
}

export {
    command,
    slash,
    HelpInterface,
}