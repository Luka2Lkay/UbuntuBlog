
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

function ConfirmationModal() {
  return (
    <div>ConfirmationModal</div>
  )
}

export default ConfirmationModal