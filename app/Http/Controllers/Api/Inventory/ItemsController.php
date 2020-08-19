<?php

namespace App\Http\Controllers\Api\Inventory;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Item;
use App\SupplierStock;
use App\ItemImage;
use DB;

class ItemsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // return Item::with('category:id,name','images:id,image')->orderBy('id', 'desc')->get();
        return Item::with('category:id,name','images:id,item_id,image')->orderBy('id', 'desc')->get();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        
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
        $item = $request->isMethod('put') ? Item::findOrFail($request->ItemId) : new Item;

        $this->validate($request, [
            'Images' => 'nullable|max:3',
            'Images.*' => 'mimes:jpeg, png, bmp, svg|max:1999',
            'Name' => 'required|unique:items,name'.($request->isMethod('put') ? ",$request->ItemId":''),
            'Price' => 'required|numeric|min:1',
            'SellPrice' => 'required|numeric|min:1',
            'Category' => 'required|numeric',
            'Qty' => 'required|integer|min:1',
            'Supplier' => 'required|integer',
        ],[
            'Images.*'=>'Upload Image file type only.'
        ]);

        $item->id = $request->input('ItemId') ;
        $item->Name =  $request->input('Name');
        $item->Price = $request->input('Price');
        $item->SellPrice = $request->input('SellPrice');
        $item->CategoryId = $request->input('Category');
        $item->Qty = $request->input('Qty');
        DB::beginTransaction();
        try {
        if($item->save()){
            if(!$request->isMethod('put'))
            SupplierStock::stockReport(date('YmdHis'),
            $request->input('Supplier'),
            $item->id,
            $item->Qty,
            $item->Price
            );
            if($request->hasfile('Images'))
            {
                foreach($request->Images as $image)
                {
                    $filenameWithExt = $image->getClientOriginalName();
                    $filename = pathinfo($filenameWithExt, PATHINFO_FILENAME);
                    $extension = $image->getClientOriginalExtension();
                    $name = rand(10000,9999999).'_'.date('YmdHis').'_'.rand(10000,9999999).'.'.$image->extension();
                    $image->move(public_path().'/ItemImages/', $name);
                    ItemImage::addImage($item->id, $name);
                }
             }
            DB::commit();
            return $item;
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
       
        
    }


    public function testImage(Request $request){

    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $this->validate($request, [
            'ItemId' => 'required',
        ]);
        $item = Item::findOrFail($request->input('ItemId'));
        if($item->delete()) {
            return $item;
        }  
    }
}
