import { querySQL } from "../pg-pool-exec.mjs"

export async function getAllSCDs() {
    const sql = 
    "select name, prescribable_name, rxcui, rxaui " +
    "from scd;"

    const res = await querySQL(sql);
}

// export async function getSCDCrxcui(rxcui) {
//     const sql = 
//     "select name, prescribable_name, rxcui, rxaui " +
//     "from scd " + 
//     "where rxcui = $1"
// }