# Todo Demo App

Todo app built with 

 - Angular 2
 - Laravel
 - TypeScript
 - Webpack
 - Docker

## Installation

 - `git clone git@github.com:iWader/angular2-todo.git`
 - `cd angular2-todo`
 - `docker-compose up -d`
 - `docker-compose exec --user wade workspace bash`
 - `composer install && npm install`
 - `cp .env.example .env` and set `DB_HOST` to the ID of the mysql container
 - `php artisan key:generate && php artisan migrate`
 - `webpack`
 - Navigate to `http://127.0.0.1:8080/angular/`

## License

Licensed under MIT. See [License](LICENSE.md).