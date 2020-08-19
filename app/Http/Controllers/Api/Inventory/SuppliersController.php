<?php

namespace App\Http\Controllers\Api\Inventory;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Supplier;

class SuppliersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return $Supplier = Supplier::orderBy('id', 'DESC')->get();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
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
        $Supplier = $request->isMethod('put') ? Supplier::findOrFail($request->SupplierId) : new Supplier;
        
        $this->validate($request, [
            'Name' => 'required|unique:suppliers,name'.($request->isMethod('put') ? ",$request->SupplierId":''),
            'Address' => 'required',
            'PhoneNumber' => 'required|digits:11',
        ]);

        $Supplier->id = $request->input('SupplierId') ;
        $Supplier->Name = $request->input('Name') ;
        $Supplier->Address =  $request->input('Address');
        $Supplier->PhoneNumber = $request->input('PhoneNumber');

        if($Supplier->save()) {
            return $Supplier;
        }
    }
    
    public function destroy(Request $request)
    {
        //
        $this->validate($request, [
            'SupplierId' => 'required',
        ]);
        $Supplier = Supplier::findOrFail($request->SupplierId);
        if($Supplier->delete()) {
            return $Supplier;
        }  
    }
}
