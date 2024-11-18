#!/bin/bash

hostIP=$(curl -s ifconfig.me)
default_config_dir=$(dirname "$(realpath "$0")")

witnesses=("wan" "wes" "wil" "wit" "wub" "wyz")
tcp_ports=("5632" "5633" "5634" "5635" "5636" "5637")
http_ports=("5642" "5643" "5644" "5645" "5646" "5647")
witnesses_aids=(
    "BBilc4-L3tFUnfM_wJr4S4OJanAv_VmF_dJNN6vkf2Ha"
    "BLskRTInXnMxWaGqcpSyMgo0nYbalW99cGZESrz3zapM"
    "BIKKuvBwpmDVA4Ds-EpL5bt9OqPzWPja2LigFYZN2YfX"
    "BM35JN8XeJSEfpxopjn5jr7tAHCE5749f0OobhMLCorE"
    "BIj15u5V11bkbtAxMA7gcNJZcax-7TgaBMLsQnMHpYHP"
    "BF2rZTW79z4IXocYRQnjjsOuvFUQv-ptCf8Yltd7PfsM"
)
schemas_saids=(
    "EBNaNu-M9P5cgrnfl2Fvymy4E_jvxxyjb70PRtiANlJy"
    "EH6ekLjSr8V32WyFbGe1zXjTzFs9PkTYmupJ9H65O14g"
    "EKA57bKBKxr_kN7iN5i7lMUxpMG-s19dRcmov1iDxz-E"
    "ENPXp1vQzRF6JwIuS-mp2U8Uf1MoADoP_GqQ62VsDZWY"
    "EBfdlu8R27Fbx-ehrqwImnK-8Cm79sqbAQ4MmvEAYqao"
    "EEy9PkikFcANV1l7EHukCeXqrzT1hNZjGlUk7wuMO5jw"
)

# Setup Witnesses
for ((i = 0; i < 6; i++)); do
    new_content="        \"curls\": [\"tcp:\/\/${hostIP}:${tcp_ports[i]}\/\", \"http:\/\/${hostIP}:${http_ports[i]}\/\"]"
    sed -i "4s/.*/${new_content}/" "${default_config_dir}/config/witness-demo/${witnesses[i]}.json"
done

# Setup Sally
for i in "${!witnesses_aids[@]}"; do
  new_content="        \"http:\/\/${hostIP}:${http_ports[i]}\/oobi\/${witnesses_aids[i]}\/controller\","
  if [ "$i" -eq $(( ${#witnesses_aids[@]} - 1 )) ]; then
    new_content="${new_content%,}"  # Remove trailing comma for the last line
  fi
  line_number=$((4 + i))
  sed -i "${line_number}s/.*/${new_content}/" "${default_config_dir}/config/sally-oobis.json"
done

for i in "${!schemas_saids[@]}"; do
  new_content="        \"http:\/\/${hostIP}:7723\/oobi\/${schemas_saids[i]}\","
  if [ "$i" -eq $(( ${#schemas_saids[@]} - 1 )) ]; then
    new_content="${new_content%,}"  # Remove trailing comma for the last line
  fi
  line_number=$((12 + i))
  sed -i "${line_number}s/.*/${new_content}/" "${default_config_dir}/config/sally-oobis.json"
done