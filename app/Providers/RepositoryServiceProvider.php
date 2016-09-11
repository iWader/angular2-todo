<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use iWader\Angular2Demo\Repositories\Eloquent\EloquentTodoRepository;
use iWader\Repositories\Contracts\TodoRepositoryInterface;

class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(
            TodoRepositoryInterface::class,
            EloquentTodoRepository::class
        );
    }
}
