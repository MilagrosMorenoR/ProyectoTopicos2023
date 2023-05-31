<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Repair;
use Illuminate\Support\Facades\Validator;
use Laravel\Ui\Presets\React;

class RepairController extends ResponseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
         //Get all repairs
         $repair = Repair::all();
         return $this->sendResponse($repair, 'Repair Index');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //create Repairs
        $validator = Validator::make($request->all(), [
            'price' => 'required|integer',
            'date' => 'required',
            'client_id' => 'required|integer',
            'employee_id' => 'required|integer',

        ]); 

        if($validator->fails()){
            return $validator->errors();
        }

        $repair = new Repair();
        $repair->date = $request->date;
        $repair->price = $request->price;
        $repair->client_id = $request->client_id;
        $repair->employee_id = $request->employee_id;
        $repair->save();
        return $this->sendResponse($repair, 'Repair Create Sucesfully');

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
         //show repair by id
        $repair = Repair::find($id);

        return $this->sendResponse($repair, 'Repair Found');
        //solo muestra la reparacion falta indicar que muestre empleado y cliente
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
         //find repairs by id
         $repair = Repair::find($request->id);
        
         $repair = Repair::find($id);
    
         $repair->date = $request->date;
         $repair->price = $request->price;
         $repair->save();
      
         return $this->sendResponse($repair, 'Repair updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request,  $id)
    {
        //find repairs by id
        $repair = Repair::find($request->id);
        $crepair = Repair::find($id);
        //delete repairs
        $repair->delete();
     
        return $this->sendResponse([], 'Repairs deleted successfully.');

    }
    public function show_device_by_repair(Request $request)
    {  
        $repair = Repair::find($request->repair_id);

        if(is_null ($repair)){
            return "Relation not found";
        }

        $input = $request->all();
      
        $validate = Validator::make($input, [
            "repair_id" => "required|min1"
        ]);

        if($validate->fails()){
            return $validate->errors();
        }

        foreach ($repair -> device as $device){
            $datos[] = [
                "id" => $device->id,
                "model" => $device->name,
                "mark" => $device->mark,
                "imei" => $device->imei,
                "fail" => $device->fail,
                "description" => $device->description
            ];
        }
        return response()->json($datos);
        
    }
}
