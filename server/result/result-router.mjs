import express from "express";
import {querySQL} from './../pg-pool-exec.mjs';

export const router = express.Router();

router.get("/", async (req, res) => {
   try
   {
      const results = await querySQL(`select * from results;`);
      const data = JSON.stringify(results.rows)

      res.status(200).json(data); //SENDS JSON {{resultname: results}}
   }
   catch (e)
   {
      res.status(404).send(e.message);
   }
});

router.post("/delete", async (req, res) => {
    try
    {
         const id = req.body.id || null;
         await querySQL("DELETE FROM results where id = $1;", [id]);
   
         res.status(200)
    }
    catch (e)
    {
       res.status(500).send(e.message);
    }
});