<?php

use App\Http\Controllers\RegisterController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\DeviceController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\RepairController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/register', [RegisterController::class, 'register']);
Route::post('/login', [RegisterController::class, 'login']);

//remplazar sactum por api
Route::middleware('auth:api')->group(function () {
   //Client
    Route::post('/CreateClient', [ClientController::class, 'store']);
    Route::get('/GetClient', [ClientController::class, 'index']);
    Route::get('/ShowClient/{id}', [ClientController::class, 'show']);
    Route::post('/UpdateClient/{id}', [ClientController::class, 'update']);
    Route::post('/DeleteClient/{id}', [ClientController::class, 'destroy']);
    Route::get('/ShowRepairClient', [ClientController::class, 'show_repair_by_client']);

    //employee
    Route::post('/CreateEmployee', [EmployeeController::class, 'store']);
    Route::get('/GetEmployee', [EmployeeController::class, 'index']);
    Route::get('/ShowEmployee/{id}', [EmployeeController::class, 'show']);
    Route::post('/UpdateEmployee/{id}', [EmployeeController::class, 'update']);
    Route::post('/DeleteEmployee/{id}', [EmployeeController::class, 'destroy']);
    Route::get('/ShowRepairEmployee', [EmployeeController::class, 'show_repair_by_employee']);

    //Repair
    Route::post('/CreateRepair', [RepairController::class, 'store']);
    Route::get('/GetRepair', [RepairController::class, 'index']);
    Route::get('/ShowRepair/{id}', [RepairController::class, 'show']);
    Route::post('/UpdateRepair/{id}', [RepairController::class, 'update']);
    Route::post('/DeleteRepair/{id}', [RepairController::class, 'destroy']);
    Route::get('/showDeviceRepair', [RepairController::class, 'show_device_by_repair']);

    //Devices
    Route::post('/CreateDevice', [DeviceController::class, 'store']);
    Route::get('/GetDevice', [DeviceController::class, 'index']);
    Route::get('/ShowDevice/{id}', [DeviceController::class, 'show']);
    Route::post('/UpdateDevice/{id}', [DeviceController::class, 'update']);
    Route::post('/DeleteDevice/{id}', [DeviceController::class, 'destroy']);
});