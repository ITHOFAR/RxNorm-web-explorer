import express from "express";
import {querySQL} from './../pg-pool-exec.mjs';

export const router = express.Router();

router.post("/", async (req, res) => {
   try
   {
        const {id, t, o, comment} = JSON.parse(req.body) || null;
        let queryResult;

        switch (o) {
            case 'All': // http://localhost:3001/api/search/?t=SCD&o=All
                queryResult = await querySQL(`select distinct * from ${t} order by name asc fetch first 10 rows only;`);
                break;
            case 'Name': 
                queryResult = await querySQL(`select distinct name from ${t} order by name asc fetch first 10 rows only;`);
                break;
            case 'Count': 
                queryResult = await querySQL(`select count(*) from ${t};`);
                break;
            default:
                queryResult = await querySQL("select distinct * from scd order by name asc fetch first 1 rows only;");
        }
        const resultName = t ? t + "_" + o + "_" + new Date().getTime() : "SCD_ALL_" + new Date().getTime();
        const result = queryResult.rows;
        const resultObject = {
            name: resultName, 
            id: id,
            results: result,
            table: t,
            option: o,
            comment: comment
        }
        // await querySQL(`INSERT INTO result (name, id, result, table, option) VALUES (${resultName}, ${1}, ${result}, ${t}, ${o});`);
        // await querySQL("INSERT INTO results (name, id, result) VALUES ($1, $2, $3)", [resultName, 3, JSON.stringify(result)]);
        // await querySQL("TRUNCATE TABLE results;");
        res.status(200).json(JSON.stringify(resultObject));
   }
   catch (e)
   {
        res.status(404).send(e.message);
   }
});

router.post("/update", async (req, res) => {
    try 
    {
        const {name, id, results, table, option, comment} = JSON.parse(req.body).query || null;
        await querySQL("UPDATE results SET name = $1, results = $3, table = $4, option = $5, comment = $6 where id = $2", [name, id, results, table, option, comment]);
        res.status(200).send();
    }
    catch (e)
    {
        res.status(404).send(e.message);
    }
});

router.post("/add/default", async (req, res) => {
    try 
    {
        const id = JSON.parse(req.body).id || null;
        await querySQL("INSERT INTO results (id) VALUES ($1)", [id]);
        res.status(200).send(); //no message
    }
    catch (e)
    {
        res.status(404).send(e.message);
    }
});
