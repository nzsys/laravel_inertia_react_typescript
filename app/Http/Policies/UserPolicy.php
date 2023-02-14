<?php

declare(strict_types=1);

namespace App\Http\Policies;

use Illuminate\Auth\Access\HandlesAuthorization;

class UserPolicy
{
    use HandlesAuthorization;

    public function __construct() {}

    // 閲覧権限
}
