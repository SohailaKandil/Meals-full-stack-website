<?php

namespace App\Http\Controllers;
use App\Http\Requests\add_recipe_request;
use App\Models\Recipe;

class crud_controller extends Controller
{
    public function add_recipe(add_recipe_request $request)
    {
        $data = $request->validated();
        $user = $request->user();
        $pending = !$user->is_admin;

        $recipe = new Recipe([
            'name' => $data['name'],
            'nationality' => $data['nationality'],
            'recipe_type' => $data['recipe_type'],
            'image_url' => $data['image_url'],
            'ingredients' => $data['ingredients'],
            'instructions' => $data['instructions'],
            'pending' => $pending,
        ]);
        $recipe->user_id = $user->id;
        $recipe->save();

        return response()->json([
            'message' => $pending? 'Recipe submitted for review' : "Recipe submitted Successfully",
        ], 201);
    }
}
