import React, { useRef, useState, FormEvent } from 'react';
import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';

interface Props {
    className: string;
}

export default function DeleteUserForm({ className }: Props) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef() as React.MutableRefObject<HTMLInputElement>;

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e: FormEvent) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">アカウントの削除</h2>

                <p className="mt-1 text-sm text-gray-600">
                    アカウントが削除されると、そのすべてのリソースとデータが完全に削除されます。
                    アカウントを削除する場合は、保持したいデータまたは情報をダウンロードしてください。
                </p>
            </header>

            <DangerButton onClick={confirmUserDeletion}>アカウント削除</DangerButton>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        アカウントを削除してもよろしいですか？
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        アカウントが削除されると、そのすべてのリソースとデータが完全に削除されます。
                        パスワードを入力して、アカウントを完全に削除することを確認します。
                    </p>

                    <div className="mt-6">
                        <InputLabel forInput="password" value="パスワード" className="sr-only" />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            handleChange={(e) => setData('password', e.target.value)}
                            className="mt-1 block w-3/4"
                            isFocused
                            placeHolder="Password"
                        />

                        <InputError message={errors.password ?? ''} className="mt-2" />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>取消</SecondaryButton>

                        <DangerButton className="ml-3" processing={processing}>
                            削除
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
