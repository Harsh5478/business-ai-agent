const ViewLeadModal = ({
    lead,
    isOpen,
    onClose,
    onEdit,
    onDelete
}) => {

    if (!isOpen || !lead) {
        return null;
    }

    const getStatusStyle = (status) => {
        switch (status) {
            case "New":
                return "bg-blue-50 text-blue-700";

            case "Contacted":
                return "bg-amber-50 text-amber-700";

            case "Replied":
                return "bg-emerald-50 text-emerald-700";

            default:
                return "bg-slate-100 text-slate-700";
        }
    };

    const getInterestStyle = (interest) => {
        switch (interest) {
            case "High":
                return "text-emerald-600";

            case "Medium":
                return "text-amber-600";

            case "Unknown":
                return "text-slate-400";

            default:
                return "text-slate-500";
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4"
            onClick={onClose}
        >

            <div
                className="w-full max-w-lg overflow-hidden rounded-xl bg-white shadow-xl"
                onClick={(e) => e.stopPropagation()}
            >

                {/* Header */}

                <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">

                    <div>
                        <h2 className="text-lg font-semibold text-slate-900">
                            Lead Details
                        </h2>

                        <p className="mt-1 text-xs text-slate-500">
                            View customer information and activity.
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                    >
                        ×
                    </button>

                </div>


                {/* Lead Profile */}

                <div className="p-6">

                    <div className="flex items-center gap-4">

                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-xl font-semibold text-blue-600">
                            {lead.name.charAt(0)}
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-slate-900">
                                {lead.name}
                            </h3>

                            <p className="text-sm text-slate-500">
                                {lead.company}
                            </p>
                        </div>

                    </div>


                    {/* Status / Interest */}

                    <div className="mt-6 grid grid-cols-2 gap-4">

                        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">

                            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                                Status
                            </p>

                            <span
                                className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${getStatusStyle(
                                    lead.status
                                )}`}
                            >
                                {lead.status}
                            </span>

                        </div>


                        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">

                            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                                Interest
                            </p>

                            <p
                                className={`mt-2 text-sm font-semibold ${getInterestStyle(
                                    lead.interest
                                )}`}
                            >
                                {lead.interest}
                            </p>

                        </div>

                    </div>


                    {/* Contact Information */}

                    <div className="mt-6">

                        <h4 className="text-sm font-semibold text-slate-900">
                            Contact Information
                        </h4>

                        <div className="mt-3 divide-y divide-slate-100 rounded-lg border border-slate-200">

                            <div className="flex items-center justify-between px-4 py-3">

                                <span className="text-sm text-slate-500">
                                    Email
                                </span>

                                <span className="text-sm font-medium text-slate-700">
                                    {lead.email}
                                </span>

                            </div>

                            <div className="flex items-center justify-between px-4 py-3">

                                <span className="text-sm text-slate-500">
                                    Phone
                                </span>

                                <span className="text-sm font-medium text-slate-700">
                                    {lead.phone || "Not provided"}
                                </span>

                            </div>

                            <div className="flex items-center justify-between px-4 py-3">

                                <span className="text-sm text-slate-500">
                                    Company
                                </span>

                                <span className="text-sm font-medium text-slate-700">
                                    {lead.company}
                                </span>

                            </div>

                        </div>

                    </div>


                    {/* Activity */}

                    <div className="mt-6">

                        <h4 className="text-sm font-semibold text-slate-900">
                            Activity
                        </h4>

                        <div className="mt-3 rounded-lg border border-dashed border-slate-200 bg-slate-50 px-4 py-5 text-center">

                            <p className="text-sm text-slate-500">
                                No activity yet
                            </p>

                            <p className="mt-1 text-xs text-slate-400">
                                Lead activity will appear here.
                            </p>

                        </div>

                    </div>

                </div>


                {/* Footer */}

       <div className="flex items-center justify-between border-t border-slate-200 px-6 py-4">

    {/* Delete */}

    <button
        onClick={onDelete}
        className="rounded-lg px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
    >
        Delete Lead
    </button>


    {/* Right Side */}

    <div className="flex gap-3">

        <button
            onClick={onClose}
            className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
        >
            Close
        </button>

        <button
            onClick={onEdit}
            className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
        >
            Edit Lead
        </button>

    </div>

</div>

            </div>

        </div>
    );
};

export default ViewLeadModal;