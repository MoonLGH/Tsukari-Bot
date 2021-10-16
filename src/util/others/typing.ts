import {Permissions} from "discord.js"
interface other {
    permission : Array<Permissions>|null,
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
}



interface Opt{
    name: string,
    type: string,
    required: boolean,
    description: string
}

interface slash {
    name: string,
    file:string,
    filepath : string,
    options:Array<Opt>,
    interaction:Function
}

export {
    command,
    slash
}