<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateClientsTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('clients', function (Blueprint $table) {
      $table->id();
      $table->string('name');
      $table->timestamp('birth_date');
      $table->string('email');
      $table->string('phone');
      $table->string('cellphone');
      $table->string('address');
      $table->string('cpf')->nullable();
      $table->string('cnpj')->nullable();
      $table->softDeletes();
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
    Schema::dropIfExists('clients');
  }
}
