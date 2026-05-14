
let selectedSlot = null;

function selectSlot(slot){
    // Remove previous selection
    if(selectedSlot){
        selectedSlot.classList.remove("selected");
    }

    // Select new slot
    slot.classList.add("selected");
    selectedSlot = slot;
}
function confirmBooking() {

    if (!selectedSlot) {
        alert("Please select a slot");
        return;
    }

    const user = JSON.parse(localStorage.getItem("user"));
    const lot = localStorage.getItem("parkingLot");

    // 🔥 STEP 2 (get vehicle)
    const vehicleType = document.querySelector('input[name="vehicle"]:checked').value;

    // 🔥 STEP 3 (store it)
    localStorage.setItem("vehicleType", vehicleType);

    fetch("http://localhost:3000/bookings", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
       body: JSON.stringify({
    user_email: user.email,
    lot_name: lot,
    slot_number: selectedSlot,
    vehicle_type: vehicleType,   // 🔥 ADD THIS LINE
    date: new Date().toISOString().split('T')[0],
    time: "1 hour"
})
    })
    .then(res => res.json())
    .then(data => {

        if(data && data.success){

            localStorage.setItem("ticket", JSON.stringify(data.booking));

            window.location.href = "payment.html";
        }

    })
    .catch(err => console.error(err));
}