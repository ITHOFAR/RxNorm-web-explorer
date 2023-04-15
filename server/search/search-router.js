import express from "express";

export const router = express.Router();

router.get("/", async (req, res) => {
   try
   {
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
        }

      const foos = await FoosService.getFoos(searchText);

      res.status(200).send(foos);
   }
   catch (e)
   {
      res.status(404).send(e.message);
   }
});

function rowToSCD(r) {
    return {rxcui: r.rxcui, rxaui: r.rxaui, name: r.name, prescribale_name: prescribable_name, available_strengths: r.available_strengths};
}

function rowToSBD(r) {
    return {rxcui: r.rxcui, rxaui: r.rxaui, name: r.name, prescribale_name: prescribable_name, scd_rxcui: scd_rxcui, available_strengths: r.available_strengths};
}

function rowToMTHSPL(r) {
    return {rxcui: r.rxcui, rxaui: r.rxaui, ndc: r.code, name: r.name, scd_rxcui: scd_rxcui, sbd_rxcui: sbd_rxcui};
}