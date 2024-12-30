#!/bin/bash

# Function to generate OOBI
generate_oobi() {
    local name=$1
    kli oobi generate --name "$name" --alias "$name" --role witness | sed -n '2p'
}

# Function to resolve OOBI
resolve_oobi() {
    local name=$1
    local alias=$2
    local oobi=$3
    kli oobi resolve --name "$name" --oobi-alias "$alias" --oobi "$oobi"
}

# Generate OOBIs
echo "Generating OOBIs..."
ex_gar1_oobi=$(generate_oobi "ex_gar1")
ex_gar2_oobi=$(generate_oobi "ex_gar2")
in_gar1_oobi=$(generate_oobi "in_gar1")
in_gar2_oobi=$(generate_oobi "in_gar2")

# Print generated OOBIs
echo "ex_gar1: $ex_gar1_oobi"
echo "ex_gar2: $ex_gar2_oobi"
echo "in_gar1: $in_gar1_oobi"
echo "in_gar2: $in_gar2_oobi"

# Resolve OOBIs
echo "Resolving OOBIs..."
resolve_oobi "ex_gar1" "ex_gar2" "${ex_gar2_oobi}"
resolve_oobi "ex_gar1" "in_gar1" "${in_gar1_oobi}"
resolve_oobi "ex_gar1" "in_gar2" "${in_gar2_oobi}"

resolve_oobi "ex_gar2" "ex_gar1" "${ex_gar1_oobi}"
resolve_oobi "ex_gar2" "in_gar1" "${in_gar1_oobi}"
resolve_oobi "ex_gar2" "in_gar2" "${in_gar2_oobi}"

resolve_oobi "in_gar1" "ex_gar1" "${ex_gar1_oobi}"
resolve_oobi "in_gar1" "ex_gar2" "${ex_gar2_oobi}"
resolve_oobi "in_gar1" "in_gar2" "${in_gar2_oobi}"

resolve_oobi "in_gar2" "ex_gar1" "${ex_gar1_oobi}"
resolve_oobi "in_gar2" "ex_gar2" "${ex_gar2_oobi}"
resolve_oobi "in_gar2" "in_gar1" "${in_gar1_oobi}"
