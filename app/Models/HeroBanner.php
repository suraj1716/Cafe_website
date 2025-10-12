<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HeroBanner extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'subtitle',
        'button_text',
        'button_link',
        'image_path',
        'background_image_path',
        'is_active',
    ];

    public function getImagePathAttribute($value)
    {
        return $value ? asset("storage/{$value}") : null;
    }

    public function getBackgroundImagePathAttribute($value)
    {
        return $value ? asset("storage/{$value}") : null;
    }
}
