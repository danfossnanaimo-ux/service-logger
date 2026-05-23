// Capture ?user=NAME from install link
const urlParams = new URLSearchParams(window.location.search);
const incomingUser = urlParams.get("user");

if (incomingUser) {
  localStorage.setItem("dfnaUser", incomingUser);
}

// Replace with your deployed Apps Script URL
const API_BASE = "https://script.google.com/macros/s/AKfycbyX5D2M127vHmKaVzgKoBRQIMhTs-aiEzUAYTmrwc8GASqujHmV7GkIjVle94utALOkUQ/exec";

document.getElementById("continueBtn").addEventListener("click", async () => {
  const vin = document.getElementById("vinInput").value.trim();

  if (vin.length < 5) {
    alert("Please enter a valid VIN.");
    return;
  }

  // TODO: Replace with real lookup if needed
  // For now, extract van number from VIN sheet or mapping
  const vanNumber = await lookupVanNumber(vin);

  if (!vanNumber) {
    alert("VIN not found in fleet.");
    return;
  }

  window.location.href = `details.html?vin=${encodeURIComponent(vin)}&van=${encodeURIComponent(vanNumber)}`;
});

// Example VIN → van number lookup
async function lookupVanNumber(vin) {
  // Replace with your own lookup logic or endpoint
  const map = {
    "1FTBR2C86RKB36694": "603",
    "1FTYR2CM4HKB44671": "214"
  };

  return map[vin] || null;
}
