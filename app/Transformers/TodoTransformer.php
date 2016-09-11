<?php

namespace iWader\Angular2Demo\Transformers;

use App\Models\Todo;

class TodoTransformer extends Transformer
{
    public function transform(Todo $todo)
    {
        return [
            'id'           => $todo->getKey(),
            'task'         => $todo->task,
            'completed_at' => ! is_null($todo->completed_at) ? $this->mutateDateTime($todo->completed_at) : null,
        ];
    }
}