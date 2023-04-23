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
  
        {(query.result && query.result.length > 0) ? ( 
            <div className="tableDiv" aria-label="tableDiv">
              <table id="queryTable">
                <tbody>
                <tr>
                  {Object.keys(query.result[0]).map((val, index) => 
                    <th className="table-header" key={index}><b>{val}</b></th>
                  )}
                </tr>
                {query.result.map((obj, index) => 
                <tr key={index + 100}>
                    {Object.values(obj).map((val, i) => 
                    val ?  <td className="table-row" key={i + val}>{val}</td>
                    : <td>N/A</td>
                    )}
                </tr>
                )}
                </tbody>
              </table>
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
