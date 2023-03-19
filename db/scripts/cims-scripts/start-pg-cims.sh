#!/bin/sh
set -e

export PGPORT=54321
export PGHOST=/$HOME/pgrxnorm/run/
export PGPASSWORD=rxnorm
export PGUSER=rxnorm

pg_ctl -D $HOME/pgrxnorm -l $HOME/pgrxnorm/logfile start
