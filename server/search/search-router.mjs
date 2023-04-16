import express from "express";
import {querySQL} from './../pg-pool-exec.mjs';

export const router = express.Router();

router.get("/", async (req, res) => {
    res.send("HELLO WORLD");
//    try
//    {
//         const {searchTarget, searchOption} = req.query || null;

//         let queryResult;
//         switch (searchOption) {
//             case 'All':
//                 queryResult = await querySQL("select distinct * from $1 order by name asc fetch first 10 rows only;", [searchTarget]);
//                 break;
//             case 'Name': 
//                 queryResult = await querySQL("select distinct name from $1 order by name asc fetch first 10 rows only;", [searchTarget]);
//                 break;
//             case 'Count': 
//                 queryResult = await querySQL("select count(*) from $1;", [searchTarget]);
//                 break;
//             default:
//                 queryResult = await querySQL("select distinct * from scd order by name asc fetch first 10 rows only;");
//         }
//         const resultName = searchTarget + "_" + searchOption + "_" + Date.prototype.getTime();
//         const result = queryResult.rows.map(rowToResult);
//         await querySQL("INSERT INTO results (name, result) VALUES ($1, $2)", [resultName, result]);

//         res.status(200).send({[resultName]: result});
//    }
//    catch (e)
//    {
//         res.status(404).send(e.message);
//    }
});

function rowToResult(r) {
    return {rxcui: r.rxcui, rxaui: r.rxaui, name: r.name};
}

// function rowToSCD(r) {
//     return {rxcui: r.rxcui, rxaui: r.rxaui, name: r.name, prescribale_name: prescribable_name, available_strengths: r.available_strengths};
// }

// function rowToSBD(r) {
//     return {rxcui: r.rxcui, rxaui: r.rxaui, name: r.name, prescribale_name: prescribable_name, scd_rxcui: scd_rxcui, available_strengths: r.available_strengths};
// }

// function rowToMTHSPL(r) {
//     return {rxcui: r.rxcui, rxaui: r.rxaui, ndc: r.code, name: r.name, scd_rxcui: scd_rxcui, sbd_rxcui: sbd_rxcui};
// }