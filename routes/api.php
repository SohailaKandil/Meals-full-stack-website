<?php

use App\Http\Controllers\Auth_controller;
use App\Http\Controllers\crud_controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post("/signup" , [Auth_controller::class, "signup"]);
Route::post("/login" , [Auth_controller::class, "login"]);

Route::middleware('auth:sanctum')->post("/logout" , [Auth_controller::class, "logout"]);
Route::middleware('auth:sanctum')->post('/add_recipe',[crud_controller::class, 'add_recipe']);

Route::get("/get_non_pending_recipes" , [crud_controller::class, 'get_non_pending_recipes']);