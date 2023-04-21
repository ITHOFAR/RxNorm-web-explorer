# RxNorm-Explorer

## Overview

This app will allow users to enter various drug identifiers to receive a comprehensive collection of information pertaining to selected drug from the identity used. The user will be able to enter either a drug name, product name, various computer-readable drug identifiers, or other fields to recieve more information on their item.
The RxNorm-Explorer will allow users to gain large amounts of information from just one identifier.

## Data Model

The application will store queried drugs and query results for each user

* data to be queried stored in PostgreSQL (accessed by pg-pool and pg modules)
* users can have multiple queries (results stored in PostgreSQL)
* each query can contain multiple different pieces of information

Example Use 1:

![list create](documentation/figure1.png)

Example Use 2:

![list create](documentation/figure2.png)

## [Link to Commented First Draft Schema](db/sql/create-derived-tables.sql)

See [create-derived-tables.sql](db/sql/create-derived-tables.sql) for PostgreSQL schema

## Wireframes

/search - page for querying different identifiers

![list create](documentation/search.svg)

/result - page for showing results of a user

![list](documentation/results.svg)

## Site map

![list create](documentation/sitemap.svg)

## User Stories

1. I can query the database
2. I can save my query result
3. I can delete my query result
4. I can edit and comment on my query results
5. I can add more queries to my results page by searching more
6. I can search my query results by the name I give them

## Research Topics

* (3 points) currently using dotenv for express-session and pg-pool configuration.

* (2 points) using PostgreSQL and pg-pool to communicate between server and database

* (6 points) front-end will be a React app (WIP)

* (2 points) react-router and react-select (WIP)

13 points total out of 10 required points

## [Link to Initial Main Project Server File](server/app.mjs)

## [Link to Initial Main Project Client File](client/src/main.jsx)

## Annotations / References Used

1. [pg-pool npm page](https://www.npmjs.com/package/pg-pool) - [pg-pool-exec.mjs](server/pg-pool-exec.mjs)
2. [dotenv npm page](https://www.npmjs.com/package/dotenv) - [envs folder](/envs/)
3. [tutorial on flexbox](https://www.joshwcomeau.com/css/interactive-guide-to-flexbox/) - [css WIP](public/css/style.css)
4. [React tutorial](https://react.dev/learn/thinking-in-react) - [client WIP](/client/)
5. [React Router tutorial](https://reactrouter.com/en/main/start/tutorial) - [client WIP](/client/)
6. Conversations with my father, helped paint a picture of interactions between database (PostgreSQL), middle-tier/server (express app), and front-end/client (react app). Not really sure how to cite this.
