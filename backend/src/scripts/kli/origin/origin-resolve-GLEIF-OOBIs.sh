#!/bin/bash

# Variables to hold OOBIs for ex_gar1, ex_gar2, in_gar1, and in_gar2
ex_gar1_oobi=$1
ex_gar2_oobi=$2

in_gar1_oobi=$3
in_gar2_oobi=$4

# Function to resolve OOBI
resolve_oobi() {
    local name=$1
    local alias=$2
    local oobi=$3
    kli oobi resolve --name "$name" --oobi-alias "$alias" --oobi "$oobi"
}

# Resolve OOBIs
echo "Resolving OOBIs..."
resolve_oobi "qar1" "ex_gar1" "${ex_gar1_oobi}"
resolve_oobi "qar2" "ex_gar1" "${ex_gar1_oobi}"
resolve_oobi "qar3" "ex_gar1" "${ex_gar1_oobi}"

resolve_oobi "qar1" "ex_gar2" "${ex_gar2_oobi}"
resolve_oobi "qar2" "ex_gar2" "${ex_gar2_oobi}"
resolve_oobi "qar3" "ex_gar2" "${ex_gar2_oobi}"

resolve_oobi "qar1" "in_gar1" "${in_gar1_oobi}"
resolve_oobi "qar2" "in_gar1" "${in_gar1_oobi}"
resolve_oobi "qar3" "in_gar1" "${in_gar1_oobi}"

resolve_oobi "qar1" "in_gar2" "${in_gar2_oobi}"
resolve_oobi "qar2" "in_gar2" "${in_gar2_oobi}"
resolve_oobi "qar3" "in_gar2" "${in_gar2_oobi}"
