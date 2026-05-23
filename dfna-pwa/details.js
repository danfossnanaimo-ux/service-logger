const API_BASE = "https://script.google.com/macros/s/AKfycbyX5D2M127vHmKaVzgKoBRQIMhTs-aiEzUAYTmrwc8GASqujHmV7GkIjVle94utALOkUQ/exec";  // Replace with deployed URL

// Load locations from backend
async function loadLocations() {
  const res = await fetch(`${API_BASE}?action=locations`);
  const data = await res.json();

  const select = document.getElementById("location");
  select.innerHTML = "";

  data.locations.forEach(loc => {
    const opt = document.createElement("option");
    opt.value = loc;
    opt.textContent = loc;
    select.appendChild(opt);
  });
}

// Validation rules
function validateForm() {
  const status = document.getElementById("status").value;
  const notes = document.getElementById("notes").value.trim();
  const user = document.getElementById("user").value.trim();
  const location = document.getElementById("location").value;

  if (!user) {
    alert("User is required.");
    return false;
  }

  if (!status) {
    alert("Status is required.");
    return false;
  }

  if (!location) {
    alert("Location is required.");
    return false;
  }

  if (status !== "In Service" && notes.length === 0) {
    alert("A reason is required when the vehicle is not in service.");
    return false;
  }

  return true;
}

// Submit handler
document.getElementById("logForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!validateForm()) return;

  const payload = {
    vin: document.getElementById("vin").value,
    vanNumber: document.getElementById("vanNumber").value,
    user: document.getElementById("user").value.trim(),
    status: document.getElementById("status").value,
    location: document.getElementById("location").value,
    notes: document.getElementById("notes").value.trim()
  };

  const res = await fetch(API_BASE, {
    method: "POST",
    body: JSON.stringify(payload)
  });

  const data = await res.json();

  if (data.success) {
    alert("Entry logged successfully.");
    window.location.href = "scan-vin.html";
  } else {
    alert("Error: " + data.error);
  }
});

// Initialize
loadLocations();
