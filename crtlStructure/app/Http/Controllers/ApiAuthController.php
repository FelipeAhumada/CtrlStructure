<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

use JWTAuth;

use App\User;

class ApiAuthController extends Controller
{
    public function userAuth(Request $request){
        $credentials = $request->only('email','password');
        $token = null;
        $user = null;
        try{
            
            if(! $request->has('password')){
                $user = User::where('email', $request->input('email'))->first();
            
                if (empty($user)){
                    $user = User::create([
                        'name' => $request->input('name'),
                        'email' => $request->input('email'),
                        'avatar' => $request->input('avatar')
                    ]);
                }
        
                if(! $token = JWTAuth::fromUser($user)){
                        return response()->json(['error' => 'invalid_credentials'], 500);
                }

            }else{
                if(! $token = JWTAuth::attempt($credentials)){
                    return response()->json(['error' => 'invalid_credentials'], 500);
                }
                $user = JWTAuth::toUser($token);
            }
        }catch(JWTException $ex){
            return response()->json(['error' => 'Something_went_error'], 500);
        }

        return response()->json(compact('token', 'user'));
    }

}