import GuestLayout from '@/Layouts/GuestLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head, Link, useForm } from '@inertiajs/react';
import React from "react";
import {Method} from "@inertiajs/inertia";

interface Props {
    status: string;
}
export default function VerifyEmail({ status }: Props) {
    const { post, processing } = useForm({});

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <GuestLayout>
            <Head title="メールアドレス確認" />

            <div className="mb-4 text-sm text-gray-600">
                登録ありがとうございます！届いたメールアドレスを確認してください。
                メールが届かない場合、下のボタンからメールを再送信してください。
            </div>

            {status === 'verification-link-sent' && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    登録されたメールアドレスに新しいメールを送信しました。
                </div>
            )}

            <form onSubmit={submit}>
                <div className="mt-4 flex items-center justify-between">
                    <PrimaryButton processing={processing}>メール再送信</PrimaryButton>

                    <Link
                        href={route('logout')}
                        method={Method.POST}
                        as="button"
                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        ログアウト
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
