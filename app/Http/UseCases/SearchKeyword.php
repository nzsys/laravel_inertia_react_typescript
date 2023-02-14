<?php

declare(strict_types=1);

namespace App\Http\UseCases;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;

final class SearchKeyword
{
    public function __invoke(
        Request $request,
    ) {
        $keyword = $request->keyword ?? $request->cookie('keyword');
        $keyword === null
            ? Cookie::expire('keyword')
            : Cookie::queue('keyword', $keyword, 1440);

        if (isset($request->search) && empty($request->keyword)) {
            $keyword = '';
            Cookie::queue('keyword', $keyword, 1440);
        }

        return $keyword;
    }

}
