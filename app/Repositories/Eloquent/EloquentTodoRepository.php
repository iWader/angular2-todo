<?php

namespace App\Repositories\Eloquent;

use App\Models\Todo;
use App\Repositories\Contracts\TodoRepositoryInterface;

class EloquentTodoRepository extends EloquentRepository implements TodoRepositoryInterface
{
    public function __construct(Todo $model)
    {
        parent::__construct($model);
    }

    public function onlyCompleted()
    {
        return $this->query()->whereNotNull('completed_at')->get();
    }

    public function onlyUncompleted()
    {
        return $this->query()->whereNull('completed_at')->get();
    }
}