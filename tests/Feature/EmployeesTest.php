<?php

namespace Tests\Feature;

use App\Models\Department;
use App\Models\Employee;
use App\Models\Role;
use App\Models\Team;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class EmployeesTest extends TestCase
{
    use RefreshDatabase;
    use WithFaker;

    public function execLogin()
    {
        $user = User::factory()->create();

        $this->post(route('login'), [
            'email' => $user->email,
            'password' => 'password',
        ]);
    }


    public function getFakeEmployeeData()
    {
        $user = User::factory()->create();
        $department = Department::factory()->create();
        $team = Team::factory()->create();
        $role = Role::factory()->create();

        return [
            'fullName' => $this->faker->name(),
            'birthDate' => $this->faker->date(),
            'hiringDate' => $this->faker->date(),
            'phone' => '12345678910',
            'cellphone' => '12345678910',
            'userId' => $user->id,
            'departmentId' => $department->id,
            'teamId' => $team->id,
            'roleId' => $role->id,
        ];
    }

    public function test_employees_screen_can_be_rendered()
    {
        $this->execLogin();

        $response = $this->get(route('administrar.colaboradores'));

        $response->assertStatus(200);
    }

    public function test_employee_create()
    {
        $this->execLogin();

        $response = $this->post(route('employees.create'));

        $response->assertSessionHasErrors([
            'fullName',
            'birthDate',
            'hiringDate',
            'phone',
            'cellphone',
            'userId',
            'departmentId',
            'teamId',
            'roleId'
        ]);

        $response = $this->post(route('employees.create'), $this->getFakeEmployeeData());

        $response->assertSessionHasNoErrors();
    }

    public function test_employee_edit()
    {
        $user = User::factory()->create();
        $department = Department::factory()->create();
        $team = Team::factory()->create();
        $role = Role::factory()->create();

        $employee = Employee::create([
            'full_name' => $this->faker->name(),
            'birth_date' => $this->faker->date(),
            'hiring_date' => $this->faker->date(),
            'phone' => '12345678910',
            'cellphone' => '12345678910',
            'user_id' => $user->id,
            'department_id' => $department->id,
            'team_id' => $team->id,
            'role_id' => $role->id,
        ]);

        $response = $this->put(route('employees.update', ['id' => $employee->id]));

        $response->assertSessionHasErrors([
            'fullName',
            'birthDate',
            'hiringDate',
            'phone',
            'cellphone',
            'userId',
            'departmentId',
            'teamId',
            'roleId'
        ]);

        $response = $this->put(route('employees.update', ['id' => $employee->id]), $this->getFakeEmployeeData());

        $response->assertSessionHasNoErrors();
    }
}
