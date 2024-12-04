import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Kitty Clicker";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const button = document.createElement("button");
button.innerHTML = "Pet Cat 🐱";
app.appendChild(button); // Adding the button to the 'app' element instead of 'document.body'

let counter: number = 0;  // Initial counter value
const counterDisplay = document.createElement("div");  // Creating a div for displaying the counter
counterDisplay.innerHTML = `${counter} purrs`;  // Setting initial display text
app.appendChild(counterDisplay);  // Adding the counter display to the 'app' element

button.addEventListener("click", () => {
  counter += 1;  // Increment the counter by 1 each time the button is clicked
  counterDisplay.innerHTML = `${counter} purrs`;  // Update the display text with the new counter value
});