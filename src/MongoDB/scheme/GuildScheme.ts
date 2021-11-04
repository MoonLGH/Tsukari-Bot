import mongoose from "mongoose";
import config from "../../Discord/default";

interface GuildSchema extends mongoose.Document {
    id: string,
    prefix: Array<string>,
}

const defaultprefixes = config.defaultprefixes;
export = mongoose.model<GuildSchema>("Guild", new mongoose.Schema({
  id: {
    type: String,
  }, // ID of the guild
  prefix: {
    type: Array,
    default: defaultprefixes,
  },

}));
