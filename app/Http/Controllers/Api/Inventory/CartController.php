<?php

namespace App\Http\Controllers\Api\Inventory;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Cart;
use App\Item;
use App\Rules\CheckItem;

class CartController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        $user = auth()->user();
        if($user!==null){
            $cart = new Cart;
            $this->validate($request, [
                'qty' => 'required|integer|min:1',
                'item_id' => ['required', 'integer', new CheckItem],
            ]);
            
            $cart->user_id = $user->id;
            $cart->item_id = $request->input('item_id');
            $cart->qty = $request->input('qty');

            if($cart->save())
            return $cart;
        }else{
           return response()->json(['error' => 'Unauthorized'], 401);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        
    }
}
