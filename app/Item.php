<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    //
    public function category()
    {
        return $this->belongsTo('App\Category', 'CategoryId');
    }

    public function images()
    {
        return $this->hasMany('App\ItemImage');
    }

    public static function updateStock($id, $qty){
        $item = Item::find($id);

        $item->Qty = intval($item->Qty) + intval($qty);
 
        if($item->save()){
            return [$item, $item->category, $item->images];
        }
    }
    
}
