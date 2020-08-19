<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ItemImage extends Model
{
    //
    public static function addImage($item_id, $image){
        $ItemImage = new ItemImage();
        $ItemImage->item_id = $item_id;
        $ItemImage->image = $image;
        $ItemImage->save();
    }

}
