// Making Variable
import D from "discord.js";
// import DAT from "discord-api-types/v9";
import config from "./default";
import {setup} from "./util/handler/EventHandler";

// reassign client
class Client extends D.Client {
  constructor() {
    super({
      intents: config.intents,
      partials: config.partials,
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
