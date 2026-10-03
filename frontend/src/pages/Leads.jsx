import { useEffect, useState } from "react";

import AddLeadModal from "../components/AddLeadModal";
import ViewLeadModal from "../components/ViewLeadModal";
import EditLeadModal from "../components/EditLeadModal";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";

import {
    getLeads,
    createLead,
    updateLead,
    deleteLead
} from "../services/leadService";

const Leads = () => {
    // -------------------------
    // State
    // -------------------------

    const [leads, setLeads] = useState([]);
    const [isAddLeadOpen, setIsAddLeadOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [selectedLead, setSelectedLead] = useState(null);
    const [isEditLeadOpen, setIsEditLeadOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);


    // -------------------------
    // GET /api/leads
    // -------------------------

    useEffect(() => {
        const loadLeads = async () => {
            try {
                const data = await getLeads();

                const formattedLeads = data.map((lead) => ({
                    id: lead._id,
                    name: lead.name,
                    company: lead.company || "",
                    email: lead.email,
                    phone: lead.phone || "",
                    status: lead.status
                        ? lead.status.charAt(0).toUpperCase() +
                          lead.status.slice(1)
                        : "New",
                    interest: lead.interestLevel
                        ? lead.interestLevel.charAt(0).toUpperCase() +
                          lead.interestLevel.slice(1)
                        : "Unknown"
                }));

                setLeads(formattedLeads);
            } catch (error) {
                console.error("Error loading leads:", error);
            }
        };

        loadLeads();
    }, []);


    // -------------------------
    // POST /api/leads
    // -------------------------

    const handleAddLead = async (newLead) => {
        try {
            const createdLead = await createLead(newLead);

            const formattedLead = {
                id: createdLead._id,
                name: createdLead.name,
                company: createdLead.company || "",
                email: createdLead.email,
                phone: createdLead.phone || "",
                status: createdLead.status
                    ? createdLead.status.charAt(0).toUpperCase() +
                      createdLead.status.slice(1)
                    : "New",
                interest: createdLead.interestLevel
                    ? createdLead.interestLevel.charAt(0).toUpperCase() +
                      createdLead.interestLevel.slice(1)
                    : "Unknown"
            };

            setLeads((currentLeads) => [
                formattedLead,
                ...currentLeads
            ]);

            setIsAddLeadOpen(false);
        } catch (error) {
            console.error("Error creating lead:", error);
        }
    };

const handleEditLead = async (updatedLead) => {
    try {
        const updated = await updateLead(
            updatedLead.id,
            {
                name: updatedLead.name,
                email: updatedLead.email,
                phone: updatedLead.phone,
                company: updatedLead.company,
                status: updatedLead.status.toLowerCase(),
                interestLevel: updatedLead.interest?.toLowerCase()
            }
        );

        const formattedLead = {
            id: updated._id,
            name: updated.name,
            company: updated.company || "",
            email: updated.email,
            phone: updated.phone || "",
            status: updated.status
                ? updated.status.charAt(0).toUpperCase() +
                  updated.status.slice(1)
                : "New",
            interest: updated.interestLevel
                ? updated.interestLevel.charAt(0).toUpperCase() +
                  updated.interestLevel.slice(1)
                : "Unknown"
        };

        setLeads((currentLeads) =>
            currentLeads.map((lead) =>
                lead.id === formattedLead.id
                    ? formattedLead
                    : lead
            )
        );

        setSelectedLead(formattedLead);
        setIsEditLeadOpen(false);

    } catch (error) {
        console.error("Error updating lead:", error);
    }
};
const handleDeleteLead = async () => {
    try {
        await deleteLead(selectedLead.id);

        setLeads((currentLeads) =>
            currentLeads.filter(
                (lead) => lead.id !== selectedLead.id
            )
        );

        setSelectedLead(null);
        setIsDeleteOpen(false);

    } catch (error) {
        console.error("Error deleting lead:", error);
    }
};

    const filteredLeads = leads.filter((lead) => {
        const searchText = search.toLowerCase();

        const matchesSearch =
            lead.name.toLowerCase().includes(searchText) ||
            lead.company.toLowerCase().includes(searchText) ||
            lead.email.toLowerCase().includes(searchText);

        const matchesStatus =
            statusFilter === "All" ||
            lead.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

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
        <div className="space-y-6">

            {/* Header */}

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div>
                    <h1 className="text-2xl font-bold text-slate-900">
                        Leads
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">
                        Manage and track your customer leads.
                    </p>
                </div>

                <button
                    onClick={() => setIsAddLeadOpen(true)}
                    className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700"
                >
                    + Add Lead
                </button>

            </div>


            {/* Leads Card */}

            <div className="rounded-xl border border-slate-200 bg-white shadow-sm">

                {/* Filters */}

                <div className="flex flex-col gap-4 border-b border-slate-200 p-5 lg:flex-row lg:items-center lg:justify-between">

                    {/* Search */}

                    <div className="relative w-full lg:max-w-md">

                        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                            ⌕
                        </span>

                        <input
                            type="text"
                            placeholder="Search leads..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                        />

                    </div>


                    {/* Status Filter */}

                    <div className="flex items-center gap-2">

                        <span className="text-sm text-slate-500">
                            Status:
                        </span>

                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        >
                            <option value="All">All</option>
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Replied">Replied</option>
                        </select>

                    </div>

                </div>


                {/* Lead Count */}

                <div className="border-b border-slate-100 px-5 py-3">

                    <p className="text-xs text-slate-500">
                        Showing{" "}
                        <span className="font-medium text-slate-700">
                            {filteredLeads.length}
                        </span>{" "}
                        of{" "}
                        <span className="font-medium text-slate-700">
                            {leads.length}
                        </span>{" "}
                        leads
                    </p>

                </div>


                {/* Table */}

                <div className="overflow-x-auto">

                    <table className="w-full min-w-[900px] text-left">

                        <thead className="bg-slate-50">

                            <tr className="border-b border-slate-200">

                                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                    Lead
                                </th>

                                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                    Contact
                                </th>

                                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                    Status
                                </th>

                                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                    Interest
                                </th>

                                <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                                    Action
                                </th>

                            </tr>

                        </thead>


                        <tbody className="divide-y divide-slate-100">

                            {filteredLeads.map((lead) => (

                                <tr
                                    key={lead.id}
                                    className="transition hover:bg-slate-50"
                                >

                                    {/* Lead */}

                                    <td className="px-5 py-4">

                                        <div className="flex items-center gap-3">

                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-semibold text-blue-600">
                                                {lead.name.charAt(0)}
                                            </div>

                                            <div>
                                                <p className="text-sm font-medium text-slate-900">
                                                    {lead.name}
                                                </p>

                                                <p className="mt-0.5 text-xs text-slate-500">
                                                    {lead.company}
                                                </p>
                                            </div>

                                        </div>

                                    </td>


                                    {/* Contact */}

                                    <td className="px-5 py-4">

                                        <p className="text-sm text-slate-700">
                                            {lead.email}
                                        </p>

                                        <p className="mt-0.5 text-xs text-slate-400">
                                            {lead.phone}
                                        </p>

                                    </td>


                                    {/* Status */}

                                    <td className="px-5 py-4">

                                        <span
                                            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${getStatusStyle(
                                                lead.status
                                            )}`}
                                        >
                                            {lead.status}
                                        </span>

                                    </td>


                                    {/* Interest */}

                                    <td className="px-5 py-4">

                                        <span
                                            className={`text-sm font-medium ${getInterestStyle(
                                                lead.interest
                                            )}`}
                                        >
                                            {lead.interest}
                                        </span>

                                    </td>


                                    {/* Action */}

                                    <td className="px-5 py-4 text-right">

                                       <button
    onClick={() => setSelectedLead(lead)}
    className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
>
    View
</button>
                                    </td>

                                </tr>

                            ))}


                            {/* Empty State */}

                            {filteredLeads.length === 0 && (

                                <tr>

                                    <td
                                        colSpan="5"
                                        className="px-5 py-12 text-center"
                                    >

                                        <div className="text-3xl">
                                            🔍
                                        </div>

                                        <p className="mt-3 text-sm font-medium text-slate-700">
                                            No leads found
                                        </p>

                                        <p className="mt-1 text-xs text-slate-400">
                                            Try changing your search or filter.
                                        </p>

                                    </td>

                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>

            </div>


            {/* Add Lead Modal */}

            <AddLeadModal
    isOpen={isAddLeadOpen}
    onClose={() => setIsAddLeadOpen(false)}
    onAddLead={handleAddLead}
/>
<ViewLeadModal
    lead={selectedLead}
    isOpen={selectedLead !== null}
    onClose={() => setSelectedLead(null)}
    onEdit={() => {
        setIsEditLeadOpen(true);
    }}
    onDelete={() => {
        setIsDeleteOpen(true);
    }}
/>
<EditLeadModal
    lead={selectedLead}
    isOpen={isEditLeadOpen}
    onClose={() => setIsEditLeadOpen(false)}
    onSave={handleEditLead}
/>
<ConfirmDeleteModal
    isOpen={isDeleteOpen}
    lead={selectedLead}
    onClose={() => setIsDeleteOpen(false)}
    onConfirm={handleDeleteLead}
/>
        </div>
    );
};

export default Leads;