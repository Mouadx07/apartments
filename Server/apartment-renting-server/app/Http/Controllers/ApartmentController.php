<?php

namespace App\Http\Controllers;

use App\Models\Apartment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ApartmentController extends Controller
{
    //
    public function index(Request $request) {
        $data = Apartment::with('user:id,name')->get();
        return response()->json(["success"=>true,'apartments'=> $data],200);
    }
    public function show(Request $request) {
        $id = $request->route('id');
        $apartment = Apartment::with('user:id,name,phone')->findOrFail($id);
        return response()->json(["success"=>true,'apartments'=> $apartment],200);
    }
    public function store(Request $request) {

          $img_path = $request->file('image')->store('apartments', 'public');
          $path = asset('storage/'.$img_path);
        $apartment = [
            'address' => $request->input('address'),
            'image' => $path,
            'rooms' => $request->input('rooms'),
            'price' => $request->input('price'),
            'user_id' =>  $request->input('user_id'),
        ];

        $apartment = Apartment::create($apartment);
        $id = $apartment->id;
        return response()->json(["success"=> 1, "apartmentId"=> $path], 200);
    }
    public function update(Request $request) {
        
        $img_path = $request->file('image')->store('apartments', 'public');
        $img_path = asset('storage/'.$img_path);
       

        $data = [
            'id' => $request->input('id'),
            'address' => $request->input('address'),
            'image' => $img_path,
            'rooms' => $request->input('rooms'),
            'price' => $request->input('price'),
            'user_id' =>  $request->input('user_id'),
        ];
        
       $apartment = Apartment::findOrFail($data['id']);
        
        $apartment->update($data);
        $id = $apartment->id;
        return response()->json(["success"=> 1, "apartmentId"=> $id], 200);
    }
    public function delete(Request $request) {
        
      
       

        $data = [
            'id' => $request->input('id'),
            
        ];
        
       $apartment = Apartment::findOrFail($data['id']);
        
       if($apartment){
        $apartment->delete();
       };
        $id = $apartment->id;
        return response()->json(["success"=> 1, "apartmentId"=> $id], 200);
    }
}