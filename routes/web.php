<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\EmployeesController;
use App\Http\Controllers\RolesController;
use App\Http\Controllers\DepartmentsController;
use App\Http\Controllers\TeamsController;
use App\Http\Controllers\ClientsController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::prefix('administrar')->middleware(['auth', 'verified'])->group(function () {
    Route::get('/usuarios', [UsersController::class, 'index'])->name('administrar.usuarios');
    Route::get('/colaboradores', [EmployeesController::class, 'index'])->name('administrar.colaboradores');
    Route::get('/colaboradores/editar/{id}', [EmployeesController::class, 'editar'])->name('colaboradores.editar');
    Route::get('/cargos', [RolesController::class, 'index'])->name('administrar.cargos');
    Route::get('/departamentos', [DepartmentsController::class, 'index'])->name('administrar.departamentos');
    Route::get('/times', [TeamsController::class, 'index'])->name('administrar.times');
    Route::get('/clientes', [ClientsController::class, 'index'])->name('administrar.clientes');
});

Route::delete('/user/{id}', [UsersController::class, 'delete'])->name('user.delete');
Route::put('/user/{id}', [UsersController::class, 'update'])->name('user.update');

Route::post('/roles/register', [RolesController::class, 'store'])->name('roles.create');
Route::put('/roles/{id}', [RolesController::class, 'update'])->name('roles.update');
Route::delete('/roles/{id}', [RolesController::class, 'delete'])->name('roles.delete');

Route::post('/departments/register', [DepartmentsController::class, 'store'])->name('departments.create');
Route::put('/departments/{id}', [DepartmentsController::class, 'update'])->name('departments.update');
Route::delete('/departments/{id}', [DepartmentsController::class, 'delete'])->name('departments.delete');

Route::post('/teams/register', [TeamsController::class, 'store'])->name('teams.create');
Route::put('/teams/{id}', [TeamsController::class, 'update'])->name('teams.update');
Route::delete('/teams/{id}', [TeamsController::class, 'delete'])->name('teams.delete');

Route::post('/employees/register', [EmployeesController::class, 'store'])->name('employees.create');
Route::put('/employees/{id}', [EmployeesController::class, 'update'])->name('employees.update');
Route::delete('/employees/{id}', [EmployeesController::class, 'delete'])->name('employees.delete');

Route::post('/clients/register', [ClientsController::class, 'store'])->name('clients.create');
Route::put('/clients/{id}', [ClientsController::class, 'update'])->name('clients.update');
Route::delete('/clients/{id}', [ClientsController::class, 'delete'])->name('clients.delete');

require __DIR__ . '/auth.php';
