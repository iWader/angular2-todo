<?php

namespace App\Repositories\Contracts;

interface RepositoryInterface
{
    public function all($sortBy = [], $columns = ['*']);

    public function paginate($perPage = 10, $columns = ['*']);

    public function create(array $attributes);

    public function update(array $attributes, $key, $keyName = 'id');

    public function delete($key);

    public function find($key, $columns = ['*']);

    public function findBy($attribute, $value, $columns = ['*']);
}