# Use Docker to setup PostgreSQL and populate tables

Note: See [CIMS-README.md](/db/sql/CIMS-README.md) for postgreSQL setup for CIMS

## Getting RxNorm Data

Download [RxNorm Files](https://www.nlm.nih.gov/research/umls/rxnorm/docs/rxnormfiles.html)

## Build Docker Image

``` sh
docker build -t rxnorm-pg .
```

## Make Reference to rrf subdirectory within RxNorm data and export

Using Bash/zsh:

```sh
DATA_DIR="$HOME/Downloads/(RxNorm-FileName)/rrf"
export DATA_DIR
```

(path varies depending on filename and file location)

## Start the Docker Container

Run shell script within terminal:

```sh
db/scripts/./docker-run.sh
```

Expect the process to take around ~15 minutes depending on computer's power.

To view loading process:

```sh
docker logs rxnorm-pg -f
```

## Connect to psql

```sh
docker exec -it rxnorm-pg psql -U rxnorm
```

## Stop the container

```sh
docker rm -vf rxnorm-pg
```
