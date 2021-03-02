up-dynamodb-daemon:
	docker-compose -f dynamodb-local.yaml up -d 

up-dynamodb:
	docker-compose -f dynamodb-local.yaml up 

start-emulator:
	sam local start-api  --shutdown --docker-network local-dynamodb

invoke:
	sam local invoke --docker-network local-dynamodb  "${lambda}" -e ./events/event-${event}.json | jq  

list-functions:
	 yq '.Resources | keys[]' template.yml |  grep -E  "Function"
	
generate-table-spec:
	yq  ".Resources.${table}.Properties" template.yml > local-db-create-${table}.json 

create-table:
	aws dynamodb create-table --cli-input-json file://local-db-create-${table}.json --endpoint-url http://localhost:8000 --region us-west-1

delete-table:
	aws dynamodb delete-table --table-name ${table} --endpoint-url http://localhost:8000  --region us-west-1

list-tables:
	aws dynamodb list-tables --endpoint-url http://localhost:8000 --region us-west-1

down:
	docker-compose -f dynamodb-local.yaml  down

logs:
	docker-compose logs -f dynamodb-local.yaml

