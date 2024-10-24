#!/bin/sh
set -e
#call from within db

SCRIPT_DIR="$(dirname "$(realpath "$0")")"
cd "$SCRIPT_DIR"/..

# creating rxnorm tables
psql -U rxnorm -f "$SCRIPT_DIR"/../../sql/rxnorm-orig/RxNormDDL.sql -v ON_ERROR_STOP=1
# populates created rxnorm tables
"$SCRIPT_DIR"/populate-rxnorm-tables.sh

# creating derived tables from rxnorm tables
psql -U rxnorm -f "$SCRIPT_DIR"/cims-sql/create-derived-tables-cims.sql -v ON_ERROR_STOP=1
# populating derived tables
psql -U rxnorm -f "$SCRIPT_DIR"/cims-sql/populate-derived-tables-cims.sql -v ON_ERROR_STOP=1