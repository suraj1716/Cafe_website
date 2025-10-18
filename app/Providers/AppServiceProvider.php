<?php

namespace App\Providers;

use App\Models\BusinessSetting;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        if(request()->header('x-forwarded-proto') === 'https'){
            URL::forceScheme('https');
        }

        Vite::prefetch(concurrency: 3);
         Inertia::share([
        'business' => fn() => BusinessSetting::first(),
    ]);
    }
}
