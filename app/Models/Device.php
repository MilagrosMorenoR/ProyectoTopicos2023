<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Device extends Model
{
    use HasFactory;

    protected $fillable = [
        'marca',
        'imei',
        'fail',
        'description'
    ];
    //crear relacion 
    public function repair(){
        return $this->belongsTo(Repair::class);
    }
}
