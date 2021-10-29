import express from "express"
import path from "path"
import env from "dotenv"
import indexRouter from "./routes/index"
import dashboardRouter from "./routes/dashboard"
// import apiRouter from "./routes/api"
import https from 'https'
import http from 'http'
import session from 'express-session'
env.config()
const port = process.env.PORTHttp || 8080
import fs from "fs"

var app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// use sessions for tracking logins
app.use(session({
    secret: process.env.sessionSecret || "imdumb",
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 6000000
    }
}));

// router and view
app.use('/', indexRouter);
app.use('/Dashboard/', dashboardRouter);
// app.use('/api/', apiRouter);
app.set('views', path.join(__dirname, 'Views'));

// redirect all http request to https
app.use((req:express.Request, res:express.Response, next:Function) => req.secure ? next() : res.redirect(`https://${req.hostname}${req.url}`))

async function start(){
    await console.log("==========")
    if(process.env.ssl === "usessl"){
        var privateKey  = fs.readFileSync(process.env.PrivateKeySSLPath||'src/Website/sslcert/privatekey.pem', 'utf8');
        var certificate = fs.readFileSync(process.env.CertSSLPath||'src/Website/sslcert/cert.pem', 'utf8');
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

export = {
    start,
    app
}