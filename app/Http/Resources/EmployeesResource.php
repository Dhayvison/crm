<?php

namespace App\Http\Resources;

use App\Models\Employee;
use Illuminate\Http\Resources\Json\JsonResource;

class EmployeesResource extends JsonResource
{
  /**
   * Transform the resource into an array.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return array
   */
  public function toArray($request)
  {
    return [
      'id' => $this->id,
      'fullName' => $this->full_name,
      'birthDate' => $this->birth_date,
      'hiringDate' => $this->hiring_date,
      'phone' => $this->phone,
      'cellphone' => $this->cellphone,
      'user' => $this->user,
      'department' => $this->department,
      'team' => $this->team,
      'role' => $this->role,
      'createdAt' => $this->created_at,
      'updatedAt' => $this->updated_at,
    ];
  }
}
