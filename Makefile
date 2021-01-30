.DEFAULT_GOAL := commit
.PHONY: commit
commit: style lint build test coverage doc

.PHONY: doc
doc:
	yarn typedoc ./lib/index.ts --out ./dist/doc --json ./dist/doc/doc.json --theme minimal --name "WebSE API for Node.js" --includeVersion

.PHONY: coverage
coverage: coverage-cli coverage-html

.PHONY: coverage-html
coverage-html: coverage-cli test
	yarn nyc report --reporter=html --report-dir ./dist/coverage

.PHONY: coverage-cli
coverage-cli: test
	yarn nyc report

.PHONY: test
test: build
	yarn nyc --reporter=json mocha --ui tdd --use_strict --require source-map-support/register --reporter mochawesome --require mochawesome/register --reporter-options reportDir=./dist/report,reportFilename=index dist/test/**/*.test.js

.PHONY: build
build: transpile

.PHONY: transpile
transpile:
	yarn tsc

.PHONY: format
format:
	yarn prettier --write ./lib ./test

.PHONY: style
style:
	yarn prettier --check ./lib ./test

.PHONY: lint
lint:
	yarn eslint ./lib ./test --ext .ts || true
