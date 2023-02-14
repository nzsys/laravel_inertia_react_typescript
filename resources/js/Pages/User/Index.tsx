import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import BreadCrumbs from "@/Components/BreadCrumbs";
import Pagination from "@/Components/Pagination";
import Search from "@/Components/Search";
import Create from "@/Components/Create";
import Operation from "@/Components/Operation";
import React, {useEffect, useState} from "react";

interface Props {
	auth: any;
    users: any;
    keyword: string | null;
    status: string;
}

interface User {
    id: number;
    name: string;
    email: string;
    created_at: string;
}

export default function Index({auth, users, keyword}: Props) {
    const [data, setData] = useState(users.data);
    const [origin, setOrigin] = useState(users);

    useEffect(() => {
        setData(users.data);
        setOrigin(users);
    }, [users.data, keyword]);

    return (
        <AuthenticatedLayout
            auth={auth}
            header={<BreadCrumbs current="アカウント管理" />}
        >
            <Head title="アカウント管理"/>
            <div className="py-12">
                <div className="relative overflow-x-auto mx-auto max-w-7xl shadow-md sm:rounded-lg space-y-6">
                    <div className="flex justify-end">
                        <Search href="user.index" value={keyword} />
                        <Create href="user" />
                    </div>
                    <table className="min-w-full">
                        <thead className="bg-white border-b">
                        <tr>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">#</th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">氏名</th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">メールアドレス</th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">登録日</th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left"></th>
                        </tr>
                        </thead>
                        <tbody>
                        {0 < data.length ?
                            data.map((user: User) => (
                                <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-50" key={user.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.created_at}</td>
                                    <td className="text-right px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        <Operation id={user.id} href="user" page={data.current_page} data={data} />
                                    </td>
                                </tr>
                            ))
                            :
                            <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-50">
                                <td colSpan={5} className="text-center px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">ユーザー情報が見つかりませんでした</td>
                            </tr>
                        }
                        </tbody>
                    </table>
                    <Pagination data={origin} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
