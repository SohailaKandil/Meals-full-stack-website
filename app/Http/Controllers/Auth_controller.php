<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Http\Requests\Log_in_request;
use App\Http\Requests\Signup_request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;


class Auth_controller extends Controller
{
    public function login (Log_in_request $request){
        $credentials = $request->validated();
        if (!Auth::attempt($credentials)){
            return response([
                "message"=> "Either the email or the password you entered was incorrect"
            ] , 401);
        }

        $user = Auth::user();

        $user_name = $user -> name;
        $token = $user->createToken('main')->plainTextToken;
        $isAdmin = $user->is_admin;

        $response = [
            'user_name'=> $user_name,
            'token' => $token,
            'is_admin' => $isAdmin
        ];
        
        return ($response);
    }

    public function signup(Signup_request $request){
        $data = $request->validated();
        $user = User::create([
            'name' => $data["name"],
            'email' => $data["email"],
            'password' => $data["password"]
        ]

        );

        $user_name = $user -> name;
        $token = $user->createToken('main')->plainTextToken;
        $isAdmin = $user->is_admin;

        $response = [
            'user_name'=> $user_name,
            'token' => $token,
            'is_admin' => $isAdmin
        ];
        
        return ($response);
    }

    public function logout(Request $request){
        $accessToken = $request->user()->currentAccessToken();
        $accessToken->delete();
    }
}
