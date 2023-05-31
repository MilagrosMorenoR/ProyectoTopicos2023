<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'last_name',
        'email',
        'phone'
    ];
    //crear relacion 
    public function repair(){
        return $this->hasMany(Repair::class);
    }
}
