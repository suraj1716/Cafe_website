<?php
namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\MenuItem;
use Inertia\Inertia;
use App\Http\Controllers\Controller;
use App\Models\Gallery;
use App\Models\HeroBanner;

class PageController extends Controller
{
    public function home()
    {
        $categories = Category::select('id', 'name', 'image', 'description')->get();
        return Inertia::render('Home', [
            'categories' => $categories,
         'banners' => HeroBanner::where('is_active', true)->get(),
        ]);
    }

    public function menu()
    {
        $categories = Category::with('menuItems')->get();
        return Inertia::render('Menu', ['categories' => $categories]);
    }

    public function contact()
    {
        return Inertia::render('Contact');
    }



    //   public function gallery()
    // {
    //       $galleries = Gallery::with('media')->get()->map(function ($gallery) {
    //         return [
    //             'id' => $gallery->id,
    //             'title' => $gallery->title,
    //             'images' => $gallery->getMedia('gallery')->map(function ($media) {
    //                 return [
    //                     'id' => $media->id,
    //                     'url' => $media->getUrl(), // This generates the correct URL
    //                 ];
    //             }),
    //         ];
    //     });
    //     return Inertia::render('Gallery', [
    //         'galleryItems' => $galleries->toArray(),
    //     ]);
    // }
}
