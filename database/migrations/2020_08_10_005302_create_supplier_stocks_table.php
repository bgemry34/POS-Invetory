<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSupplierStocksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('supplier_stocks', function (Blueprint $table) {
            $table->id();
            $table->decimal('TransactionID', 16,0);
            $table->integer('SupplierId');
            $table->integer('ItemId');
            $table->decimal('Qty', 12,0);
            $table->decimal('TotalPrice', 12,2);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('supplier_stocks');
    }
}
