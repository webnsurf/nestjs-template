include .env

.PHONY:
help:
	@echo Tasks:
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)


# DEVELOPMENT SETUP
.PHONY:
dev: ## Run API development docker containers
	@( \
		docker image ls | grep ${IMAGE}-dev && \
		docker-compose up | sed -En "s/(${STACK}-dev_\\s*(BE|DB)\\s*(.*)|(Step| --->|Building|Removing|Creating|Successfully))/\\2 \\3\\4/p" \
	) || (make build-dev && make dev)

.PHONY:
build-dev: ## Run API development docker containers
	@docker-compose up --build -d

.PHONY:
clean-dev: ## Stop and remove API development docker containers and images
	@docker-compose down && \
	docker image rm ${IMAGE}-dev ${STACK}-postgresql || true


# LOCAL SETUP
.PHONY:
run-local:
	@pipelines/scripts/start.sh

.PHONY:
local: ## Start API docker containers
	@docker-compose up -d ${STACK}-postgresql && \
	( \
		(docker start ${NAME} || (echo "No container..." && exit 1)) || \
		((docker image ls ${IMAGE} | grep latest && make run-local) || (echo "No image..." && exit 1)) || \
		make build-local \
	) && echo "Container started!"

.PHONY:
build-local: clean-api ## Build API docker image and restart containers
	@docker build . --file "pipelines/Dockerfile" --tag ${IMAGE}:latest && \
	make run-local

.PHONY:
clean-local: ## Remove API docker containers and images
	@docker kill ${NAME} ${STACK}-dev_DB || true && \
	docker rm ${NAME} ${STACK}-dev_DB || true && \
	docker image rm ${IMAGE} ${STACK}-postgresql || true \

.PHONY:
clean-api:
	@docker kill ${NAME} || true && \
	docker rm ${NAME} || true

.PHONY:
lint:
	@npm run lint
