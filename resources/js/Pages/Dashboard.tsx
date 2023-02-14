import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import BreadCrumbs from "@/Components/BreadCrumbs";
import { Head } from '@inertiajs/react';

interface Props {
    auth: any,
    toast: any,
    errors: any;
}

export default function Dashboard(props: Props) {
    return (
        <AuthenticatedLayout
            auth={props.auth}
            error={props.errors}
            header={<BreadCrumbs />}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">You're logged in!</div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
