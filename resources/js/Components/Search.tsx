import React from 'react';
import TextInput from '@/Components/TextInput';
import { FaSearch } from 'react-icons/fa';
import {useForm} from "@inertiajs/react";

interface Props {
    href: string;
    value: string | null;
}

export default function Search({ href, value }: Props) {

    const { data, setData, post, processing } = useForm({
        keyword: value,
        search: 1,
    });

    const submit = function(e: React.FormEvent) {
        e.preventDefault();
        post(route(href));
    }

    return (
        <div className="mt-4 px-2 sm:px-4 lg:px-6">
            <div className="relative">
                <form onSubmit={submit}>
                    <TextInput
                        id="search"
                        name="keyword"
                        value={data.keyword ?? ''}
                        handleChange={(e) => setData('keyword', e.target.value)}
                        type="text"
                        className="h-10 w-80 pr-8 pl-5 rounded z-0 focus:shadow focus:outline-none"
                        placeHolder="Search any ..."
                    />
                    <div className="absolute top-3 right-3">
                        <FaSearch className="text-gray-400 z-20 hover:text-gray-500" onClick={submit} />
                    </div>
                </form>
            </div>
        </div>
    );
}
