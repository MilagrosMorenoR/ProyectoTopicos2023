<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Employee;
use Illuminate\Support\Facades\Validator;

class EmployeeController extends ResponseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //Get all employees
        $employee = Employee::all();
        return $this->sendResponse($employee, 'Employee Index');
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
        //create employee
        $validator = Validator::make($request->all(), [
            'name' => 'required|min:3|string',
            'last_name' => 'required|min:5|string',
        ]);

        if($validator->fails()){
            return $validator->errors();
        }

        $employee = new Employee();
        $employee->name = $request->name;
        $employee->last_name = $request->last_name;
        $employee->save();
        return $this->sendResponse($employee, 'Employee Create Sucesfully');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //show employee by id
       
        $employee = Employee::find($id);
       

        return $this->sendResponse($employee, 'Employee Found');
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
        $employee = Employee::find($request->id);

        $employee = Employee::find($id);

        $employee->name = $request->name;
        $employee->last_name = $request->last_name;
        $employee->save();
     
        return $this->sendResponse($employee, 'Employee updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id)
    {
        //find employee by id
        $employee = Employee::find($request->id);
        $employee = Employee::find($id);
        //delte employee
        $employee->delete();
     
        return $this->sendResponse([], 'Employee deleted successfully.');
    }

    public function show_repair_by_employee(Request $request)
    {  
        $employee = Employee::find($request->employee_id);
        
        if(is_null ($employee)){
            return "Relation not found";
        }

        $input = $request->all();
      
        $validate = Validator::make($input, [
            "employee_id" => "required|min1"
        ]);

        if($validate->fails()){
            return $validate->errors();
        }

        foreach ($employee -> repair as $repair){
            $datos[] = [
                "id" => $repair->id,
                "date" => $repair->date,
                "price" => $repair->price
            ];
        }
        return response()->json($datos);
        
    }
}
