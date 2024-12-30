#!/bin/bash

# Variables to hold prefixes for ex_gar1, ex_gar2, in_gar1, and in_gar2
ex_gar1_prefix=$1
ex_gar2_prefix=$2

in_gar1_prefix=$3
in_gar2_prefix=$4

# Function to contacts replace

contacts_replace() {
    local name=$1
    local prefix=$2
    local alias=$3
    echo "kli contacts replace --name $name --prefix $prefix --alias $alias"
    kli contacts replace --name "$name" --prefix "$prefix" --alias "$alias"
}

contacts_replace "qar1" "${ex_gar1_prefix}" "ex_gar1"
contacts_replace "qar2" "${ex_gar1_prefix}" "ex_gar1"
contacts_replace "qar3" "${ex_gar1_prefix}" "ex_gar1"

contacts_replace "qar1" "${ex_gar2_prefix}" "ex_gar2"
contacts_replace "qar2" "${ex_gar2_prefix}" "ex_gar2"
contacts_replace "qar3" "${ex_gar2_prefix}" "ex_gar2"

contacts_replace "qar1" "${in_gar1_prefix}" "in_gar1"
contacts_replace "qar2" "${in_gar1_prefix}" "in_gar1"
contacts_replace "qar3" "${in_gar1_prefix}" "in_gar1"

contacts_replace "qar1" "${in_gar2_prefix}" "in_gar2"
contacts_replace "qar2" "${in_gar2_prefix}" "in_gar2"
contacts_replace "qar3" "${in_gar2_prefix}" "in_gar2"


