#!/bin/bash

# Function to generate OOBI
generate_oobi() {
    local name=$1
    kli oobi generate --name "$name" --alias "$name" --role witness | sed -n '2p'
}

# Generate OOBIs
echo "Generating OOBIs..."
qar1_oobi=$(generate_oobi "qar1")
qar2_oobi=$(generate_oobi "qar2")
qar3_oobi=$(generate_oobi "qar3")
# Print generated OOBIs
echo "oobi_qar1: $qar1_oobi"
echo "oobi_qar2: $qar2_oobi"
echo "oobi_qar3: $qar3_oobi"

