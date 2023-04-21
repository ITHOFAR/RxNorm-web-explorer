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

    console.log(query.result);
    console.log(query.result[0].rxaui);
  
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
  
        {query.result && ( //TODO EXPAND AND MAKE LOOK NICE
            <h3>
                User Results: 
                    {query.result.map((res) => 
                  <p classname="queryResult" key={res.rxaui}>{Object.entries(res).map((pair) => 
                  `${pair[0]}: ${pair[1]} `)}</p>)}
            </h3>
          )}

        {query.comment && <h3>{query.comment}</h3>}
  
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
