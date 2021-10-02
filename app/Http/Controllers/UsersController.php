<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Resources\UsersCollection;
use App\Http\Resources\UsersResource;
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
    $request->validate([
      'name' => 'required|string|max:255',
      'email' => 'required|email'
    ]);

    $user = User::find($id);
    $user->name = $request->name;
    $user->email = $request->email;
    $user->save();
    return redirect(route('administrar.usuarios'));
  }

  public function delete($id)
  {
    $user = User::find($id);
    $user->delete();
    return redirect(route('administrar.usuarios'));
  }

  public function view($id = null)
  {
    if ($id) {
      return new UsersResource(User::find($id));
    } else {
      return new UsersCollection(User::orderBy('email')->get());
    }
  }
}
