<?php

declare(strict_types=1);

namespace App\Http\UseCase\User;

use App\Models\User;
use Packages\Domain\User\Actor;

final class IndexAction
{
    public function __invoke(
        User $user,
        string $keyword,
        int $perPage,
    ) {
        if ($keyword) {
            return $user
                ->where('actor', Actor::MANAGER->value())
                ->where(function ($query) use ($keyword) {
                    $query->where('name', 'LIKE', "%{$keyword}%")->orWhere('email', 'LIKE', "%{$keyword}%");
                })
                ->paginate($perPage);
        }
        return $user
            ->where('actor', '=', Actor::MANAGER->value())
            ->paginate($perPage);
    }

}
