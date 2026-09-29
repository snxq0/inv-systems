const bookingForm = document.querySelector("#booking-form");
const formSuccess = document.querySelector("#form-success");

bookingForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(bookingForm);

    console.log(Object.fromEntries(formData));

    /*
        Здесь позже будет serverless endpoint.

        Например:

        const response = await fetch("/api/booking", {
            method: "POST",
            body: formData
        });
    */

    bookingForm.style.display = "none";
    formSuccess.classList.add("active");
});