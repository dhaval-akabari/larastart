<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */

    public function rules()
    {
        return [
            'name' => 'bail|required|max:191',
            'type' => 'required',
        ] + ($this->isMethod('POST') ? $this->store() : $this->update());
    }

    protected function store()
    {
        return [
            'email' => 'bail|required|email|max:191|unique:users',
            'password' => 'bail|required|min:6',
        ];
    }

    protected function update()
    {
        return [
            'email' => 'bail|required|email|max:191|unique:users,email,'.$this->id,
            'password' => 'nullable|min:6',
        ];
    }
}
