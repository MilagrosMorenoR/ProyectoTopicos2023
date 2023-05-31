<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //crear relacion entre clients, employees y repairs
        Schema::table('devices', function (Blueprint $table) {
            $table->unsignedBigInteger('repair_id');
            $table->foreign('repair_id')
                ->references('id')->on('repairs')
                ->onDelete('cascade');           

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //borrar relacion entre clients y repairs con rollback
        Schema::table('devices', function (Blueprint $table) {
            $table->dropForeign('devices_repair_id_foreing');
            $table->dropColumn('repair_id');

        });
    }
};
