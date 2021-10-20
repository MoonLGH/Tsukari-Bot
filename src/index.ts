import Djs from "./Discord/index"
import Dashboard from "./Dashboard/app"

import env from "dotenv"
env.config()

Djs.login(process.env.Token!)
Dashboard.start()