<?php

namespace App\Http\Controllers;
use App\Http\Requests\add_recipe_request;
use App\Http\Resources\user_resource;
use App\Models\Recipe;
use Illuminate\Http\Request;

class crud_controller extends Controller
{
    public function add_recipe(add_recipe_request $request)
    {
        $data = $request->validated();
        $user = $request->user();
        $pending = !$user->is_admin;

        Recipe::create([
            'name' => $data['name'],
            'nationality' => $data['nationality'],
            'recipe_type' => $data['recipe_type'],
            'image_url' => $data['image_url'],
            'ingredients' => $data['ingredients'],
            'instructions' => $data['instructions'],
            'pending' => $pending,
            'user_id' => $user->id
        ]);

        return response()->json([
            'message' => $pending? 'Recipe submitted for review' : "Recipe submitted Successfully",
        ], 201);
    }

    public function get_non_pending_recipes (Request $request){
        $search = trim((string) $request->query('search', ''));
        $query = Recipe::where("pending" , false);

        if($search != ""){
            $like = '%' . strtolower($search) . '%';

            $query->where( function ($subquery) use ($like ){
                $subquery -> whereRaw("LOWER(name) like ? " , [$like])
                ->orWhereRaw("LOWER(CAST(ingredients AS TEXT))  LIKE ?" , [$like]);
            }
            );
        }

        return user_resource::collection($query->paginate(3));
       
    }
}
