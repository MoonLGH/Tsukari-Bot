import Djs from "./Discord/index"
import DB from "./MongoDB/db"
import Website from "./Website/app"

import env from "dotenv"
env.config()


async function setup() {
    DB.connect(process.env.MongoDB_URL!)
    Djs.login(process.env.Token!)
    Website.start()
}
setup()