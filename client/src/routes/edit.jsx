import { 
    Form, 
    useLoaderData,
    redirect,
    useNavigate,
 } from "react-router-dom";
 import { updateQuery } from "../querys";
 import Select from 'react-select';


 export async function action({ request, params }) {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);

    console.log(updates);
    
    const responce = await fetch("/api/search", { //returns query result data
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: updates.name, id: params.queryId, table: updates.table, option: updates.option, comment: updates.comment, parameter: updates.parameter })
    });

    let updateVals = await responce.json();
    updateVals = JSON.parse(updateVals);
    console.log(updateVals);

    await updateQuery(params.queryId, updateVals);
    return redirect(`/querys/${params.queryId}`);
};

export default function EditQuery() {
  const { query } = useLoaderData();
  const navigate = useNavigate();

  const tableOptions = [
    { value: "SCD", label: "SCD: Semantic Clinical Drug"},
    { value: "SBD", label: "SBD: Semantic Branded Drug"},
    { value: "mthspl_prod", label: "MTHSPL: FDA Structured Product Labels"},
  ];

  const optionOptions = [
    { value: "ALL", label: "ALL: All information"},
    { value: "Name", label: "Name: Name only"},
    { value: "Count", label: "Count: Amount only"},
  ];

  return (
    <Form method="post" id="query-form">
        <label htmlFor="aria-table-select">
          Database Table:&nbsp;&nbsp; 
          <Select
            className="Table name"
            defaultValue={tableOptions[0]}
            name="table"
            inputId="aria-table-select"
            options={tableOptions}
            isSearchable={false}
            styles={{
              indicatorSeparator: () => ({ display: "none" }),
            }}
          />
        </label> 
        
      <label htmlFor="aria-option-select">
        Query Options:&nbsp;&nbsp;&nbsp;&nbsp; 
        <Select
          className="option name"
          defaultValue={optionOptions[0]}
          name="option"
          inputId="aria-option-select"
          options={optionOptions}
          isSearchable={false}
          styles={{
            indicatorSeparator: () => ({ display: "none" }),
          }}
        />
      </label>
      <label>
        <span>Name to Search:</span>
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
          placeholder="In this version of the app, only the first 5 results will be displayed"
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