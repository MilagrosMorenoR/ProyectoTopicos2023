<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;
use Laravel\Ui\Presets\React;
use Illuminate\Support\Facades\Validator;

class ClientController extends ResponseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //Get all client
        $client = Client::all();        
        return $this->sendResponse($client, 'Client Index');

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
        //create clients
        $validator = Validator::make($request->all(), [
            'name' => 'required|min:3|string',
            'last_name' => 'required|min:3|string',
            'email' => 'required|regex:/(.+)@(.+)\.(.+)/i',
            'phone' => 'required|min:10|integer',
        ]);

        if($validator->fails()){
            return $validator->errors();
        }

        $client = new Client();
        $client->name = $request->name;
        $client->last_name = $request->last_name;
        $client->email = $request->email;
        $client->phone = $request->phone;
        $client->save();

        return $this->sendResponse($client, 'Client Create Sucesfully');

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
     
        $client = Client::find($id);
      

        return $this->sendResponse($client, 'Clients Found');

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
         //find clients by id
         $client = Client::find($request->id);
 
         //Update clients
         $client = Client::find($id);

         $client->name = $request->name;
         $client->last_name = $request->last_name;
         $client->email = $request->email;
         $client->phone = $request->phone;
     
         $client->save();
      
         return $this->sendResponse($client, 'Client updated successfully.');
 
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id)
    {
        //find clients by id
        $client = Client::find($request->id);
        $client = Client::find($id);
        //delte clients
        $client->delete();
      
        return $this->sendResponse([], 'Clients deleted successfully.');
    }

    public function show_repair_by_client(Request $request)
    {  
        $client = Client::find($request->client_id);
      

        foreach ($client -> repair as $repair){
            $datos[] = [
                "id" => $repair->id,
                "date" => $repair->date,
                "price" => $repair->price
            ];
        }
        return response()->json($datos);
        
    }
}
