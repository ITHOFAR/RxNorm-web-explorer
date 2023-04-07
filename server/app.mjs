import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url';
import * as dotenv from 'dotenv';
import {createPool, closePool, querySQL} from './pg-pool-exec.mjs';
import session from 'express-session';
import * as fs from 'fs'

async function start(staticResource, port, sessionOptions) {

    createPool(); //postgres connection pools

    const app = express();
    //-----------middleware---------
    app.use(session(sessionOptions));
    app.set('view engine', 'hbs'); //TEMP FOR TESTING
    app.use(express.static(staticResource));
    app.use(express.urlencoded({ extended: false}));
    //-----------routing------------- //todo seperate into seperate files and use middleware
    // CURRENTLY USING EXPRESS AND HBS --TODO SWITCH TO REACT
    const allResults = {};

    app.get('/', async (req, res) => { //testing
        // const test = await querySQL("select count(*) from scd;", []);
        // // console.log(test.rows[0].count);
        // res.send(`<h1>Amount of SCDs: ${test.rows[0].count}</h1>`);
        res.render('home');
    });
    app.get('/search', async (req, res) => { 
        const {searchTarget, searchOption} = req.query;
        if (searchTarget !== undefined) {
            let queryResult;
            switch (searchOption) {
                case 'All':
                    queryResult = await querySQL(`select distinct * from ${searchTarget} order by name asc fetch first 10 rows only;`);
                    break;
                case 'Name': 
                    queryResult = await querySQL(`select distinct name from ${searchTarget} order by name asc fetch first 10 rows only;`);
                    break;
                case 'Count': //not implemented yet
                    queryResult = await querySQL(`select count(*) from ${searchTarget};`);
                    break;
                case 'RelatedDrugs': //not implemented yet
                    queryResult = await querySQL(`select distinct * from ${searchTarget} order by name asc fetch first 10 rows only;`);
                    break;
                default:
                    queryResult = await querySQL(`select distinct * from ${searchTarget} order by name asc fetch first 10 rows only;`);
            }
            const tempResultName = searchTarget + "_" + searchOption;
            allResults[tempResultName] = queryResult.rows;
            console.log(allResults);
            res.render('search', {query: queryResult.rows});
        }
        else {
            res.render('search');
        }
        
    });
    app.get('/result', (req, res) => {
        res.render('result', {results: allResults})
    });


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

const port = process.env.PORT ? parseInt(process.env.PORT): 3000 //3000 default

const sessionOptions = {
    secret: process.env.SECRET,
    resave: process.env.RESAVE,
    saveUninitialized: process.env.SAVEUNITITIALIZED
};

start(publicDir, port, sessionOptions);