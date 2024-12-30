#!/bin/bash
 
name=$1
alias=$2
recipient=$3
words=$4

kli challenge respond --name "${name}" --alias "${alias}" --recipient "${recipient}" --words "${words}"
