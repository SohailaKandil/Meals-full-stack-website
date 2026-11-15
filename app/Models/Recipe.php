<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Recipe extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'nationality',
        'recipe_type',
        'image_url',
        'ingredients',
        'instructions',
        'pending',
    ];

    protected $casts = [
        'ingredients' => 'array',
        'pending' => 'boolean',
    ];
}
