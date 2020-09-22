<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::group([
    'middleware' => 'api',
    'prefix' => 'admins'
], function ($router) {
    Route::POST('login', 'Api\Auth\AdminsController@login');
    Route::POST('logout', 'Api\Auth\AdminsController@logout');
    Route::POST('refresh', 'Api\Auth\AdminsController@refresh');
    Route::POST('me', 'Api\Auth\AdminsController@me');
    Route::POST('register', 'Api\Auth\AdminsController@createAdmin');
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'users'
], function ($router) {
    Route::POST('login', 'Api\Auth\UsersController@login');
    Route::POST('logout', 'Api\Auth\UsersController@logout');
    Route::POST('refresh', 'Api\Auth\UsersController@refresh');
    Route::POST('me', 'Api\Auth\UsersController@me');
    Route::POST('register', 'Api\Auth\UsersController@createUser');
});

Route::group([
    'middleware' => ['api', 'throttle:5000,1'],
    'prefix' => 'items'
], function ($router) {
    Route::GET('/', 'Api\Inventory\ItemsController@index');
    Route::POST('create', 'Api\Inventory\ItemsController@store');
    Route::PUT('update', 'Api\Inventory\ItemsController@update');
    Route::DELETE('delete', 'Api\Inventory\ItemsController@destroy');
    Route::DELETE('deleteImage', 'Api\Inventory\ItemsController@itemImageDestroy');

    Route::POST('itemtest', 'Api\Inventory\ItemsController@itemtest');
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'category'
], function ($router) {
    Route::GET('/', 'Api\Inventory\CategoriesController@index');
    Route::POST('create', 'Api\Inventory\CategoriesController@store');
    Route::DELETE('delete', 'Api\Inventory\CategoriesController@destroy');
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'supplier'
], function ($router) {
    Route::GET('/', 'Api\Inventory\SuppliersController@index'); 
    Route::POST('create', 'Api\Inventory\SuppliersController@store');   
    Route::PUT('update', 'Api\Inventory\SuppliersController@store');
    Route::DELETE('delete', 'Api\Inventory\SuppliersController@destroy');
});

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['prefix' => 'admin','middleware' => ['assign.guard:admins','jwt.auth']],function ()
{
	Route::get('/demo','AdminController@demo');	
});


Route::group(['prefix' => 'user','middleware' => ['assign.guard:admins','jwt.auth']],function ()
{
	Route::get('/demo','UserController@demo');	
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'stock'
], function ($router) {
    Route::GET('/', 'Api\Inventory\StocksController@index');
    Route::POST('create', 'Api\Inventory\StocksController@store');
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'cart'
], function ($router) {
    Route::DELETE('/delete', 'Api\Inventory\CartController@destroy'); 
    Route::POST('/create', 'Api\Inventory\CartController@store');
});