const bookingForm = document.querySelector("#booking-form");
const formSuccess = document.querySelector("#form-success");

bookingForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitButton = bookingForm.querySelector(".submit-button");

    submitButton.disabled = true;
    submitButton.textContent = "Sending...";

    const formData = new FormData(bookingForm);

    const data = Object.fromEntries(formData.entries());

    try {
        const response = await fetch("/api/booking", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error("Request failed");
        }

        bookingForm.style.display = "none";
        formSuccess.classList.add("active");

    } catch (error) {
        console.error(error);

        submitButton.disabled = false;
        submitButton.textContent = "Send inquiry →";

        alert("Something went wrong. Please try again.");
    }
});