#!/bin/sh
set -e

SCRIPT_DIR="$(dirname "$(realpath "$0")")"
cd "$SCRIPT_DIR"/..

echo Loading rxnconso
sed 's/|$//' /rxnorm-rrf/RXNCONSO.RRF |
  psql -U rxnorm -c "\copy rxnconso from stdin with delimiter '|' csv quote E'\b' null as ''"

echo Loading rxnsat
sed 's/|$//' /rxnorm-rrf/RXNSAT.RRF |
  psql -U rxnorm -c "\copy rxnsat from stdin with delimiter '|' csv quote E'\b' null as ''"

echo Loading rxnrel
sed 's/|$//' /rxnorm-rrf/RXNREL.RRF |
  psql -U rxnorm -c "\copy rxnrel from stdin with delimiter '|' csv quote E'\b' null as ''"

echo Loading rxndoc
sed 's/|$//' /rxnorm-rrf/RXNDOC.RRF |
  psql -U rxnorm -c "\copy rxndoc from stdin with delimiter '|' csv quote E'\b' null as ''"

echo Loading rxnsty
sed 's/|$//' /rxnorm-rrf/RXNSTY.RRF |
  psql -U rxnorm -c "\copy rxnsty from stdin with delimiter '|' csv quote E'\b' null as ''"

echo Loading rxnsab
sed 's/|$//' /rxnorm-rrf/RXNSAB.RRF |
  psql -U rxnorm -c "\copy rxnsab from stdin with delimiter '|' csv quote E'\b' null as ''"

echo Loading rxnatomarchive
sed 's/|$//' /rxnorm-rrf/RXNATOMARCHIVE.RRF |
  psql -U rxnorm -c "\copy rxnatomarchive from stdin with delimiter '|' csv quote E'\b' null as ''"

echo Loading rxncuichanges
sed 's/|$//' /rxnorm-rrf/RXNCUICHANGES.RRF |
  psql -U rxnorm -c "\copy rxncuichanges from stdin with delimiter '|' csv quote E'\b' null as ''"

echo Loading rxncui
sed 's/|$//' /rxnorm-rrf/RXNCUI.RRF |
  psql -U rxnorm -c "\copy rxncui from stdin with delimiter '|' csv quote E'\b' null as ''"
