<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Device;
use Illuminate\Support\Facades\Validator;

class DeviceController extends ResponseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //Get all device
        $device = Device::all();
        return $this->sendResponse($device, 'Devices Index');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
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
         //create device
         $validator = Validator::make($request->all(), [
            'model'=> 'required|min:2|string',
            'mark' => 'required|min:2|string',
            'imei' => 'required|min:15|integer',
            'fail' => 'required|min:4|string',
            'description' => 'required|min:5|string',
            'repair_id' => 'required|integer'
        ]);

        if($validator->fails()){
            return $validator->errors();
        }

        $device = new Device();
        $device->model = $request->model;
        $device->mark = $request->mark;
        $device->imei = $request->imei;
        $device->fail = $request->fail;
        $device->description = $request->description;
        $device->repair_id = $request->repair_id;
        $device->save();
        return $this->sendResponse($device, 'Device Create Sucesfully');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {

        $device = Device::find($id);
    
        return $this->sendResponse($device, 'Device Found');
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
        //find employee by id
        $device = Device::find($request->id);    

        $device = Device::find($id);

        $device->model = $request->model;
        $device->mark = $request->mark;
        $device->imei = $request->imei;
        $device->fail = $request->fail;
        $device->description = $request->description;
        $device->repair_id = $request->repair_id;
        $device->save();
        return $this->sendResponse($device, 'Device Update Sucesfully');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id)
    {
        
        //find device by id
        $device = Device::find($request->id);
     
        $device = Device::find($id);
    
        //delte employee
        $device->delete();
     
        return $this->sendResponse([], 'Device deleted successfully.');
    }
}
