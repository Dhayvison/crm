<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\UsersController;

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

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::get('/', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Route::get('/administrar', function () {
//     return Inertia::render('Administrar');
// })->middleware(['auth', 'verified'])->name('administrar');

Route::prefix('administrar')->middleware(['auth', 'verified'])->group(function () {
    Route::get('/usuarios', [UsersController::class, 'index'])->name('administrar.usuarios');
});

Route::delete('/user/{id}', [UsersController::class, 'delete'])->name('user.delete');
Route::put('/user/{id}', [UsersController::class, 'update'])->name('user.update');

require __DIR__ . '/auth.php';
