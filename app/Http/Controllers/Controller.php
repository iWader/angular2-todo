<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use League\Fractal\Manager;
use League\Fractal\Resource\Collection;
use League\Fractal\Resource\Item;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    /**
     * @var \League\Fractal\Manager
     */
    protected $fractal;

    /**
     * @var \Illuminate\Http\Request
     */
    protected $request;

    /**
     * HTTP status code to respond with
     *
     * @var int
     */
    protected $statusCode;

    public function __construct(Manager $fractal, Request $request)
    {
        $this->fractal = $fractal;
        $this->request = $request;
    }

    protected function getStatusCode()
    {
        return $this->statusCode;
    }

    protected function setStatusCode($code)
    {
        $this->statusCode = $code;

        return $this;
    }

    protected function respondWithItem($item, $callback)
    {
        $resource = new Item($item, $callback);

        $scope = $this->fractal->createData($resource);

        return $this->respondWithArray($scope->toArray());
    }

    protected function respondWithCollection($collection, $callback)
    {
        $resource = new Collection($collection, $callback);

        $scope = $this->fractal->createData($resource);

        return $this->respondWithArray($scope->toArray());
    }

    protected function respondWithArray(array $array, array $headers = [])
    {
        return response()->json($array, $this->getStatusCode(), $headers);
    }

    protected function respondWithNoContent()
    {
        return response()->make(null, 204);
    }
}
