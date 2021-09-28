<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ClientsResource extends JsonResource
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
      'name' => $this->name,
      'birthDate' => $this->birth_date,
      'email' => $this->email,
      'phone' => $this->phone,
      'cellphone' => $this->cellphone,
      'address' => $this->address,
      'cpf' => $this->cpf,
      'cnpj' => $this->cnpj,
    ];
  }
}
