#!/bin/sh
set -e

docker rm -vf rxnorm-pg 2> /dev/null || echo no current running postgreSQL

echo starting PostgreSQL
docker run -d --name rxnorm-pg -p 5432:5432 \
 -v "$DATA_DIR":/rxnorm-rrf \
 rxnorm-pg #-c "max_wal_size=3GB" not sure if needed

# \ -v rxnorm-pg-data:/var/lib/postgresql/data goes on line 6
# add back when moving to production