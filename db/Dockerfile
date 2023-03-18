FROM postgres:15.2

# create rxnorm tables
COPY sql/schemas.sql /docker-entrypoint-initdb.d/00-userconfig.sql
COPY sql/rxnorm-orig/RxNormDDL.sql /docker-entrypoint-initdb.d/01-RxNormDDL.sql
# populate rxnorm tables
COPY scripts/populate-rxnorm-tables.sh /docker-entrypoint-initdb.d/02-populate-rxnorm-tables.sh

# create derived tables
COPY sql/create-derived-tables.sql /docker-entrypoint-initdb.d/03-derived-tables.sql
# populate derived tables
COPY sql/populate-derived-tables.sql /docker-entrypoint-initdb.d/04-populate-derived-tables.sql

RUN chmod a+r /docker-entrypoint-initdb.d/*

VOLUME /rxnorm-rrf

ENV POSTGRES_USER=rxnorm
ENV POSTGRES_PASSWORD=rxnorm
ENV POSTGRES_DB=rxnorm