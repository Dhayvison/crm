<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;

class HttpsProtocol
{

  public function handle(Request $request, Closure $next)
  {
    if (env('FORCE_HTTPS', false) && !$request->secure() && App::environment() === 'production') {
      return redirect()->secure($request->getRequestUri(), 301);
    }

    return $next($request);
  }
}
