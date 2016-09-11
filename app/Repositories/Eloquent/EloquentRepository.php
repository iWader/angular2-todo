<?php

namespace App\Repositories\Eloquent;

use App\Repositories\Contracts\RepositoryInterface;
use Illuminate\Database\Eloquent\Model;

abstract class EloquentRepository implements RepositoryInterface
{
    /**
     * @var \Illuminate\Database\Eloquent\Model
     */
    protected $model;

    public function __construct(Model $model)
    {
        $this->model = $model;
    }

    protected function query()
    {
        return $this->model->newQuery();
    }

    protected function instance($attribute = 'id', $value = null)
    {
        if ( ! is_null($value))
        {
            return $this->findBy($attribute, $value);
        }

        return new $this->model;
    }

    public function all($sortBy = [], $columns = ['*'])
    {
        $query = $this->query();

        foreach($sortBy as $attribute => $direction)
            $query->orderBy($attribute, $direction);

        return $query->get($columns);
    }

    public function paginate($perPage = 10, $columns = ['*'])
    {
        return $this->query()->paginate($perPage, $columns);
    }

    public function create(array $attributes)
    {
        $instance = $this->instance();

        $instance->forceFill($attributes);

        return $instance->save() ? $instance : null;
    }

    public function update(array $attributes, $key, $keyName = 'id')
    {
        $instance = $this->instance($keyName, $key);

        $instance->forceFill($attributes);

        return $instance->save();
    }

    public function delete($key, $keyName = 'id')
    {
        return $this->instance($keyName, $key)->delete();
    }

    public function find($key, $columns = ['*'])
    {
        return $this->instance($this->model->getKeyName(), $key);
    }

    public function findBy($attribute, $value, $columns = ['*'])
    {
        return $this->query()->where($attribute, $value)->first($columns);
    }
}