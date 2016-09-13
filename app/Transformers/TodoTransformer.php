<?php

namespace App\Transformers;

use App\Models\Todo;
use Carbon\Carbon;

class TodoTransformer extends Transformer
{
    public function transform(Todo $todo)
    {
        return [
            'id'           => $todo->getKey(),
            'title'        => $todo->title,
            'completed'    => (bool) $todo->completed,
        ];
    }
}