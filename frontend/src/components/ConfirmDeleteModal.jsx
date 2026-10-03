const ConfirmDeleteModal = ({
    isOpen,
    lead,
    onClose,
    onConfirm
}) => {

    if (!isOpen || !lead) {
        return null;
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4"
            onClick={onClose}
        >
            <div
                className="w-full max-w-md rounded-xl bg-white shadow-xl"
                onClick={(event) => event.stopPropagation()}
            >

                {/* Header */}

                <div className="border-b border-slate-200 px-6 py-5">
                    <h2 className="text-lg font-semibold text-slate-900">
                        Delete Lead
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        This action cannot be undone.
                    </p>
                </div>


                {/* Content */}

                <div className="px-6 py-5">

                    <div className="rounded-lg bg-red-50 p-4">
                        <p className="text-sm text-red-700">
                            Are you sure you want to delete{" "}
                            <span className="font-semibold">
                                {lead.name}
                            </span>
                            ?
                        </p>
                    </div>

                </div>


                {/* Footer */}

                <div className="flex justify-end gap-3 border-t border-slate-200 px-6 py-4">

                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        onClick={onConfirm}
                        className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-700"
                    >
                        Delete Lead
                    </button>

                </div>

            </div>
        </div>
    );
};

export default ConfirmDeleteModal;