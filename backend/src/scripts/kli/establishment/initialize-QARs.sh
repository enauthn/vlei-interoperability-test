#!/bin/bash

# Function to initialize, incept, and add endpoints
initialize_and_incept() {
    local name=$1
    local alias=$2

    kli init --name "$name" --nopasscode --config-dir "${KERI_SCRIPT_DIR}" --config-file demo-witness-oobis
    kli incept --name "$name" --alias "$alias" --file "${KERI_DEMO_SCRIPT_DIR}/data/aid-incept.json"
    kli ends add --name "$name" --alias "$alias" --eid BLskRTInXnMxWaGqcpSyMgo0nYbalW99cGZESrz3zapM --role mailbox
}

# Initialize and incept AIDs
initialize_and_incept "qar1" "qar1"
initialize_and_incept "qar2" "qar2"
initialize_and_incept "qar3" "qar3"

# Retrieve and display AID status
echo "Getting AID status..."
get_aid_status() {
    local name=$1
    local alias=$2
    echo "$(kli status --name "$name" --alias "$alias" | sed -n '1p')"
    echo "$(kli status --name "$name" --alias "$alias" | sed -n '2p')"
}

get_aid_status "qar1" "qar1"
get_aid_status "qar2" "qar2"
get_aid_status "qar3" "qar3"

