# Using the shell to setup PostgreSQL and populate tables (On CIMS)

## Initial Setup

The first step in creating a PostgreSQL instance on CIMS is to run the following command:

```sh
initdb -D $HOME/pgrxnorm -A md5 -U $USER -W
```

### Now, using an editor of choice, open  **postgresql.conf**

Change port to 54321 and \
Change unix_socket_directory to '/home/ith5263/pgrxnorm/run, /tmp'

### Start PostgreSQL for the first time and create a log file

```sh
pg_ctl -D $HOME/pgrxnorm -l $HOME/pgrxnorm/logfile start
```

#### If you need to stop PostgreSQL, enter the following command in shell

```sh
pg_ctl -D $HOME/pgrxnorm -w stop
```

### Create initial database as default user

```sh
createdb -p 54321 -h $HOME/pgrxnorm/run
```

## Creating new user, database, and schema

Enter PostgreSQL by running the following shell command:

```sh
psql -p 54321 -h /$HOME/pgrxnorm/run/
```

Once inside, we need to run these two lines to create our non-admin user and database for our project.

```sql
create user rxnorm password 'rxnorm';
create database rxnorm OWNER rxnorm;
```

### To create our schema with proper permissions, we need to log in again as admin

```sh
psql -p 54321 -h /$HOME/pgrxnorm/run/ -U ith5263 rxnorm
```

#### Now, within PG, we create our schema and authorize it under our new user

```sql
create schema rxnorm authorization rxnorm;
```

### To use PostgreSQL as our new user, run the following command in shell

``` sh
psql -p 54321 -h /$HOME/pgrxnorm/run/ -U rxnorm rxnorm
```

## Ease of Use for PostgreSQL

### Modify .bash_profile and include following exports

```sh
export PGPORT=54321
export PGHOST=/$HOME/pgrxnorm/run/
export PGPASSWORD=rxnorm
export PGUSER=rxnorm
```

### Alternative to modifying .bash_profile

#### create .pgpass at root with below contents

```sh
*:54321:rxnorm:rxnorm:rxnorm
```

## Script Usage

### To run PostgreSQL with the proper user name after set-up

```sh
scripts/./start-pg-cims.sh
```

### To populate database with rxnorm information

**Warning:** On CIMS, this can take over 30 minutes.

```sh
scripts/./load-pg.sh
```

## Resources and Misc Info

[CIMS Postgres Information](https://cims.nyu.edu/webapps/content/systems/userservices/databases/PostgreSQL-cluster)

When accessing cims, use access1 for consistency

```sh
ssh <user-name>@access1.cims.nyu.edy
```

### To check if PG is listening on proper port

```sh
lsof | grep 54321 
```

### General PG INFO

``` text
Port: 54321
Admin Username: ith5263
Admin password: ith5263

Username: rxnorm
Password: rxnorm
Database: rxnorm
Schema:   rxnorm

Production Server: ssh ith5263@linserv1.cims.nyu.edu
```

## Differences between CIMS and Docker Version

CIMS's rxnorm's scd table lacks **ingrset_rxcui** due to complications caused by using a **lateral join** \
(lateral joins not introduced until Postgres 9.3+, CIMS runs Postgres 9.2)
