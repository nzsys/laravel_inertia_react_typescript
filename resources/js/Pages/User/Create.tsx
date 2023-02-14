import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import BreadCrumbs from "@/Components/BreadCrumbs";
import TransitionLink from "@/Components/TransitionLink";
import {Head, useForm} from '@inertiajs/react';
import React from "react";
import PrimaryButton from "@/Components/PrimaryButton";
import {Transition} from "@headlessui/react";

interface Props {
	auth: any;
}

export default function Create({auth}: Props) {

    const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
        name: '',
        email: '',
        password: '',
    });

    const create = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('user.store'));
    };

    return (
        <AuthenticatedLayout
            auth= {auth}
            header={<BreadCrumbs parent="アカウント管理" uri="user.index" current="新規作成" />}
        >
            <Head title="アカウント管理 | 新規作成"/>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <h2 className="text-lg font-medium text-gray-900">アカウント情報</h2>
                        <p className="mt-1 text-sm text-gray-600">
                            アカウント情報を登録します。
                        </p>
                        <form onSubmit={create} className="mt-6 space-y-6">
                            <div>
                                <InputLabel forInput="name" value="氏名" />
                                <TextInput
                                    id="name"
                                    className="mt-1 block w-full"
                                    value={data.name}
                                    handleChange={(e) => setData('name', e.target.value)}
                                    required
                                    isFocused
                                    autoComplete="name"
                                />
                                <InputError message={errors.name ?? ''} className="mt-2" />
                            </div>
                            <div>
                                <InputLabel forInput="email" value="メールアドレス" />
                                <TextInput
                                    id="email"
                                    type="email"
                                    className="mt-1 block w-full"
                                    value={data.email}
                                    handleChange={(e) => setData('email', e.target.value)}
                                    required
                                    autoComplete="email"
                                />
                                <InputError message={errors.email ?? ''} className="mt-2" />
                            </div>
                            <div>
                                <InputLabel forInput="password" value="パスワード" />
                                <TextInput
                                    id="password"
                                    type="password"
                                    value={data.password ?? ''}
                                    handleChange={(e)=> setData('password', e.target.value)}
                                    className="mt-1 block w-full"
                                    autoComplete="password"
                                />
                                <InputError message={errors.password ?? ''} className="mt-2" />
                            </div>
                            <div className="flex items-center gap-4">
                                <PrimaryButton processing={processing}>保存</PrimaryButton>

                                <Transition
                                    show={recentlySuccessful}
                                    enterFrom="opacity-0"
                                    leaveTo="opacity-0"
                                    className="transition ease-in-out"
                                >
                                    <TransitionLink href="user" />
                                </Transition>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
