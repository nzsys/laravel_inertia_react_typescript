<?php

declare(strict_types=1);

namespace App\Http\UseCase\User;

use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Packages\Domain\User\Actor;

final class StoreAction
{
    public function __invoke(
        User $user,
    ): void {
        $user->actor = Actor::MANAGER->value();
        $user->password = Hash::make($user->password);
        $user->save();
    }
}
