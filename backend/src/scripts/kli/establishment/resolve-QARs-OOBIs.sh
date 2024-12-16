#!/bin/bash

# Variables to hold OOBIs for qar1, qar2, and qar3
qar1_oobi=$1
qar2_oobi=$2
qar3_oobi=$3

# Function to resolve OOBI
resolve_oobi() {
    local name=$1
    local alias=$2
    local oobi=$3
    kli oobi resolve --name "$name" --oobi-alias "$alias" --oobi "$oobi"
}

# Resolve OOBIs
echo "Resolving OOBIs..."
resolve_oobi "ex_gar1" "qar1" "${qar1_oobi}"
resolve_oobi "ex_gar1" "qar2" "${qar2_oobi}"
resolve_oobi "ex_gar1" "qar3" "${qar3_oobi}"

resolve_oobi "ex_gar2" "qar1" "${qar1_oobi}"
resolve_oobi "ex_gar2" "qar2" "${qar2_oobi}"
resolve_oobi "ex_gar2" "qar3" "${qar3_oobi}"

resolve_oobi "in_gar1" "qar1" "${qar1_oobi}"
resolve_oobi "in_gar1" "qar2" "${qar2_oobi}"
resolve_oobi "in_gar1" "qar3" "${qar3_oobi}"

resolve_oobi "in_gar2" "qar1" "${qar1_oobi}"
resolve_oobi "in_gar2" "qar2" "${qar2_oobi}"
resolve_oobi "in_gar2" "qar3" "${qar3_oobi}"
