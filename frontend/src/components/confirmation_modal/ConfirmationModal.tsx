
type Props = {
    isOpen: boolean;
    title: string;
    message: string;
    confirmText: string;
    cancelText: string;
    onConfirm: () => void;
    onCancel: () => void;
    loading: string;
}

function ConfirmationModal({ isOpen, title, message, confirmText, cancelText, onConfirm, onCancel, loading }: Props) {

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
                <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
            </div>

        </div>
    )
}

export default ConfirmationModal