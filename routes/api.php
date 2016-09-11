<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['prefix' => 'todo'], function()
{
    Route::get('/', 'TodoController@index');
    Route::post('/', 'TodoController@create');
    Route::get('/{todo}', 'TodoController@show');
    Route::put('/{todo}', 'TodoController@update');
    Route::delete('/{todo}', 'TodoController@destroy');
});
