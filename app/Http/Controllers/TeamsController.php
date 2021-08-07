<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Resources\TeamsCollection;
use App\Models\Team;
use Inertia\Inertia;
use Illuminate\Http\Request;

class TeamsController extends Controller
{
  /**
   * Show the profile for a given user.
   *
   * @param  int  $id
   * @return \Illuminate\View\View
   */
  public function index()
  {
    return Inertia::render('Administrar/Time/Index', [
      'teams' => new TeamsCollection(Team::orderBy('name')->paginate())
    ]);
  }

  /**
   * Handle an incoming registration request.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\RedirectResponse
   *
   * @throws \Illuminate\Validation\ValidationException
   */
  public function store(Request $request)
  {
    $request->validate([
      'name' => 'required|string|max:255',
      'description' => 'required|string|max:255',
    ]);

    Team::create([
      'name' => $request->name,
      'description' => $request->description,
    ]);

    return redirect(route('administrar.times'));
  }

  public function update(Request $request, $id)
  {
    $request->validate([
      'name' => 'required|string|max:255',
      'description' => 'required|string|max:255',
    ]);

    $team = Team::find($id);
    $team->name = $request->name;
    $team->description = $request->description;
    $team->save();
    return redirect(route('administrar.times'));
  }

  public function delete($id)
  {
    $team = Team::find($id);
    $team->delete();
    return redirect(route('administrar.times'));
  }
}
