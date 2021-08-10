<?php

namespace App\Http\Resources;

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
      'userId' => $this->user_id,
      'departmentId' => $this->department_id,
      'teamId' => $this->team_id,
      'roleId' => $this->role_id,
      'createdAt' => $this->created_at,
      'updatedAt' => $this->updated_at,
    ];
  }
}
