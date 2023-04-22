import { 
    Form,
    useLoaderData,
   } from "react-router-dom";
import { getQuery } from "../querys";

export async function loader({ params }) {
    const query = await getQuery(params.queryId);
    if (!query) {
      throw new Response("", {
        status: 404,
        statusText: "Not Found",
      });
    }
    return { query };
};

export default function Query() {
    const { query } = useLoaderData();
  
    return (
      <div id="query"> 
        <div>
          <h1> {query.name ? (<> {query.name} </>) 
          : (<i>No Name</i>)}
          </h1>

        {query.parameter && <h3>Searched: "{query.parameter}"</h3>}

        {(query.table && query.option) && (
          <h3>
             From Table: "{query.table}" using Option: "{query.option}" 
          </h3>
        )}
  
        {query.result ? ( //TODO EXPAND AND MAKE LOOK NICE
            <div className="table-container" role="table" aria-label="QueryResults">
              <div className="flex-table header" role="rowgroup">
                <div className="flex-row first" role="columnheader">{Object.keys(query.result[0])[0]}</div>
                {Object.keys(query.result[0]).slice(1).map((val, index) => 
                  <div key={index} className="flex-row" role="columnheader">{val}</div>
                )}
              </div>
              {query.result.map((obj, index) => 
                <div className="flex-table row" key={index} role="rowgroup">
                  <div className="flex-row first" role="cell"><span className="QueryValues">{Object.values(obj)[0]}</span> </div>
                  {Object.values(obj).slice(1).map((val, index) => 
                    <div className="flex-row" key={index}role="cell">{val}</div>
                  )}
                </div>
              )}
            </div>
          )
        : (<i>No Query Result</i>)}

        {(query.comment) ? (<h3>Comments: "{query.comment}"</h3>)
        :(<p><b>Try using the Edit Button to fill out your query and add custom comments</b></p>)}
  
          <div>
            <Form action="edit">
              <button type="submit">Edit</button>
            </Form>
            <Form
              method="post"
              action="destroy"
              onSubmit={(event) => {
                if (
                  !confirm(
                    "Please confirm you want to delete this record."
                  )
                ) {
                  event.preventDefault();
                }
              }}
            >
              <button type="submit">Delete</button>
            </Form>
          </div>
        </div>
      </div>
    );
};
