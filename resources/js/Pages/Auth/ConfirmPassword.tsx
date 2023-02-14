import React, { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const onHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setData(event.target.name as "password", event.target.value);
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        post(route('password.confirm'));
    };

    return (
        <GuestLayout>
            <Head title="パスワード認証" />

            <div className="mb-4 text-sm text-gray-600">
                パスワードを認証してください。
            </div>

            <form onSubmit={submit}>
                <div className="mt-4">
                    <InputLabel forInput="password" value="パスワード" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="block w-full mt-1"
                        isFocused
                        handleChange={onHandleChange}
                    />

                    <InputError message={errors.password ?? ''} className="mt-2" />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <PrimaryButton className="ml-4" processing={processing} >
                        認証する
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
