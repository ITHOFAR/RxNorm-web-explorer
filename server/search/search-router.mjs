import express from "express";
import {querySQL} from './../pg-pool-exec.mjs';

export const router = express.Router();

router.post("/", async (req, res) => {
   try
   {
        let {name, id, table, option, comment, parameter} = req.body || null;
        let queryResult;

        if (parameter.length > 0) {
            switch (option) {
                case 'All': 
                    queryResult = await querySQL(`select distinct * from ${table} where name ilike $1 order by name asc fetch first 5 rows only;`, ['%' + (parameter || '') + '%']);
                    break;
                case 'Name': 
                    queryResult = await querySQL(`select distinct name from ${table} where name ilike $1 order by name asc fetch first 5 rows only;`, ['%' + (parameter || '') + '%']);
                    break;
                case 'Count': 
                    queryResult = await querySQL(`select count(*) from ${table} where name ilike $1;`, ['%' + (parameter || '') + '%']);
                    break;
                default:
                    queryResult = await querySQL("select distinct * from SCD where name ilike $1 order by name asc fetch first 5 rows only;", ['%' + (parameter || '') + '%']);
            }
        }
        else {
            switch (option) {
                case 'All': 
                    queryResult = await querySQL(`select distinct * from ${table} order by name asc fetch first 5 rows only;`);
                    break;
                case 'Name': 
                    queryResult = await querySQL(`select distinct name from ${table} order by name asc fetch first 5 rows only;`);
                    break;
                case 'Count': 
                    queryResult = await querySQL(`select count(*) from ${table};`);
                    break;
                default:
                    queryResult = await querySQL("select distinct * from SCD order by name asc fetch first 5 rows only;");
            }
        }
        const resultName = table ? table + " + " + option + ": " + "No Custom Name" : "SCD + ALL: Default Query";
        name = name ? name : resultName;

        let result;
        if (option == 'All') {
            switch (table) {
                case "scd":
                    result = JSON.stringify(queryResult.rows.map(RowToSCD));
                    break;
                case "sbd":
                    result = JSON.stringify(queryResult.rows.map(RowToSBD));
                    break;
                case "mthspl_prod":
                    result = JSON.stringify(queryResult.rows.map(RowToMTHSPL));
                    break;
                case "gpck":
                    result = JSON.stringify(queryResult.rows.map(RowToGPCK));
                    break;
                case "bpck":
                    result = JSON.stringify(queryResult.rows.map(RowToGPCK));
                    break;
                default:
                    result = JSON.stringify(queryResult.rows.map(RowToSCD));
            };
        }
        else {
            result = JSON.stringify(queryResult.rows);
        }

        const resultObject = {
            name: name, 
            id: id,
            result: result,
            table: table,
            option: option,
            comment: comment,
            parameter: parameter
        };

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
        const {name, id, result, table, option, comment, parameter} = req.body.query || null;
        let sql = `UPDATE results SET name = $1, result = $3, "table" = $4, option = $5, comment = $6, parameter = $7 where id = $2`
        await querySQL(sql, [name, id, result, table, option, comment, parameter]);
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

function RowToSCD(r) {
    return {Rxcui: r.rxcui, Rxaui: r.rxaui, Name: r.name, "Prescribable Name": r.prescribable_name, "Dose Form": r.rxterm_form, "Available Strengths": r.available_strengths};
};

function RowToSBD(r) {
    return {Rxcui: r.rxcui, Rxaui: r.rxaui, Name: r.name, "Prescribable Name": r.prescribable_name, "Dose Form": r.rxterm_form, "Available Strengths": r.available_strengths, "SCD Rxcui": r.scd_rxcui};
};

function RowToMTHSPL(r) {
    return {Rxcui: r.rxcui, Rxaui: r.rxaui, NDC: r.code, Name: r.name, "SCD Rxcui": r.scd_rxcui, "SBD Rxcui": r.sbd_rxcui};
};

function RowToGPCK(r) {
    return {Rxcui: r.rxcui, Rxaui: r.rxaui, Name: r.name, "Prescribable Name": r.prescribable_name};
};

function RowToBPCK(r) {
    return {Rxcui: r.rxcui, Rxaui: r.rxaui, Name: r.name, "Prescribable Name": r.prescribable_name, "GPCK Rxcui": r.gpck_rxcui};
};
