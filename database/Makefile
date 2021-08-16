# THIS := $(realpath $(lastword $(MAKEFILE_LIST)))
# HERE := $(shell dirname $(THIS))


.PHONY: all

all: setup install migrate serve

setup:
	@php -r "file_exists('.env') || copy('.env.example', '.env');"
	@rm -fr database/database.sqlite
	@touch database/database.sqlite

install:
	@$(MAKE) composer
	@$(MAKE) npm
	@$(MAKE) key

composer:
	@composer install

npm:
	@npm ci
	@npm run dev

key:
	@php artisan key:generate

migrate:
	@php artisan migrate:refresh
	@php artisan db:seed

serve:
	@php artisan serve
	@$(MAKE) note

test:
	@php ./vendor/bin/phpunit --testdox

test-coverage:
	@php ./vendor/bin/phpunit --coverage-html storage/logs/coverage --testdox
