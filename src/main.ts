import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Kitty Clicker";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const button = document.createElement("button");
button.innerHTML = "Pet Cat 🐱";
app.appendChild(button);  // Adding the button to the 'app' element

let counter: number = 0;  // Declare and initialize the counter
const counterDisplay = document.createElement("div");  // Create a div for displaying the counter
counterDisplay.innerHTML = `${counter} purrs`;  // Set initial display text
app.append(counterDisplay);  // Append the counter display to the app element

function updateShopButtons(): void {
}

// Set an interval to increment counter by 1 every second
setInterval(() => {
    counter += 1;  // Increment the counter
    counterDisplay.innerHTML = `${Math.round(counter)} purrs`;  // Update the display
    updateShopButtons();  // Call function to update shop buttons
}, 1000);  // Interval set to 1000 milliseconds (1 second)

// Add event listener to button for click events
button.addEventListener("click", () => {
    counter += 1;  // Increment the counter on click
    counterDisplay.innerHTML = `${Math.round(counter)} purrs`;  // Update the display
    updateShopButtons();  // Update shop buttons state if needed
});
