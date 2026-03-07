import React, { useEffect } from "react";
import { useAdminStore } from "../../store/useAdminStore";
import { Button } from "../../components/ui/button";

const ProviderRequests = () => {
    const {
        providers,
        providersLoading,
        loadProviders,
        approveProvider,
        rejectProvider
    } = useAdminStore();

    useEffect(() => {
        loadProviders();
    }, []);

    const handleApprove = async (id) => {
        await approveProvider(id);
    };

    const handleReject = async (id) => {
        const reason = prompt("Enter rejection reason:");
        await rejectProvider(id, reason);
    };

    if (providersLoading) return <p>Loading providers...</p>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-6">Provider Requests</h2>

            <table className="w-full border border-gray-200">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="p-3 text-left">Name</th>
                        <th className="p-3 text-left">Email</th>
                        <th className="p-3 text-left">Category</th>
                        <th className="p-3 text-left">Experience</th>
                        <th className="p-3 text-left">Base Price</th>
                        <th className="p-3 text-left">Status</th>
                        <th className="p-3 text-left">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {providers.map((provider) => (
                        <tr key={provider._id} className="border-t">
                            <td className="p-3">{provider.userId?.fullName}</td>
                            <td className="p-3">{provider.userId?.email}</td>
                            <td className="p-3">{provider.categoryId?.name}</td>
                            <td className="p-3">{provider.experienceYears} yrs</td>
                            <td className="p-3">₹{provider.basePrice}</td>
                            <td className="p-3">{provider.approvalStatus}</td>

                            <td className="p-3 flex gap-2">
                                {provider.approvalStatus === "PENDING" && (
                                    <>
                                        <Button
                                            onClick={() => handleApprove(provider._id)}
                                        >
                                            Approve
                                        </Button>

                                        <Button
                                            variant="destructive"
                                            onClick={() => handleReject(provider._id)}
                                        >
                                            Reject
                                        </Button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {providers.length === 0 && (
                <p className="mt-4 text-gray-500">No provider requests found.</p>
            )}
        </div>
    );
};

export default ProviderRequests;