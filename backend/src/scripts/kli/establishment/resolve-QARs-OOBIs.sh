#!/bin/bash

# Variables to hold OOBIs and AIDs for qar1, qar2, and qar3
qar1_oobi=$1
qar2_oobi=$2
qar3_oobi=$3

qar1_aid=$4
qar2_aid=$5
qar3_aid=$6

# Function to resolve OOBI
resolve_oobi() {
    local name=$1
    local alias=$2
    local oobi=$3
    echo "kli oobi resolve --name $name --oobi-alias $alias --oobi $oobi"
    kli oobi resolve --name "$name" --oobi-alias "$alias" --oobi "$oobi"
}

contacts_replace() {
    local name=$1
    local prefix=$2
    local alias=$3
    echo "kli contacts replace --name $name --prefix $prefix --alias $alias"
    kli contacts replace --name "$name" --prefix "$prefix" --alias "$alias"
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


# Replace contacts
echo "Replacing contacts..."
contacts_replace "ex_gar1" "${qar1_aid}" "qar1"
contacts_replace "ex_gar1" "${qar2_aid}" "qar2"
contacts_replace "ex_gar1" "${qar3_aid}" "qar3"

contacts_replace "ex_gar2" "${qar1_aid}" "qar1"
contacts_replace "ex_gar2" "${qar2_aid}" "qar2"
contacts_replace "ex_gar2" "${qar3_aid}" "qar3"

contacts_replace "in_gar1" "${qar1_aid}" "qar1"
contacts_replace "in_gar1" "${qar2_aid}" "qar2"
contacts_replace "in_gar1" "${qar3_aid}" "qar3"

contacts_replace "in_gar2" "${qar1_aid}" "qar1"
contacts_replace "in_gar2" "${qar2_aid}" "qar2"
contacts_replace "in_gar2" "${qar3_aid}" "qar3"
