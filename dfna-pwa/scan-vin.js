// Capture ?user=NAME from install link
const params = new URLSearchParams(window.location.search);
const incomingUser = params.get("user");
const scannedVIN = params.get("vin");

// Store user if provided
if (incomingUser) {
  localStorage.setItem("dfnaUser", incomingUser);
}

// Auto-fill VIN if scanned
if (scannedVIN) {
  document.getElementById("vinInput").value = scannedVIN;
}

document.getElementById("continueBtn").addEventListener("click", async () => {
  const vin = document.getElementById("vinInput").value.trim();

  if (vin.length < 5) {
    alert("Please enter a valid VIN.");
    return;
  }

  // TODO: Replace with real lookup
  const vanNumber = await lookupVanNumber(vin);

  if (!vanNumber) {
    alert("VIN not found in fleet.");
    return;
  }

  window.location.href = `details.html?vin=${encodeURIComponent(vin)}&van=${encodeURIComponent(vanNumber)}`;
});

// Example VIN → van number lookup
async function lookupVanNumber(vin) {
  const map = {
    "1FTBR2C86RKB36694": "603",
    "1FTYR2CM4HKB44671": "214"
  };

  return map[vin] || null;
}
