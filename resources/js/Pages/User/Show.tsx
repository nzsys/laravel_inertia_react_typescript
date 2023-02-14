import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import BreadCrumbs from "@/Components/BreadCrumbs";
import { Link, Head } from '@inertiajs/react';
import React from "react";

interface Props {
	auth: any;
    user: User;
}

interface User {
    id: number;
    name: string;
    email: string;
    created_at: string;
    updated_at: string;
}

export default function Create({auth, user}: Props) {
    return (
        <AuthenticatedLayout
            auth={auth}
            header={<BreadCrumbs parent="アカウント管理" uri="user.index" current="閲覧" />}
        >
            <Head title="アカウント管理 | 閲覧"/>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <table className="min-w-full mb-10">
                            <tr className="bg-white border-b">
                                <th scope="col" className="w-3/12 text-sm font-medium text-gray-900 px-6 py-4 text-left">ID</th>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.id}</td>
                            </tr>
                            <tr className="bg-white border-b">
                                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">氏名</th>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                            </tr>
                            <tr className="bg-white border-b">
                                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">メールアドレス</th>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.email}</td>
                            </tr>
                            <tr className="bg-white border-b">
                                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">登録日</th>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.created_at}</td>
                            </tr>
                            <tr className="bg-white border-b">
                                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">更新日</th>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.updated_at}</td>
                            </tr>
                        </table>

                        <Link href={route('user.index')} className="px-4 py-2 bg-gray-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-500 focus:bg-gray-500 active:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150">一覧に戻る</Link>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
