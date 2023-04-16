import express from "express";
import {querySQL} from './../pg-pool-exec.mjs';

export const router = express.Router();

router.get("/", async (req, res) => {
   try
   {
      const results = await querySQL(`select * from results;`);

      res.status(200).send(results); //SENDS JSON {{resultname: results}}
   }
   catch (e)
   {
      res.status(404).send(e.message);
   }
});

router.delete("/", async (req, res) => {

    try
    {
        const name = req.body.ResultName;

        await querySQL("DELETE FROM results where name = $1;", [name]);
 
        res.status(200)
    }
    catch (e)
    {
       res.status(500).send(e.message);
    }
});