<?php

use App\Http\Controllers\DepartmentsController;
use App\Http\Controllers\RolesController;
use App\Http\Controllers\TeamsController;
use App\Http\Controllers\UsersController;
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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/', function () {
    return ['status' => 'working'];
})->name('api');

Route::get('/users/{id?}', [UsersController::class, 'view'])->name('api.users');
Route::get('/roles/{id?}', [RolesController::class, 'view'])->name('api.roles');
Route::get('/departments/{id?}', [DepartmentsController::class, 'view'])->name('api.departments');
Route::get('/teams/{id?}', [TeamsController::class, 'view'])->name('api.teams');
