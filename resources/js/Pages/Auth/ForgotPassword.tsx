import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import {Head, Link, useForm} from '@inertiajs/react';
import React from "react";

interface Props {
    status: string;
}

export default function ForgotPassword({ status }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const onHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setData(event.target.name as "email", event.target.value);
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="パスワードリセット" />

            <div className="text-right mb-5">
                <Link
                    href={route("login")}
                    className="underline mb-5 text-sm text-gray-600 hover:text-gray-900"
                >
                    ログインはこちら
                </Link>
            </div>

            <div className="mb-4 text-sm text-gray-600">
                メールアドレスを入力してください。パスワードリセット用のリンクを送ります。
            </div>

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <form onSubmit={submit}>
                <TextInput
                    id="password"
                    type="email"
                    name="email"
                    value={data.email}
                    className="mt-1 block w-full"
                    isFocused
                    handleChange={onHandleChange}
                />

                <InputError message={errors.email ?? ''} className="mt-2" />

                <div className="flex items-center justify-end mt-4">
                    <PrimaryButton className="ml-4" processing={processing}>
                        パスワードのリセットリンクを送る
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
