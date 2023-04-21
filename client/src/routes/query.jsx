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
          <h1>
            {query.name ? (
              <>
                {query.name}
              </>
            ) : (
              <i>No Name</i>
            )}
          </h1>

          { (query.table && query.option) && (
          <p>
            {query.option} {query.table}
          </p>
        )}
  
          {query.result && ( //TODO EXPAND AND MAKE LOOK NICE
            <p>
                {Object.toString(query.result)}
            </p>
          )}
  
          {query.comment && <p>{contact.comment}</p>}
  
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
