
type Props = {
    isOpen: boolean;
    title: string;
    message: string;
    confirmText: string;
    cancelText: string;
    onConfirm: () => void;
    onCancel: () => void;
    loading?: boolean;
    danger?: boolean;
}

function ConfirmationModal({ isOpen, title, message, confirmText, cancelText, onConfirm, onCancel, loading, danger }: Props) {

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
                <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
                <p className="mt-3 text-sm text-gray-600">{message}</p>
                <div className="mt-6 flex justify-between gap-3">
                    <button onClick={onConfirm} className={`cursor-pointer w-full rounded-lg px-4 py-2 text-sm font-medium text-white transition disabled:opacity-50 ${danger ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"}`}>
                        {loading ? "Please wait..." : confirmText}
                    </button>

                    <button disabled={loading} onClick={onCancel} className="cursor-pointer w-full rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 disabled:opacity-50">
                        {cancelText}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmationModal