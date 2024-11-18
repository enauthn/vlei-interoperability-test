docker compose down
docker compose up deps -d --build

docker exec -it <container_name_or_id> /bin/bash