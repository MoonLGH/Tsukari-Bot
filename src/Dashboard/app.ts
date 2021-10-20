import express from "express"
import path from "path"
import env from "dotenv"
import indexRouter from "./routes/index"

var app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

env.config()
var port = process.env.PORT || 3000

function start(){
    app.listen(port, () => console.log(`Server started on port ${port}`));
}

export default {
    start,
    app
}