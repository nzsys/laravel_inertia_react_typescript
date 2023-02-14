<?php

declare(strict_types=1);

namespace App\Http\UseCase\User;

use Illuminate\Support\Facades\Hash;
use App\Models\User;

final class UpdateAction
{
    public function __invoke(
        User $user,
    ): void {
        if ($user->password) {
            $user->password = Hash::make($user->password);
        } else {
			unset($user->password);
		}
        $user->save();
    }
}
