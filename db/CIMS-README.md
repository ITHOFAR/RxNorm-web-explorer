# Using the shell to setup PostgreSQL and populate tables (On CIMS)

## Initial Setup

```sh
initdb -D $HOME/pgrxnorm -A md5 -U $USER -W
```

### Now, using an editor of choice

change port to 54321 \
change unix_socket_directory to '/home/ith5263/pgrxnorm/run, /tmp'

```sh
vim postgresql.conf
```

### Start PostgreSQL for the first time and create a log file

```sh
pg_ctl -D $HOME/pgrxnorm -l $HOME/pgrxnorm/logfile start
```

### Create initial database

```sh
createdb -p 54321 -h $HOME/pgrxnorm/run
```

### Interact with PG for the first time

```sh
psql -p 54321 -h /$HOME/pgrxnorm/run/
```

### Stopping PG

```sh
pg_ctl -D $HOME/pgrxnorm -w stop
```

## Creating new user, database, and schema

```sql
create user rxnorm password 'rxnorm';
create database rxnorm OWNER rxnorm;
```

### Create new database: rxnorm as admin: ith5263

```sh
psql -p 54321 -h /$HOME/pgrxnorm/run/ -U ith5263 rxnorm
```

#### Within PG, allow schema: rxnorm under user: rxnorm

```sql
create schema rxnorm authorization rxnorm;
```

### Open PostgreSQL as user: rxnorm on database: rxnorm using schema: rxnorm

``` sh
psql -p 54321 -h /$HOME/pgrxnorm/run/ -U rxnorm rxnorm
```

## Ease of Use for PostgreSQL

### Modify .bash_profile and include exports

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

## Resources and Misc Info

[CIMS Postgres Information](https://cims.nyu.edu/webapps/content/systems/userservices/databases/PostgreSQL-cluster)

When accessing cims, use access1

```sh
ssh <user-name>@access1.cims.nyu.edy
```

### Check if PG is listening on proper port

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
```
