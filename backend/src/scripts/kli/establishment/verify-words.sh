#!/bin/bash

name=$1
alias=$2
signer=$3
words=$4

kli challenge verify --name "${name}" --alias "${alias}" --signer "${signer}" --words "${words}"