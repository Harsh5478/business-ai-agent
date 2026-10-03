import { useState } from "react";

const EditLeadModal = ({ lead, isOpen, onClose, onSave }) => {

   const [formData, setFormData] = useState(() => ({
    name: lead?.name || "",
    company: lead?.company || "",
    email: lead?.email || "",
    phone: lead?.phone || "",
    status: lead?.status || "New",
    interest: lead?.interest || "Unknown"
}));
    

    if (!isOpen || !lead) {
        return null;
    }

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((currentData) => ({
            ...currentData,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        onSave({
            ...lead,
            ...formData
        });
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4"
            onClick={onClose}
        >

            <div
                className="w-full max-w-lg rounded-xl bg-white shadow-xl"
                onClick={(event) => event.stopPropagation()}
            >

                {/* Header */}

                <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">

                    <div>
                        <h2 className="text-lg font-semibold text-slate-900">
                            Edit Lead
                        </h2>

                        <p className="mt-1 text-xs text-slate-500">
                            Update customer information.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                    >
                        ×
                    </button>

                </div>


                {/* Form */}

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5 p-6"
                >

                    {/* Name */}

                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-slate-700">
                            Full Name
                        </label>

                        <input
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>


                    {/* Company */}

                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-slate-700">
                            Company
                        </label>

                        <input
                            name="company"
                            type="text"
                            value={formData.company}
                            onChange={handleChange}
                            required
                            className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>


                    {/* Email + Phone */}

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-slate-700">
                                Email
                            </label>

                            <input
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                        </div>

                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-slate-700">
                                Phone
                            </label>

                            <input
                                name="phone"
                                type="tel"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                        </div>

                    </div>


                    {/* Status + Interest */}

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-slate-700">
                                Status
                            </label>

                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            >
                                <option value="New">New</option>
                                <option value="Contacted">Contacted</option>
                                <option value="Replied">Replied</option>
                                <option value="Converted">Converted</option>
                                <option value="Lost">Lost</option>
                            </select>
                        </div>


                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-slate-700">
                                Interest
                            </label>

                            <select
                                name="interest"
                                value={formData.interest}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            >
                                <option value="Unknown">Unknown</option>
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                        </div>

                    </div>


                    {/* Footer */}

                    <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">

                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
                        >
                            Save Changes
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
};

export default EditLeadModal;