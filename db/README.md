# Using Docker to Setup PostgreSQL and Populate Tables

Note: See [CIMS-README.md](CIMS-README.md) for postgreSQL setup for CIMS

## First Steps

### Getting the RxNorm Data

Download RxNorm files [here](https://www.nlm.nih.gov/research/umls/rxnorm/docs/rxnormfiles.html). \
**Warning:** Downloading the files requires a free account that can take days to be verified or approved. Copy of files present on CIMS.

### Building the Docker Container

Build a docker container named rxnorm-pg.

``` sh
docker build -t rxnorm-pg .
```

### Volume Mounting our RxNorm data within the Container

Example using Bash/zsh to export location of data:

```sh
DATA_DIR="$HOME/Downloads/rrf"
export DATA_DIR
```

(path varies depending on filename and file location)

### Starting the Docker Container

Run the following shell script within terminal:

```sh
db/scripts/./docker-run.sh
```

Expect the process to take around ~15 minutes depending on computer's processing power.

To view the loading process:

```sh
docker logs rxnorm-pg -f
```

### Connecting to PostgreSQL

```sh
docker exec -it rxnorm-pg psql -U rxnorm
```

### Stopping the container

```sh
docker rm -vf rxnorm-pg
```

## Usage

The [Dockerfile](db/Dockerfile) created the database, username, password, and schema upon launch of the image. Additionally, the tables were created and populated with PostgreSQL. \
As such, the PostgreSQL instance is now ready to be queried by our app.
