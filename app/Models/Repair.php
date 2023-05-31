<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Repair extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'fecha',
        'costo'
    ];
     //crear relacion de Employee y repairs aqui 
     public function employee(){
        return $this->belongsTo(Employee::class);
    }
    public function device(){
        return $this->hasMany(Device::class);
    }
    public function client(){
        return $this->belongsTo(Client::class);
    }
}
