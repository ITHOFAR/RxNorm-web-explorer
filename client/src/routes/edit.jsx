import { 
    Form, 
    useLoaderData,
    redirect,
    useNavigate,
 } from "react-router-dom";
 import { updateQuery } from "../querys";

 export async function action({ request, params }) {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    
    const responce = await fetch("/api/search", { //returns query result data
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: updates.name, id: params.queryId, table: updates.table, option: updates.option, comment: updates.comment, parameter: updates.parameter })
    });

    let updateVals = await responce.json();
    updateVals = JSON.parse(updateVals);

    await updateQuery(params.queryId, updateVals);
    return redirect(`/querys/${params.queryId}`);
};

export default function EditQuery() {
  const { query } = useLoaderData();
  const navigate = useNavigate();

  return (
    <Form method="post" id="query-form">
      <p>
        <span>Database Table</span> 
        {/* TODO USE REACT-SELECT */}
        <input
          placeholder="SCD"
          aria-label="Table name"
          type="text"
          name="table"
          defaultValue={query.table}
        />
      </p>
      <label>
        <span>Query Options</span>
        <input
          type="text"
          name="option"
          placeholder="ALL"
          defaultValue={query.option}
        />
      </label>
      <label>
        <span>Drug Name to search</span>
        <input
          type="text"
          name="parameter"
          placeholder="abacavir"
          defaultValue={query.parameter}
        />
      </label>
      <label>
        <span>Custom Name</span>
        <input
          placeholder="My Awesome Query"
          aria-label="Custom Name"
          type="text"
          name="name"
          defaultValue={query.name}
        />
      </label>
      <label>
        <span>Comments</span>
        <textarea
          name="comment"
          defaultValue={query.comment}
          rows={6}
        />
      </label>
      <p>
        <button type="submit">Save</button>
        <button type="button"
        onClick={() => {
            navigate(-1);
          }}
          >
            Cancel
            </button>
      </p>
    </Form>
  );
}