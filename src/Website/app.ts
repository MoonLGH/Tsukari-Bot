// modules importing
import express from "express";
import path from "path";
import env from "dotenv";
import indexRouter from "./routes/index";
import ownerRouter from "./routes/owner";
import dashboardRouter from "./routes/dashboard";
import https from "https";
import http from "http";
import session from "express-session";
import fs from "fs";
// import cookies from "cookie-parser"

env.config();
const port = process.env.PORTHttp || 8080;
// const privateKey = fs.readFileSync(process.env.PrivateKeySSLPath||"src/Website/sslcert/privatekey.pem", "utf8") || ""
// const certificate = fs.readFileSync(process.env.CertSSLPath||"src/Website/sslcert/cert.pem", "utf8") || ""
const privateKey = "";
const certificate = "";
const credentials = {key: privateKey, cert: certificate};

const app = express();

// use sessions & cookies for logins
app.use(session({
  secret: process.env.sessionSecret || "imdumb",
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 6000000,
  },
}));
// app.use(cookies())

// router and view
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.use("/owner/", ownerRouter);
app.use("/", indexRouter);
app.use("/Dashboard/", dashboardRouter);
app.set("views", path.join(__dirname, "Views"));

// redirect all http request to https
app.use((req:express.Request, res:express.Response, next:()=> void) => req.secure ? next() : res.redirect(`https://${req.hostname}${req.url}`));

async function start() {
  await console.log("==========");
  if (process.env.ssl === "usessl") {
    const httpServer = http.createServer(app);
    const httpsServer = https.createServer(credentials, app);

    const portHttps = process.env.PORTHttps || 3000;

    httpServer.listen(port, () => {
      console.log("HTTP Server running on port " + port);
    });

    httpsServer.listen(portHttps, () => {
      console.log("HTTPS Server running on port " + portHttps);
    });
  } else {
    app.listen(port, () => console.log(`Server started on port ${port}`));
  }
}

export = {
  start,
  app,
}
