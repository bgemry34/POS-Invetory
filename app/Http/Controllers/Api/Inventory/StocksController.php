<?php

namespace App\Http\Controllers\Api\Inventory;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use App\StockLog;
use App\Item;

class StocksController extends Controller
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
        $stock = new StockLog;

        $this->validate($request, [
            'Item' => 'required|numeric',
            'Supplier' => 'required|numeric',
            'Qty' => 'required|numeric|min:1'
        ]);

        DB::beginTransaction();

        try{
            $stock->id =  date('YmdHis');
            $stock->item_id =  $request->input('Item');
            $stock->supplier_id = $request->input('Supplier');
            $stock->Qty = $request->input('Qty');
            $item = Item::updateStock($request->input('Item'), $stock->Qty);
            if($stock->save()){
                DB::commit();
                return response()->json($item[0], 200);
            }
        }catch (Exception $e) {
            DB::rollBack();
            return $e;
        }
    }


    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
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
