import mongoose from "mongoose"
const config = require("../../Discord/default.js")

interface GuildSchema extends mongoose.Document {
    id: string,
    prefix: Array<string>,
}

let defaultprefixes = config.defaultprefixes
export = mongoose.model<GuildSchema>("Guild", new mongoose.Schema({
    id: {
        type: String
    }, //ID of the guild
    prefix: {
        type: Array,
        default: defaultprefixes
    }

}));