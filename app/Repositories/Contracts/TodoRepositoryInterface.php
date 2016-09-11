<?php

namespace App\Repositories\Contracts;

interface TodoRepositoryInterface extends RepositoryInterface
{
    public function onlyCompleted();

    public function onlyUncompleted();
}