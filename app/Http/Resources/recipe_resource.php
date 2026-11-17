<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class recipe_resource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return (
            [
                "recipe_name" => $this -> name,
                'nationality' => $this -> nationality,
                'recipe_type' => $this -> recipe_type,
                'image_url' => $this -> image_url,
                'ingredients' => $this -> ingredients,
                'instructions' => $this -> instructions,
                'recipe_id' => $this -> id 
            ]
        );
    }
}
