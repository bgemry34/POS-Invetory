<?php

namespace App\Http\Controllers\Api\Inventory;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Category;

class CategoriesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        return Category::orderBy('id', 'DESC')->get();
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
        $Category = new Category;
        $this->validate($request, [
            'Name' => 'required|unique:categories',
        ],
        [
            'Name.required'=>'The category name field is required.'
        ]);

        $Category->Name =  $request->input('Name');
        if($Category->save()) {
            return $Category;
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
       // Get Category
       $Category = Category::findOrFail($request->input('CategoryId'));

       if($Category->delete()) {
           return $Category;
       }
    }  
}
