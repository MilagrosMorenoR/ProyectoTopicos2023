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
        Schema::table('repairs', function (Blueprint $table) {
            $table->unsignedBigInteger('client_id');
            $table->foreign('client_id')
                ->references('id')->on('clients')
                ->onDelete('cascade');
            $table->unsignedBigInteger('employee_id');
            $table->foreign('employee_id')
                    ->references('id')->on('employees')
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
        Schema::table('repairs', function (Blueprint $table) {
            $table->dropForeign('repairs_client_id_foreing');
            $table->dropColumn('client_id');
            $table->dropForeign('repairs_employee_id_foreing');
            $table->dropColumn('employee_id');

        });
    }
};
