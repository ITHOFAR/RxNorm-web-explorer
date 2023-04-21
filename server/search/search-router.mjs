import express from "express";
import {querySQL} from './../pg-pool-exec.mjs';

export const router = express.Router();

router.post("/", async (req, res) => {
   try
   {
        let {name, id, t, o, comment, parameter} = JSON.parse(req.body) || null;
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
        name = name ? name : resultName;

        const result = queryResult.rows;
        const resultObject = {
            name: name, 
            id: id,
            results: result,
            table: t,
            option: o,
            comment: comment,
            parameter: parameter
        }
        // await querySQL(`INSERT INTO result (name, id, result, table, option) VALUES (${resultName}, ${1}, ${result}, ${t}, ${o});`);
        // await querySQL("INSERT INTO results (name, id, result) VALUES ($1, $2, $3)", [resultName, 3, JSON.stringify(result)]);
        // await querySQL("TRUNCATE TABLE results;");
        const data = JSON.stringify(resultObject)
        res.status(200).json(data);
   }
   catch (e)
   {
        res.status(500).send(e.message);
   }
});

router.post("/update", async (req, res) => {
    try 
    {
        const {name, id, results, table, option, comment, parameter} = JSON.parse(req.body).query || null;
        await querySQL("UPDATE results SET name = $1, results = $3, table = $4, option = $5, comment = $6, paramter = $7 where id = $2", [name, id, results, table, option, comment, parameter]);
        res.status(200).send();
    }
    catch (e)
    {
        res.status(500).send(e.message);
    }
});

router.post("/add", async (req, res) => {
    try 
    {
        const id = req.body.id || null;
        let sql = "INSERT INTO results (id) VALUES ($1);"
        await querySQL(sql, [id]);
        
        res.status(200); //no message
    }
    catch (e)
    {
        res.status(500).send(e.message);
    }
});
