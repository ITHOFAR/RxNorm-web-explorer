import { matchSorter } from "match-sorter";
import sortBy from "sort-by";

export async function getQuerys(search) {
    let responce = await fetch("/api/result", {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    }); //fetch all results, JSON object

    let querys = await responce.json();

    if (!querys) querys = []; //empty case

    querys = await JSON.parse(querys);

    if (search) {
      querys = matchSorter(querys, search, { keys: ["name"] });
    }
    return querys.sort(sortBy("name"));
};

export async function getQuery(id) {
    let responce = await fetch("/api/result", {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    }); //fetch all results, JSON object

    let querys = await responce.json();
    querys = await JSON.parse(querys);

    let query = querys.find(query => query.id === id);
    return query ?? null;
};

export async function createQuery() { //hit database with search upon "edit" not create
    let id = Math.random().toString(36).substring(2, 9);
    let newQuery = { id };

    fetch("/api/search/add", { //adds query with only ID, will fill in rest at update
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: id })
    });
    return newQuery;
};

export async function deleteQuery(id) {

    let responce = await fetch("/api/result", {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    }); //fetch all results, JSON object

    let querys = await responce.json();
    querys = await JSON.parse(querys);

    let index = querys.findIndex(query => query.id === id);

    if (index > -1) { //id exist
        fetch("/api/result/delete", { //remove from database
            ///api/result/delete
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: id })
        }).then(()=> {return true;});
    }
    else {
        return false;
    }
};
  
export async function updateQuery(id, updatedVals) {
    let responce = await fetch("/api/result", {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    }); //fetch all results, JSON object

    let querys = await responce.json();
    querys = await JSON.parse(querys);

    let query = querys.find(query => query.id === id);

    if (!query) throw new Error("No query found for", id);

    Object.assign(query, updatedVals);

    await fetch("/api/search/update", { //
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: query })
    });

    return query;
};