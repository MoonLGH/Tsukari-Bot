import {Collection} from "discord.js";
import {command, slash} from "./typing";

const commands = new Collection<string, command>();
const slashes = new Collection<string, slash>();

export {
  commands,
  slashes,
};
