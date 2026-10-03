import StatCard from "../components/StatCard";
import { useEffect, useState } from "react";
import { getLeads } from "../services/leadService";

const Dashboard = () => {

    const [leads, setLeads] = useState([]);
    useEffect(() => {
    const loadLeads = async () => {
        try {
            const data = await getLeads();
            setLeads(data);
        } catch (error) {
            console.error("Error loading dashboard leads:", error);
        }
    };

    loadLeads();
}, []);
const totalLeads = leads.length;

const newLeads = leads.filter(
    (lead) => lead.status === "new"
).length;

const repliedLeads = leads.filter(
    (lead) => lead.status === "replied"
).length;

const humanAttentionLeads = leads.filter(
    (lead) => lead.requiresHumanAttention === true
).length;
const recentLeads = leads.slice(0, 4);
const upcomingFollowUps = leads
    .filter((lead) => lead.nextFollowUpAt)
    .sort(
        (a, b) =>
            new Date(a.nextFollowUpAt) -
            new Date(b.nextFollowUpAt)
    )
    .slice(0, 4);

 const stats = [
    {
        title: "Total Leads",
        value: totalLeads,
        description: "All leads in your CRM",
        icon: "👥",
        iconBg: "bg-blue-50",
        iconColor: "text-blue-600"
    },
    {
        title: "New Leads",
        value: newLeads,
        description: "Waiting to be contacted",
        icon: "✦",
        iconBg: "bg-violet-50",
        iconColor: "text-violet-600"
    },
    {
        title: "Replies",
        value: repliedLeads,
        description: "Customer responses",
        icon: "↩",
        iconBg: "bg-emerald-50",
        iconColor: "text-emerald-600"
    },
    {
        title: "Human Attention",
        value: humanAttentionLeads,
        description: "Leads requiring action",
        icon: "!",
        iconBg: "bg-amber-50",
        iconColor: "text-amber-600"
    }
];

   
    

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

    return (
        <div className="space-y-8">

            {/* Page Header */}

            <div>
                <h1 className="text-2xl font-bold text-slate-900">
                    Dashboard
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                    Here's what's happening with your business.
                </p>
            </div>


            {/* Statistics */}

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

                {stats.map((stat) => (
                    <StatCard
                        key={stat.title}
                        {...stat}
                    />
                ))}

            </div>


            {/* Dashboard Activity */}

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">


                {/* Recent Leads */}

                <div className="rounded-xl border border-slate-200 bg-white shadow-sm">

                    <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">

                        <div>
                            <h2 className="text-base font-semibold text-slate-900">
                                Recent Leads
                            </h2>

                            <p className="mt-1 text-xs text-slate-500">
                                Latest activity from your leads
                            </p>
                        </div>

                        <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
                            View all
                        </button>

                    </div>


                    <div className="divide-y divide-slate-100">

                        {recentLeads.map((lead) => (

                            <div
                                key={lead.name}
                                className="flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition"
                            >

                                <div className="flex items-center gap-3">

                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-sm font-semibold text-blue-600">
                                        {lead.name.charAt(0)}
                                    </div>

                                    <div>
                                        <p className="text-sm font-medium text-slate-900">
                                            {lead.name}
                                        </p>

                                        <p className="text-xs text-slate-500">
                                            {lead.company}
                                        </p>
                                    </div>

                                </div>


                                <div className="flex items-center gap-4">

                                   <span
    className={`rounded-full px-2.5 py-1 text-xs font-medium ${getStatusStyle(
        lead.status.charAt(0).toUpperCase() + lead.status.slice(1)
    )}`}
>
    {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
</span>
<span className="hidden text-xs text-slate-400 sm:block">
    {new Date(lead.createdAt).toLocaleDateString()}
</span>

                                </div>

                            </div>

                        ))}

                    </div>

                </div>


                {/* Upcoming Follow-ups */}

                <div className="rounded-xl border border-slate-200 bg-white shadow-sm">

                    <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">

                        <div>
                            <h2 className="text-base font-semibold text-slate-900">
                                Upcoming Follow-ups
                            </h2>

                            <p className="mt-1 text-xs text-slate-500">
                                Scheduled customer follow-ups
                            </p>
                        </div>

                        <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
                            View all
                        </button>

                    </div>


                    <div className="divide-y divide-slate-100">

                        {upcomingFollowUps.map((followUp) => (

                            <div
                                key={followUp.name}
                                className="flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition"
                            >

                                <div className="flex items-center gap-3">

                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
                                        ◷
                                    </div>

                                    <div>
                                        <p className="text-sm font-medium text-slate-900">
                                            {followUp.name}
                                        </p>

                                        <p className="text-xs text-slate-500">
                                            {followUp.company}
                                        </p>
                                    </div>

                                </div>


                                <div className="text-right">

                                    <p className="text-sm font-medium text-slate-700">
    {new Date(followUp.nextFollowUpAt).toLocaleDateString()}
</p>

<p className="text-xs text-slate-400">
    {new Date(followUp.nextFollowUpAt).toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit"
    })}
</p>

                                </div>

                            </div>

                        ))}

                    </div>

                </div>

            </div>

        </div>
    );
};

export default Dashboard;