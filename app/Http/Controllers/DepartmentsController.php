<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Resources\DepartmentsCollection;
use App\Http\Resources\DepartmentsResource;
use App\Models\Department;
use Inertia\Inertia;
use Illuminate\Http\Request;

class DepartmentsController extends Controller
{
  /**
   * Show the profile for a given user.
   *
   * @param  int  $id
   * @return \Illuminate\View\View
   */
  public function index()
  {
    return Inertia::render('Administrar/Departamento/Index', [
      'departments' => new DepartmentsCollection(Department::orderBy('name')->paginate())
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
      'description' => 'required|string|max:255',
    ]);

    Department::create([
      'name' => $request->name,
      'description' => $request->description,
    ]);

    return redirect(route('administrar.departamentos'));
  }

  public function update(Request $request, $id)
  {
    $request->validate([
      'name' => 'required|string|max:255',
      'description' => 'required|string|max:255',
    ]);

    $newData = $request->only('name', 'description');
    $department = Department::find($id);
    $department->name = $newData['name'];
    $department->description = $newData['description'];
    $department->save();
    return redirect(route('administrar.departamentos'));
  }

  public function delete($id)
  {
    $department = Department::find($id);
    $department->delete();
    return redirect(route('administrar.departamentos'));
  }

  public function view($id = null)
  {
    if ($id) {
      return new DepartmentsResource(Department::find($id));
    } else {
      return new DepartmentsCollection(Department::orderBy('name')->get());
    }
  }
}
