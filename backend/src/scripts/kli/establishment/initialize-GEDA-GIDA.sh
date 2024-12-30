#!/bin/bash

# Function to initialize, incept, and add endpoints
initialize_and_incept() {
    local name=$1
    local alias=$2

    kli init --name "$name" --nopasscode --config-dir "${KERI_SCRIPT_DIR}" --config-file demo-witness-oobis
    kli incept --name "$name" --alias "$alias" --file "${KERI_DEMO_SCRIPT_DIR}/data/aid-incept.json" #gar repo
    # kli ends add --name "$name" --alias "$alias" --eid BLskRTInXnMxWaGqcpSyMgo0nYbalW99cGZESrz3zapM --role mailbox
}

# Initialize and incept AIDs
initialize_and_incept "ex_gar1" "ex_gar1"
initialize_and_incept "ex_gar2" "ex_gar2"
initialize_and_incept "in_gar1" "in_gar1"
initialize_and_incept "in_gar2" "in_gar2"

# Retrieve and display AID status
echo "Getting AID status..."
get_aid_status() {
    local name=$1
    local alias=$2
    echo "$(kli status --name "$name" --alias "$alias" | sed -n '1p')"
    echo "$(kli status --name "$name" --alias "$alias" | sed -n '2p')"
}

get_aid_status "ex_gar1" "ex_gar1"
get_aid_status "ex_gar2" "ex_gar2"
get_aid_status "in_gar1" "in_gar1"
get_aid_status "in_gar2" "in_gar2"
