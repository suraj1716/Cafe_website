<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MenuItem extends Model
{
    protected $fillable = ['category_id', 'name', 'description', 'size', 'price', 'image'];
protected $casts = [
    'price' => 'float',
];
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }
}
