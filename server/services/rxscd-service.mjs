import { querySQL } from "../pg-pool-exec.mjs"

async function getAllSCDs() { //testing only, never use in prod
    const sql = 
    "select name, prescribable_name, rxcui, rxaui " +
    "from scd;"

    const res = await querySQL(sql);
    return res.rows;
}

export async function getSCDCrxcui(rxcui) {

    const res = await querySQL("select name, prescribable_name, rxcui, rxaui from scd where rxcui = $1", [rxcui]);
    return res.rowCount !== 0 ? row.rows : null;
}