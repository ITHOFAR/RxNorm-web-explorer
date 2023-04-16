import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import * as dotenv from 'dotenv';
import apiRouter from "./api-routers.mjs";
import {createPool, closePool} from './pg-pool-exec.mjs';
import session from 'express-session';
import * as fs from 'fs'
import cors from 'cors';

async function start(staticResource, port, sessionOptions) {

    createPool(); //postgres connection pools

    const app = express();
    //-----------middleware---------
    app.use(cors());
    app.use(session(sessionOptions));
    app.use(express.static(staticResource));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true})); 
    //-----------routing------------- 
    app.use("/api", apiRouter);

    //-----------running server----------
    const server = app.listen(port, () => {
        console.log(`Server Started \n Listening on port ${port}`);
    });

    //-----------cleanup------------------
    function exit() {
        server.close();
        closePool();
    }
    process.once('SIGTERM', exit).once('SIGINT', exit);
}

const __filename = fileURLToPath(import.meta.url); // /Users/ithofar/NYU Non cloud/Semester 6 NYU/AIT/final-project-ITHOFAR/server/app.mjs
const __dirname = path.dirname(path.dirname(__filename)); // /Users/ithofar/NYU Non cloud/Semester 6 NYU/AIT/final-project-ITHOFAR

const publicDir = path.join(__dirname, 'public'); // /Users/ithofar/NYU Non cloud/Semester 6 NYU/AIT/final-project-ITHOFAR/public
const envDir = path.join(__dirname, 'envs'); // /Users/ithofar/NYU Non cloud/Semester 6 NYU/AIT/final-project-ITHOFAR/envs

// argv[2]: 0==cims, 1==docker //TODO ADD TO README
let envPGSetup = null;
const pgCase = Number.parseInt(process.argv[2]); //defaults to null in switch if no arg present
switch(pgCase) {
    case 0:
        envPGSetup = 'pg-setup-cims.env';
        break;
    case 1:
        envPGSetup = 'pg-setup.env';
        break;
    default:
        envPGSetup = null;
}

if (envPGSetup) {
    const envPGFile = path.join(envDir, envPGSetup);
    dotenv.config({ path: envPGFile});
}

const sessionFile = path.join(envDir, 'session-config.env');
try {
    if (fs.existsSync(sessionFile)) {
        dotenv.config({ path: sessionFile});
    }
} 
catch (err) {
    console.error("Express-session config file not found", err);
}

const port = process.env.PORT ? parseInt(process.env.PORT): 3001 //3001 default

const sessionOptions = {
    secret: process.env.SECRET,
    resave: process.env.RESAVE,
    saveUninitialized: process.env.SAVEUNITITIALIZED
};

start(publicDir, port, sessionOptions);