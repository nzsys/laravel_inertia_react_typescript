<?php

declare(strict_types=1);

namespace App\Http\UseCase\User;

use Illuminate\Http\Request;
use App\Models\User;

final class DeleteAction
{
    public function __invoke(
        Request $request,
    ): void {
        if ($user = (new User)->find($request->id)) {
			$user->delete();
        }
    }
}
