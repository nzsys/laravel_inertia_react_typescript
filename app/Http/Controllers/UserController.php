<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\User;
use App\Http\Requests\User\StoreRequest;
use App\Http\Requests\User\UpdateRequest;
use App\Http\UseCases\SearchKeyword;
use App\Http\UseCases\User\IndexAction;
use App\Http\UseCases\User\StoreAction;
use App\Http\UseCases\User\UpdateAction;
use App\Http\UseCases\User\DeleteAction;

final class UserController extends Controller
{
    private const PER_PAGE = 30;

    public function index(
        Request $request,
        User $user,
        SearchKeyword $searchKeyword,
        IndexAction $action
    ): Response {
        $keyword = $searchKeyword($request) ?? '';
        $users = $action($user, $keyword, self::PER_PAGE);
        return Inertia::render('User/Index', [
            'users' => $users,
            'keyword' => $keyword,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('User/Create');
    }

    public function store(
        StoreRequest $request,
        StoreAction $action,
    ): RedirectResponse {
        $action($request->make());
        return redirect()->route('user.index');
    }

    public function show(
        int $requestId,
        User $user,
    ): Response {
        $this->authorize('view', [$user::class, $requestId]);
        return Inertia::render('User/Show', [
            'user' => $user->find($requestId),
        ]);
    }

    public function edit(
        int $requestId,
        User $user,
    ): Response {
        return Inertia::render('User/Edit', [
            'user' => $user->find($requestId),
        ]);
    }

    public function update(
        UpdateRequest $request,
        UpdateAction $action,
    ) : RedirectResponse {
        $action($request->make());
        return redirect()->route('user.index');
    }

    public function destroy(
        Request $request,
        DeleteAction $action,
    ): RedirectResponse {
        $action($request);
        return redirect()->route('user.index');
    }
}
