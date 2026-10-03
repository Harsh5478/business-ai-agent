const AddLeadModal = ({ isOpen, onClose, onAddLead }) => {

    if (!isOpen) {
        return null;
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);

        const newLead = {
            name: formData.get("name"),
            company: formData.get("company"),
            email: formData.get("email"),
            phone: formData.get("phone"),
            status: "New",
            interest: "Unknown"
        };

        onAddLead(newLead);

        event.target.reset();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">

            <div className="w-full max-w-lg rounded-xl bg-white shadow-xl">

                <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">

                    <div>
                        <h2 className="text-lg font-semibold text-slate-900">
                            Add New Lead
                        </h2>

                        <p className="mt-1 text-xs text-slate-500">
                            Add a customer to your sales pipeline.
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                    >
                        ×
                    </button>

                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5 p-6"
                >

                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-slate-700">
                            Full Name
                        </label>

                        <input
                            name="name"
                            type="text"
                            placeholder="Enter customer name"
                            required
                            className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>

                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-slate-700">
                            Company
                        </label>

                        <input
                            name="company"
                            type="text"
                            placeholder="Enter company name"
                            required
                            className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-slate-700">
                                Email
                            </label>

                            <input
                                name="email"
                                type="email"
                                placeholder="customer@email.com"
                                required
                                className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                        </div>

                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-slate-700">
                                Phone
                            </label>

                            <input
                                name="phone"
                                type="tel"
                                placeholder="+91"
                                className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                        </div>

                    </div>

                    <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">

                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
                        >
                            Add Lead
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
};

export default AddLeadModal;