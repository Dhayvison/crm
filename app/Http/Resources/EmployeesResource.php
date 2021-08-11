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
      'user' => Employee::find(1)->user,
      'department' => Employee::find(1)->department,
      'team' => Employee::find(1)->team,
      'role' => Employee::find(1)->role,
      'createdAt' => $this->created_at,
      'updatedAt' => $this->updated_at,
    ];
  }
}
