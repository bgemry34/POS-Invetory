<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\User as Users;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Foundation\Auth\ThrottlesLogins;
use Illuminate\Support\Facades\Lang;


class UsersController extends Controller
{
    //
    public function createUser(Request $request){

        $validator = Validator::make($request->json()->all() , [
            'name' => 'required|string|max:64',
            'email'     => 'required|string|email|unique:users|max:128',
            'password'  => 'required|string|confirmed|min:8',
        ]);

        if($validator->fails()){
                return response()->json($validator->errors(),400);
        }

        //Create Admin
        $user = new Users;
        $user->name = $request->json()->get('name');
        $user->email = $request->json()->get('email');
        $user->password = Hash::make($request->json()->get('password'));
        $user->save();

        $token = auth()->login($user);

        return response()->json(compact('user', 'token'),201);

    }

    //
    public function login()
    {
        $credentials = request(['email', 'password']);

        if (! $token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Invalid username or password.'], 401);
        }

        return $this->respondWithToken($token);
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return auth()->user()==null ? 
        response()->json(["error"=>"Unauthorized"],401)
        :response()->json(auth()->user());
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }
}
