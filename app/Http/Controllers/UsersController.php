<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Resources\UsersCollection;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;

class UsersController extends Controller
{
  /**
   * Show the profile for a given user.
   *
   * @param  int  $id
   * @return \Illuminate\View\View
   */
  public function index()
  {
    return Inertia::render('Administrar/Usuario/Index', [
      'users' => new UsersCollection(User::orderBy('name')->paginate())
    ]);
  }

  public function update(Request $request, $id)
  {
    $newData = $request->only('name', 'email');
    $user = User::find($id);
    $user->name = $newData['name'];
    $user->email = $newData['email'];
    $user->save();
    return redirect(route('administrar.usuarios'));
  }

  public function delete($id)
  {
    $user = User::find($id);
    $user->delete();
    return redirect(route('administrar.usuarios'));
  }
}
