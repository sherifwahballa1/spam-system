const express = require("express");
const path = require("path");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const xxs = require("xss-clean"); // for injection
const compression = require("compression");
require("colors");

const reportsAPI = require("./routes");

const { Error404, Error500 } = require("./modules/global-errors");

const app = express();
app.enable("trust proxy", 1);

app.set("views", path.join(__dirname, "views"));

// ======================== cors ========================
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:4200"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ["Content-Type", "Authorization", "origin"],
    optionsSuccessStatus: 204,
    preflightContinue: false,
  })
);

// ======================== helmet ======================
// app.use(helmet());
app.use(
  helmet({
    // over-ridden by masking
    hidePoweredBy: false,
    contentSecurityPolicy: false,
    frameguard: {
      action: "deny",
    },
  })
);

//Expect Certificate Transparency
app.use(helmet.expectCt());

app.use(helmet.referrerPolicy());

app.use(helmet.hsts());

app.use(helmet.noSniff());
// Sets "X-Download-Options: no-open"
app.use(helmet.ieNoOpen());
// Sets "X-XSS-Protection: 0"
app.use(helmet.xssFilter());
// Sets "X-Permitted-Cross-Domain-Policies: by-content-type"
app.use(
  helmet.permittedCrossDomainPolicies({
    permittedPolicies: "by-content-type", // none
  })
);


app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));


// Pretty API Responses
app.set("json spaces", 4);

// ====================== morgan ======================
morgan.token("remote-addr", function (req) {
  return req.headers["x-forwarded-for"] || req.ip;
});
// log the time taken in each request
app.use(morgan("tiny"));

// ====================== XXS =================================
// Data sanitization against cross-site scripting (XSS)
app.use(xxs()); // prevent if code contain html code or js code in body and convert it to symbols known

// ====================== compression =========================
app.use(compression());

app.use("/api/reports", reportsAPI);

app.use(Error404);
app.use(Error500);

module.exports = app;
