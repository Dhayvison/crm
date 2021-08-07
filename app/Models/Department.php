<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Department extends Model
{
  use SoftDeletes;

  /**
   * The attributes that are mass assignable.
   *
   * @var array
   */
  protected $fillable = [
    'name',
    'description',
  ];


  /**
   * The attributes that should be cast to native types.
   *
   * @var array
   */
  protected $casts = [
    'created_at' => 'datetime',
    'updated_at' => 'datetime',
  ];
}
