import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/react';
// @ts-ignore
import type { Page, PageProps, Errors, ErrorBag } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import React from "react";
import {Method} from "@inertiajs/core";

interface Props {
    mustVerifyEmail: boolean;
    status: string;
    className: string;
}

interface InertiaPage extends Page<PageProps> {
    props: {
        errors: Errors & ErrorBag;
        auth: {
            user: {
                name: string;
                email: string;
            };
        };
    };
}

export default function UpdateProfileInformation({ mustVerifyEmail, status, className, }: Props) {
    // @ts-ignore
    const user = usePage<InertiaPage>().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: user.name,
        email: user.email,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        patch(route('profile.update'));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">アカウント情報</h2>

                <p className="mt-1 text-sm text-gray-600">
                    氏名とメールアドレスを更新します。
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
		<InputLabel forInput="name" value ="氏名" />

                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        handleChange={(e) => setData('name', e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />

                    <InputError className="mt-2" message={errors.name ?? ''} />
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
                        autoComplete="username"
                    />

                    <InputError className="mt-2" message={errors.email ?? ''} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="text-sm mt-2 text-gray-800">
                            メールアドレスが確認できませんでした
                            <Link
                                href={route('verification.send')}
                                method={Method.POST}
                                as="button"
                                className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                確認メールを再送信するには、ここをクリックしてください。
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 font-medium text-sm text-green-600">
                                確認用URLを送信しました。
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <PrimaryButton processing={processing}>保存</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enterFrom="opacity-0"
                        leaveTo="opacity-0"
                        className="transition ease-in-out"
                    >
                        <p className="text-sm text-gray-600">保存しました。</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
