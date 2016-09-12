<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Repositories\Contracts\TodoRepositoryInterface;
use App\Transformers\TodoTransformer;
use League\Fractal\Manager;

class TodoController extends Controller
{
    /**
     * @var \App\Repositories\Contracts\TodoRepositoryInterface
     */
    protected $repository;

    public function __construct(TodoRepositoryInterface $repository, Manager $fractal, Request $request)
    {
        parent::__construct($fractal, $request);

        $this->repository = $repository;
    }

    public function index()
    {
        $todos = $this->repository->all();

        return $this->respondWithCollection($todos, new TodoTransformer());
    }

    public function create()
    {
        $todo = $this->repository->create($this->request->input());

        return $this->respondWithItem($todo, new TodoTransformer());
    }

    public function show($id)
    {
        $todo = $this->repository->find($id);

        return $this->respondWithItem($todo, new TodoTransformer());
    }

    public function update($id)
    {
        $this->repository->update($this->request->input(), $id);

        $todo = $this->repository->find($id);

        return $this->respondWithItem($todo, new TodoTransformer());
    }

    public function destroy($id)
    {
        $this->repository->delete($id);

        return $this->respondWithNoContent();
    }
}
