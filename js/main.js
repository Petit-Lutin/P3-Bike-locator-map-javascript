const burger = document.getElementById("burger");
const dropdown = document.getElementById("dropDown");
burger.addEventListener("pointerdown", (e) => {
    if (dropdown.style.display !== "none") {
        dropdown.style.display = "none"
    } else {
        dropdown.style.display = "block";
        dropdown.style.overflow = "visible";
    }
})