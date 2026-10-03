const StatCard = ({
    title,
    value,
    description,
    icon,
    iconBg,
    iconColor
}) => {
    return (
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow">

            <div className="flex items-start justify-between">

                <div>
                    <p className="text-sm font-medium text-slate-500">
                        {title}
                    </p>

                    <h2 className="mt-2 text-3xl font-bold text-slate-900">
                        {value}
                    </h2>
                </div>

                <div
                    className={`flex h-11 w-11 items-center justify-center rounded-lg ${iconBg} ${iconColor}`}
                >
                    <span className="text-xl">
                        {icon}
                    </span>
                </div>

            </div>

            <p className="mt-4 text-xs text-slate-500">
                {description}
            </p>

        </div>
    );
};

export default StatCard;