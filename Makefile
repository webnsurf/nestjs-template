include .env

.PHONY:
help:
	@echo Tasks:
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)


# DEVELOPMENT SETUP
.PHONY:
dev: ## Run Web'n'surF NestJS API development docker containers
	@( \
		docker image ls | grep webnsurf-nestjs-dev-api && \
		docker-compose up | sed -En "s/(webnsurf-nestjs-dev_\\s*(BE|DB)\\s*(.*)|(Step| --->|Building|Removing|Creating|Successfully))/\\2 \\3\\4/p" \
	) || (make build-dev && make dev)

.PHONY:
build-dev: ## Run Web'n'surF NestJS API development docker containers
	@docker-compose up --build -d

.PHONY:
clean-dev: ## Stop and remove Web'n'surF NestJS API development docker containers and images
	@docker-compose down && \
	docker image rm webnsurf-nestjs-dev-api webnsurf-nestjs-postgresql || true


# LOCAL SETUP
.PHONY:
run-local:
	@export RUNTIME_ENV=local && pipelines/scripts/start.sh \
		--name webnsurf-nestjs-api \
		--image webnsurf-nestjs-api \
		--tag latest \
		--url nestjs.local.webnsurf.com \
		--port 80

.PHONY:
local: ## Start Web'n'surF NestJS API docker containers
	@docker-compose up -d webnsurf-nestjs-postgresql && \
	( \
		(docker start webnsurf-nestjs-api || (echo "No container..." && exit 1)) || \
		((docker image ls webnsurf-nestjs-api | grep latest && make run-local) || (echo "No image..." && exit 1)) || \
		make build-local \
	) && echo "Container started!"

.PHONY:
build-local: clean-api ## Build Web'n'surF NestJS API docker image and restart containers
	@docker build . --file "pipelines/Dockerfile" --tag webnsurf-nestjs-api:latest && \
	make run-local

.PHONY:
clean-local: ## Remove Web'n'surF NestJS API docker containers and images
	@docker kill webnsurf-nestjs-api webnsurf-nestjs-dev_DB || true && \
	docker rm webnsurf-nestjs-api webnsurf-nestjs-dev_DB || true && \
	docker image rm webnsurf-nestjs-api webnsurf-nestjs-postgresql || true \

.PHONY:
clean-api:
	@docker kill webnsurf-nestjs-api || true && \
	docker rm webnsurf-nestjs-api || true

.PHONY:
lint:
	@npm run lint
