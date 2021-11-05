// Making Variable
import D from "discord.js";
import config from "./default";
import {setup} from "./util/handler/EventHandler";

// reassign client
class Client extends D.Client {
  constructor() {
    super({
      intents: (config.intents as D.IntentsString[]),
      partials: (config.partials as D.PartialTypes[]),
    });
  }

  start(token:string) {
    this.login(token);
    setup(this);
  }
}

// ClientPart
const client = new Client();

export default {
  client,
};
