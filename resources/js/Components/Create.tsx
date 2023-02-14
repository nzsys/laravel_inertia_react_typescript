import React from "react";
import { Link } from "@inertiajs/react";
import { FaHammer } from 'react-icons/fa';

interface Props {
    href: string;
}

export default function Create({ href }: Props) {
    return (
        <div className="justify-end">
            <Link className="bg-green-600 inline-flex hover:bg-green-500 text-white rounded px-2 py-1 mt-5 mr-5" href={route(href + '.create')}><FaHammer className="pt-1 mr-1" />作成</Link>
        </div>
    );
}
