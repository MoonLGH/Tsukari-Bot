import express from "express"
import path from "path"
import env from "dotenv"
import indexRouter from "./routes/index"
import https from 'https'
import http from 'http'

const fs = require('fs');

var app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

env.config()
var port = process.env.PORTHttp || 8080

function start(){
    if(process.env.ssl === "usessl"){
        var privateKey  = fs.readFileSync(process.env.PrivateKeySSLPath||'src/Dashboard/sslcert/privatekey.pem', 'utf8');
        var certificate = fs.readFileSync(process.env.CertSSLPath||'src/Dashboard/sslcert/cert.pem', 'utf8');
        var credentials = {key: privateKey, cert: certificate};
        var httpServer = http.createServer(app);
        var httpsServer = https.createServer(credentials, app);

        var portHttps = process.env.PORTHttps || 3000
        
        httpServer.listen(port, () => { 
            console.log('HTTP Server running on port ' + port);
        })


        httpsServer.listen(portHttps, () => {
            console.log('HTTPS Server running on port ' + portHttps);
        })
    }else{
        app.listen(port, () => console.log(`Server started on port ${port}`));
    }
}

export default {
    start,
    app
}