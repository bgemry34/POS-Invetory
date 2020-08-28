<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class StockLog extends Model
{
    //
    public function item()
    {
        return $this->hasOne('App\Item', 'item_id');
    }

    public function supplier()
    {
        return $this->hasOne('App\Supplier', 'supplier_id');
    }
}
