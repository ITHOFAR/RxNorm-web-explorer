import { 
  Outlet, 
  NavLink,
  useLoaderData,
  Form,
  redirect,
  useNavigation,
  useSubmit,
 } from "react-router-dom";
import { getQuerys, createQuery } from "../querys";
import { useEffect } from "react";


export async function action() {
  const query = await createQuery(); 
  return redirect(`/querys/${query.id}/edit`); //when new query is made, redirect to edit
}

export default function Root() {
  const { querys, q } = useLoaderData();
  const navigation = useNavigation();
  const submit = useSubmit();

  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has("q");

  useEffect(() => {
    document.getElementById("q").value = q; 
  }, [q]);

    return (
      <>
        <div id="sidebar">
          <h1>RxNorm Explorer Querys</h1>
          <div>
          <Form id="search-form" role="search">
              <input
                id="q"
                className={searching ? "loading" : ""}
                aria-label="Search query results"
                placeholder="Search"
                type="search"
                name="q"
                defaultValue={q}
                onChange={(event) => {
                  const isFirstSearch = q == null;
                  submit(event.currentTarget.form, {
                    replace: !isFirstSearch,
                });
                }}
              />
              <div
                id="search-spinner"
                aria-hidden
                hidden={!searching}
              />
              <div
                className="sr-only"
                aria-live="polite"
              ></div>
            </Form>
            <Form method="post">
            <button type="submit">New</button>
          </Form>
          </div>
          <nav>
          {querys.length ? (
            <ul>
              {querys.map((query) => (
                <li key={query.id}>
                  <NavLink
                    to={`querys/${query.id}`}
                    className={({ isActive, isPending }) =>
                      isActive
                        ? "active"
                        : isPending
                        ? "pending"
                        : ""
                    }
                  >
                    {query.name ? (
                      <>
                        {query.name}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No querys</i>
            </p>
          )}
          </nav>
        </div>
        <div id="detail"
        className={
          navigation.state === "loading" ? "loading" : ""
        }>
          <Outlet />
        </div>
      </>
    );
  }

  export async function loader({ request }) {
    const url = new URL(request.url);
    const q = url.searchParams.get("q");
    const querys = await getQuerys(q);
    return { querys, q };
  }