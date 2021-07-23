<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Inertia\Inertia;

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
      'users' => User::all()->map(function ($user) {
        return [
          'id' => $user->id,
          'name' => $user->name,
          'email' => $user->email,
          'createdAt' => $user->created_at,
          'updatedAt' => $user->updated_at
          // 'edit_url' => URL::route('users.edit', $user),
        ];
      })
    ]);
  }

  public function delete($id)
  {
    $user = User::find($id);
    $user->delete();
    return redirect(route('administrar.usuarios'));
  }
}
