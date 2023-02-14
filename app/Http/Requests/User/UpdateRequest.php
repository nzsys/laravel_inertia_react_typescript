<?php

declare(strict_types=1);

namespace App\Http\Requests\User;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules;
use Illuminate\Validation\Rule;

class UpdateRequest extends FormRequest
{
    public function rules(): array
    {
        $rule = [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|' . Rule::unique(User::class)->ignore($this->request->get('id')),
        ];
        if ($this->request->get('password')) {
            $rule['password'] = [Rules\Password::defaults()];
        }
        return $rule;
    }

    public function make(): User
    {
        return (new User)->find($this->request->get('id'))?->fill($this->validated());
    }
}
