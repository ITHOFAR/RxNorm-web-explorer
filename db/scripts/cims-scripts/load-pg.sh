#!/bin/sh
set -e
#call from within db

SCRIPT_DIR="$(dirname "$(realpath "$0")")"
cd "$SCRIPT_DIR"/..

# creating rxnorm tables
psql -U rxnorm -f sql/rxnorm-orig/RxNormDDL.sql
# populates created rxnorm tables
"$SCRIPT_DIR"/cims-scripts/populate-rxnorm-tables.sh

# creating derived tables from rxnorm tables
psql -U rxnorm -f sql/create-derived-tables.sql
# populating derived tables
psql -U rxnorm -f sql/populate-derived-tables.sql