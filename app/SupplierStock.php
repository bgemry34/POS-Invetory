<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Item;


class SupplierStock extends Model
{
    //
    public static function stockReport($transactionId, $supplierId, $itemId, $qty, $itemPrice){
        $SupplierStock =  new SupplierStock();
        $SupplierStock->TransactionID = $transactionId;
        $SupplierStock->SupplierId = $supplierId;
        $SupplierStock->ItemId =  $itemId;
        $SupplierStock->Qty = $qty;
        $SupplierStock->TotalPrice = $itemPrice * $qty ;
        $SupplierStock->save();
    }
}
