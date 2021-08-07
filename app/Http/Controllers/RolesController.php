<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Resources\RolesCollection;
use App\Models\Role;
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
      'roles' => new RolesCollection(Role::orderBy('name')->paginate())
    ]);
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

    Role::create([
      'name' => $request->name,
      'wages' => $request->wages,
    ]);

    return redirect(route('administrar.cargos'));
  }

  public function update(Request $request, $id)
  {
    $newData = $request->only('name', 'wages');
    $role = Role::find($id);
    $role->name = $newData['name'];
    $role->wages = $newData['wages'];
    $role->save();
    return redirect(route('administrar.cargos'));
  }

  public function delete($id)
  {
    $role = Role::find($id);
    $role->delete();
    return redirect(route('administrar.cargos'));
  }
}
