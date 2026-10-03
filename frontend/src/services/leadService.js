const API_URL = "http://localhost:3000/api/leads";

export const getLeads = async () => {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error("Failed to fetch leads");
    }

    const data = await response.json();

    return data.leads;
};

export const createLead = async (leadData) => {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(leadData)
    });

    if (!response.ok) {
        throw new Error("Failed to create lead");
    }

    const data = await response.json();

    return data.lead;
};

export const updateLead = async (id, leadData) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(leadData)
    });

    if (!response.ok) {
        throw new Error("Failed to update lead");
    }

    const data = await response.json();

    return data.lead;
};

export const deleteLead = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });

    if (!response.ok) {
        throw new Error("Failed to delete lead");
    }

    const data = await response.json();

    return data.lead;
};