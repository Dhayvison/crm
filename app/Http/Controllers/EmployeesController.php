<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Resources\EmployeesCollection;
use App\Http\Resources\EmployeesResource;
use App\Models\Department;
use App\Models\Employee;
use App\Models\Role;
use App\Models\Team;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;

class EmployeesController extends Controller
{
  /**
   * Show the profile for a given user.
   *
   * @param  int  $id
   * @return \Illuminate\View\View
   */
  public function index()
  {
    return Inertia::render('Administrar/Colaboradores/Index', [
      'employees' => new EmployeesCollection(Employee::orderBy('full_name')->paginate()),
      'formData' => [
        'users' => User::orderBy('email')->get(),
        'roles' => Role::orderBy('name')->get(),
        'departments' => Department::orderBy('name')->get(),
        'teams' => Team::orderBy('name')->get(),
      ]
    ]);
  }

  public function editar(Request $request, $id)
  {
    return Inertia::render('Administrar/Colaboradores/Editar', [
      'employee' => new EmployeesResource(Employee::find($id)),
      'formData' => [
        'users' => User::orderBy('email')->get(),
        'roles' => Role::orderBy('name')->get(),
        'departments' => Department::orderBy('name')->get(),
        'teams' => Team::orderBy('name')->get(),
      ]
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
      'fullName' => 'required|string|max:255',
      'birthDate' => 'required|date',
      'hiringDate' => 'required|date',
      'phone' => 'required|regex:/^[0-9]{11}$/',
      'cellphone' => 'required|regex:/^[0-9]{11}$/',
      'userId' => 'required|numeric',
      'departmentId' => 'required|numeric',
      'teamId' => 'required|numeric',
      'roleId' => 'required|numeric',
    ]);

    Employee::create([
      'full_name' => $request->fullName,
      'birth_date' => $request->birthDate,
      'hiring_date' => $request->hiringDate,
      'phone' => $request->phone,
      'cellphone' => $request->cellphone,
      'user_id' => $request->userId,
      'department_id' => $request->departmentId,
      'team_id' => $request->teamId,
      'role_id' => $request->roleId,
    ]);

    return redirect(route('administrar.colaboradores'));
  }

  public function update(Request $request, $id)
  {
    $request->validate([
      'fullName' => 'required|string|max:255',
      'birthDate' => 'required|date',
      'hiringDate' => 'required|date',
      'phone' => 'required|regex:/[0-9]{11}/',
      'cellphone' => 'required|regex:/[0-9]{11}/',
      'userId' => 'required|numeric',
      'departmentId' => 'required|numeric',
      'teamId' => 'required|numeric',
      'roleId' => 'required|numeric',
    ]);

    $employee = Employee::find($id);
    $employee->full_name = $request->fullName;
    $employee->birth_date = $request->birthDate;
    $employee->hiring_date = $request->hiringDate;
    $employee->phone = $request->phone;
    $employee->cellphone = $request->cellphone;
    $employee->user_id = $request->userId;
    $employee->department_id = $request->departmentId;
    $employee->team_id = $request->teamId;
    $employee->role_id = $request->roleId;

    $employee->save();
    return redirect(route('administrar.colaboradores'));
  }

  public function delete($id)
  {
    $employee = Employee::find($id);
    $employee->delete();
    return redirect(route('administrar.colaboradores'));
  }
}
