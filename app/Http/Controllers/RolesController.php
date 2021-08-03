<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Roles;
use Inertia\Inertia;
use Illuminate\Http\Request;

class RolesController extends Controller
{
  /**
   * Show the profile for a given user.
   *
   * @param  int  $id
   * @return \Illuminate\View\View
   */
  public function index()
  {
    return Inertia::render('Administrar/Cargos/Index', [
      'roles' => Roles::all()->map(function ($role) {
        return [
          'id' => $role->id,
          'name' => $role->name,
          'wages' => $role->wages,
          'createdAt' =>  $role->created_at,
          'updatedAt' => $role->updated_at
        ];
      })
    ]);
  }

  /**
   * Display the registration view.
   *
   * @return \Illuminate\View\View
   */
  public function create()
  {
    return Inertia::render('Administrar/Cargos/Create');
  }

  /**
   * Handle an incoming registration request.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\RedirectResponse
   *
   * @throws \Illuminate\Validation\ValidationException
   */
  public function store(Request $request)
  {
    $request->validate([
      'name' => 'required|string|max:255',
      'wages' => 'required|numeric',
    ]);

    Roles::create([
      'name' => $request->name,
      'wages' => $request->wages,
    ]);

    return redirect(route('administrar.cargos'));
  }

  // public function update(Request $request, $id)
  // {
  //   $newData = $request->only('name', 'email');
  //   $user = Roles::find($id);
  //   $user->name = $newData['name'];
  //   $user->email = $newData['email'];
  //   $user->save();
  //   return redirect(route('administrar.usuarios'));
  // }

  // public function delete($id)
  // {
  //   $user = Roles::find($id);
  //   $user->delete();
  //   return redirect(route('administrar.usuarios'));
  // }
}
