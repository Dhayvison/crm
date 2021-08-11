<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'full_name',
        'birth_date',
        'hiring_date',
        'phone',
        'cellphone',
        'user_id',
        'department_id',
        'team_id',
        'role_id'
    ];


    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'birth_date' => 'datetime',
        'hiring_date' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the user associated with the user.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the user associated with the user.
     */
    public function role()
    {
        return $this->belongsTo(Role::class);
    }

    /**
     * Get the user associated with the user.
     */
    public function department()
    {
        return $this->belongsTo(Department::class);
    }

    /**
     * Get the user associated with the user.
     */
    public function team()
    {
        return $this->belongsTo(Team::class);
    }
}
