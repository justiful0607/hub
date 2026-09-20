// src/api.js
const API_URL = "http://localhost:5000/api";

// Fetch patient by ID
export async function getStoredPatient(id) {
  try {
    const res = await fetch(`${API_URL}/patients/${id}`);
    if (!res.ok) throw new Error("Failed to fetch patient");
    return await res.json();
  } catch (error) {
    console.warn("CareHub: unable to fetch patient. Using demo data.", error);
    return DEFAULT_PATIENT; // fallback
  }
}

// Save patient record
export async function saveStoredPatient(patient) {
  try {
    const res = await fetch(`${API_URL}/patients/${patient._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patient),
    });
    if (!res.ok) throw new Error("Failed to save patient");
    const updated = await res.json();

    // Notify UI that patient data changed
    window.dispatchEvent(new CustomEvent("carehub:patient-updated", { detail: updated }));
    return updated;
  } catch (error) {
    console.error("CareHub: unable to save patient record.", error);
    return null;
  }
}
