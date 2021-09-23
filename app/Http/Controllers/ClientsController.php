<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Resources\ClientsCollection;
use App\Models\Client;
use Inertia\Inertia;
use Illuminate\Http\Request;

class ClientsController extends Controller
{
  public function index()
  {
    return Inertia::render('Administrar/Cliente/Index', [
      'clients' => new ClientsCollection(Client::orderBy('name')->paginate())
    ]);
  }

  public function store(Request $request)
  {
    $request->validate([
      'name' => 'required|string|max:255',
      'birthDate' => 'required|date',
      'email' => 'required|email',
      'phone' => 'required|telefone',
      'cellphone' => 'required|celular_com_ddd',
    ]);

    if ($request->isCPF) {
      $request->validate([
        'cpf' => 'required|cpf',
      ]);
    } else {
      $request->validate([
        'cnpj' => 'required|cnpj',
      ]);
    }

    $request->validate([
      'cep' => 'required|formato_cep',
      'city' => 'required|string',
      'neighborhood' => 'required|string',
      'number' => 'required|integer',
      'state' => 'required|string',
      'street' => 'required|string',
    ]);

    $address = "$request->street, nº $request->number, " .
      "$request->neighborhood, $request->city - $request->state. CEP: $request->cep";

    Client::create([
      'name' => $request->name,
      'birth_date' => $request->birthDate,
      'email' => $request->email,
      'phone' => $request->phone,
      'cellphone' => $request->cellphone,
      'address' => $address,
      'cpf' => $request->cpf,
      'cnpj' => $request->cnpj,
    ]);

    return redirect(route('administrar.clientes'));
  }

  public function update(Request $request, $id)
  {
    $request->validate([
      'name' => 'required|string|max:255',
      'birthDate' => 'required|date',
      'email' => 'required|email',
      'phone' => 'required|regex:/^[0-9]{11}$/',
      'cellphone' => 'required|regex:/^[0-9]{11}$/',
      'address' => 'required|string',
      'cpf' => 'required|string',
      'cnpj' => 'required|string',
    ]);

    $client = Client::find($id);
    $client->name = $request->name;
    $client->birth_date = $request->birthDate;
    $client->email = $request->email;
    $client->phone = $request->phone;
    $client->cellphone = $request->cellphone;
    $client->address = $request->address;
    $client->cpf = $request->cpf;
    $client->cnpj = $request->cnpj;

    $client->save();
    return redirect(route('administrar.clientes'));
  }

  public function delete($id)
  {
    $client = Client::find($id);
    $client->delete();
    return redirect(route('administrar.clientes'));
  }
}
