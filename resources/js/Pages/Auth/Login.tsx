import React, { useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';


interface Props {
  status: string;
  canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: Props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: '',
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const onHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setData(event.target.name  as  "email" | "password" | "remember", event.target.type === 'checkbox' ? event.target.checked + '' : event.target.value);
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        post(route('login'));
    };

    return (
        <GuestLayout>
            <Head title="ログイン" />
            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <div className="text-right">
                <Link
                    href={route("register")}
                    className="underline mb-2 text-sm text-gray-600 hover:text-gray-900"
                >
                    新規登録はこちら
                </Link>
            </div>

            <form onSubmit={submit}>
                <div>
                    <InputLabel forInput="email" value="メールアドレス" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        handleChange={onHandleChange}
                    />

                    <InputError message={errors.email ?? ''} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel forInput="password" value="パスワード" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        handleChange={onHandleChange}
                    />

                    <InputError message={errors.password ?? ''} className="mt-2" />
                </div>

                <div className="block mt-4">
                    <label className="flex items-center">
                        <Checkbox name="remember" value={data.remember} handleChange={onHandleChange} />
                        <span className="ml-2 text-sm text-gray-600">ログイン情報を記憶する</span>
                    </label>
                </div>

                <div className="flex items-center justify-end mt-4">
                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            パスワードを忘れた方はこちら
                        </Link>
                    )}

                    <PrimaryButton className="ml-4" processing={processing}>
                        ログイン
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
