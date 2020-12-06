.PHONY:
help:
	@echo Tasks:
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

# DEVELOPMENT SETUP
.PHONY:
dev: ## Start Web'n'surF NestJS development docker containers
	@docker-compose up | sed -En "s/(webnsurf-nestjs-dev_(DB|BE)\\s*(.*)|(Step| --->|Building|Removing|Creating|Successfully))/\2 \3/p"

.PHONY:
build-dev: ## Rebuild Web'n'surF NestJS with Webpack and build development docker containers
	@docker-compose up -d --build && make dev

.PHONY:
clean-dev: ## Stop and remove Web'n'surF NestJS docker containers and images
	@docker-compose down && \
	docker image rm webnsurf-nestjs-dev-api webnsurf-nestjs-postgresql || true

.PHONY:
clean-postgres: ## Stop and remove Web'n'surF NestJS docker containers and images
	@docker-compose down && \
	docker image rm webnsurf-nestjs-postgresql || true


# LOCAL SETUP
.PHONY:
build-local: clean-api ## Build Web'n'surF NestJS docker image and restart containers
	@docker build . --file "docker/Dockerfile" --tag webnsurf-nestjs-api:latest && \
	make local

.PHONY:
run-local:
	@docker run --detach --name webnsurf-nestjs-api \
		--env-file .env \
		--env RUNTIME_ENV=local \
		--network webnsurf_network \
		--label "traefik.enable=true" \
    --label "traefik.http.routers.webnsurf-nestjs-api-redirect.rule=Host(\`nestjs.local.webnsurf.com\`) && PathPrefix(\`/api\`)" \
    --label "traefik.http.routers.webnsurf-nestjs-api-redirect.middlewares=https-redirect@file" \
    --label "traefik.http.routers.webnsurf-nestjs-api-redirect.entrypoints=web" \
		--label "traefik.http.routers.webnsurf-nestjs-api.rule=Host(\`nestjs.local.webnsurf.com\`) && PathPrefix(\`/api\`)" \
		--label "traefik.http.routers.webnsurf-nestjs-api.entrypoints=websecure" \
    --label "traefik.http.routers.webnsurf-nestjs-api.middlewares=api-stripprefix" \
    --label "traefik.http.middlewares.api-stripprefix.stripprefix.prefixes=/api" \
		--label "traefik.http.routers.webnsurf-nestjs-api.tls=true" \
		webnsurf-nestjs-api:latest

.PHONY:
local: ## Start Web'n'surF NestJS docker containers
	@docker-compose up -d webnsurf-nestjs-postgresql && \
	(docker start webnsurf-nestjs-api || make run-local || (make build-local && make local)) && echo "Container started!"

.PHONY:
clean-local: ## Remove Web'n'surF NestJS docker containers and images
	@docker kill webnsurf-nestjs-api webnsurf-nestjs-dev_DB || true && \
	docker rm webnsurf-nestjs-api webnsurf-nestjs-dev_DB || true && \
	docker image rm webnsurf-nestjs-api webnsurf-nestjs-postgresql || true \

.PHONY:
clean-api:
	@docker kill webnsurf-nestjs-api || true && \
	docker rm webnsurf-nestjs-api || true && \
	docker image rm webnsurf-nestjs-api || true
