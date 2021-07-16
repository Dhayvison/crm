<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEmployeesTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('employees', function (Blueprint $table) {
      $table->id();
      $table->string('full_name');
      $table->timestamp('birth_date');
      $table->timestamp('hiring_date');
      $table->string('phone');
      $table->string('cellphone');
      $table->foreignId('user_id')->constrained('users');
      $table->foreignId('department_id')->constrained('departments');
      $table->foreignId('team_id')->constrained('teams');
      $table->foreignId('roles_id')->constrained('roles');
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::dropIfExists('employees');
  }
}
