<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class DelayedResponse
{
  /**
   * Handle an incoming request.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  \Closure  $next
   * @return mixed
   */
  public function handle(Request $request, Closure $next)
  {
    if (env('DELAYED_RESPONSE', false)) {
      usleep(rand(1000, 2000000));
    }
    return $next($request);
  }
}
