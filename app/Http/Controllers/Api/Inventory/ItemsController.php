<?php

namespace App\Http\Controllers\Api\Inventory;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Item;
use App\SupplierStock;
use App\ItemImage;
use DB;
use Illuminate\Support\Facades\Storage;

class ItemsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        // return Item::with('category:id,name','images:id,image')->orderBy('id', 'desc')->get();
        return Item::where('Name', 'like', '%'.  $request->input('search')  .'%')->
        with('category:id,Name','images:id,item_id,image')->orderBy('id', 'desc')->paginate(12)
        ->appends(['search'=> $request->input('search')]);
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
        $item =  new Item;

        $this->validate($request, [
            'Images' => 'nullable|max:5',
            'Images.*' => 'mimes:png,bmp,jpeg|max:1999|',
            'Name' => 'required|unique:items',
            'Description' => 'required',
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
        $item->Description = $request->input('Description');
        $item->Price = $request->input('Price');
        $item->SellPrice = $request->input('SellPrice');
        $item->CategoryId = $request->input('Category');
        $item->Qty = $request->input('Qty');
        DB::beginTransaction();
        $savedFiles = [];
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
                    $image->storeAs('public/ItemImages', $name);
                    ItemImage::addImage($item->id, $name);
                    array_push($savedFiles, $name);
                }
             }
            DB::commit();

             return response()->json([$item, $item->category, $item->images], 201);
        }

        }catch (Exception $e) {
            DB::rollBack();
            forEach($savedFiles as $savedFile)
            Storage::delete('public/ItemImages', $savedFile);
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

    public function itemtest(Request $request){
        return Storage::disk('public')->exists('/ItemImages/195755_20200823141457_4757583.jpeg');
    }


    public function update(Request $request)
    {
        $item =  Item::find($request->ItemId);
        $this->validate($request, [
            'Images' => 'nullable|max:5',
            'Images.*' => 'mimes:jpeg, png, bmp, svg|max:1999',
            'Description' => 'required',
            'Name' => 'required|unique:items,Name,'.$request->ItemId,
            'Price' => 'required|numeric|min:1',
            'SellPrice' => 'required|numeric|min:1',
            'Category' => 'required|numeric',
            'Qty' => 'required|integer|min:1',
        ]);
        

        $item->id = $request->input('ItemId') ;
        $item->Name =  $request->input('Name');
        $item->Price = $request->input('Price');
        $item->Description = $request->input('Description');
        $item->SellPrice = $request->input('SellPrice');
        $item->CategoryId = $request->input('Category');
        $item->Qty = $request->input('Qty');

        DB::beginTransaction();
        $savedFiles = [];
        try {
        if($item->save()){
            if($request->hasfile('Images'))
            {
                foreach($request->Images as $image)
                {
                    $filenameWithExt = $image->getClientOriginalName();
                    $filename = pathinfo($filenameWithExt, PATHINFO_FILENAME);
                    $extension = $image->getClientOriginalExtension();
                    $name = rand(10000,9999999).'_'.date('YmdHis').'_'.rand(10000,9999999).'.'.$image->extension();
                    if(!Storage::disk('public')->exists('/ItemImages/'.$filenameWithExt)){
                        $image->storeAs('public/ItemImages', $name);
                        ItemImage::addImage($item->id, $name);
                        array_push($savedFiles, $name);
                    }
                }
            }
            DB::commit();
            return response()->json([
                "id" => $item->id,
                "Name"=> $item->Name,
                "Price"=> $item->Price,
                "Description"=> $item->Description,
                "SellPrice"=>$item->SellPrice,
                "Qty"=> $item->Qty,
                "category"=>$item->Category,
                "images"=>$item->images

            ], 200);
        }

        }catch (Exception $e) {
            DB::rollBack();
            forEach($savedFiles as $savedFile)
            Storage::delete('public/ItemImages', $savedFile);
            return $e;
        } 
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

    public function itemImageDestroy(Request $request)
    {
        $this->validate($request, [
            'Image' => 'required',
        ]);

        $image = ItemImage::where('image', $request->Image)->take(1)->get();

        try{
            if($image[0]->delete()) {
                Storage::disk('public')->delete('/ItemImages/'.$image[0]->image);
                return [
                    "status"=>"success",
                    "message"=>"image has been deleted."
                ];
            }
        }catch(Exception $e){
            return [
                "status"=>"failed",
            ];
        }

    }

    public function search(Request $request){
         return Item::where('Name', 'like', '%'. $request->input('search').'%')->with('category:id,Name','images:id,item_id,image')->orderBy('id', 'desc')->paginate(10);
    }
}
