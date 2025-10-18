<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BusinessSetting extends Model
{
      protected $fillable = [
        'business_name',
        'address',
        'phone',
        'email',
        'working_hours',
        'facebook',
        'instagram',
        'twitter',
    ];
}
