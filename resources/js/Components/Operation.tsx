import React, {FormEvent, useEffect, useState} from "react";
import SecondaryButton from "@/Components/SecondaryButton";
import DangerButton from "@/Components/DangerButton";
import Modal from "@/Components/Modal";
import { FaEye, FaEdit, FaTrashAlt } from 'react-icons/fa';
import {Link, useForm} from "@inertiajs/react";
import toaster, { Toaster } from 'react-hot-toast';

interface Props {
    id: string | number;
    href: string;
    page: any;
    data: any;
}

export default function Operation({ id, href, page, data }: Props) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const {delete: destroy, processing} = useForm();

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e: FormEvent) => {
        e.preventDefault();

        destroy(route(href + '.destroy', {id: id}), {
            preserveScroll: true,
            onSuccess: () => {
                closeModal()
            },
            onError: () => toaster.error('削除に失敗しました'),
            onFinish: () => route('user.index'),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);
    };

    return (
        <>
            <Link className="bg-gray-500 inline-flex hover:bg-gray-400 text-white rounded px-2 py-2 mr-2" href={route(href + '.show', id)}><FaEye /></Link>
            <Link className="bg-blue-600 inline-flex hover:bg-blue-500 text-white rounded px-2 py-2 mr-2" href={route(href + '.edit', id)}><FaEdit /></Link>
            <button className="bg-red-700 hover:bg-red-600 text-white rounded px-2 py-2" onClick={confirmUserDeletion}><FaTrashAlt /></button>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        アカウントを削除してもよろしいですか？
                    </h2>
                    <p className="mt-1 text-sm text-gray-600">
                        アカウントが削除されると、そのすべてのリソースとデータが完全に削除されます。
                        パスワードを入力して、アカウントを完全に削除することを確認します。
                    </p>
                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>取消</SecondaryButton>
                        <DangerButton className="ml-3" processing={processing}>
                            削除
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </>
    );
}
