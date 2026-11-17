<?php

namespace App\Http\Controllers;
use App\Http\Requests\add_recipe_request;
use App\Http\Requests\search_recipes_request;
use App\Http\Requests\update_recipe_request;
use App\Http\Resources\recipe_resource;
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

    public function get_non_pending_recipes (search_recipes_request $request){
        $validated = $request->validated();
        $search = trim((string) ($validated["search"] ?? ""));

        $query = Recipe::where("pending" , false);

        if($search != ""){
            $like = '%' . strtolower($search) . '%';

            $query->where( function ($subquery) use ($like ){
                $subquery -> whereRaw("LOWER(name) like ? " , [$like])
                ->orWhereRaw("LOWER(CAST(ingredients AS TEXT))  LIKE ?" , [$like]);
            }
            );
        }

        return recipe_resource::collection($query->paginate(3));
       
    }

    public function get_pending_recipes (Request $request){
        abort_unless($request->user()->is_admin , 403 , "Sorry accepting recipes is for Admins only.");
        $query = Recipe::where("pending" , true)->paginate(2);

        return (
            recipe_resource::collection(
                $query
            )
        );    
    }

    public function reject_recipe (update_recipe_request $request){
        abort_unless($request->user()->is_admin , 403 , "Sorry, rejecting or approving recipes is for Admins only.");

        $recipe_id = $request->recipe_id;

        $recipe = Recipe::findOrFail($recipe_id);
        $recipe->delete();  
    }

    public function accept_recipe (update_recipe_request $request){
        abort_unless($request->user()->is_admin , 403 , "Sorry, rejecting or approving recipes is for Admins only.");

        $recipe_id = $request->recipe_id;

        $recipe = Recipe::findOrFail($recipe_id);
        $recipe->pending = false;
        
        $recipe -> save();
    }
}
