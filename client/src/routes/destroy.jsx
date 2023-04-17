import { redirect } from "react-router-dom";
import { deleteQuery } from "../querys";

export async function action({ params }) {
    await deleteQuery(params.queryId);
    return redirect("/");
}