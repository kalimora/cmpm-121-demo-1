// Import the CSS for styling
import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;
const gameName = "Kitty Clicker";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const button = document.createElement("button");
button.innerHTML = "Pet Cat 🐱";
app.appendChild(button); // Adding the button to the 'app' element

let counter: number = 0; // Declare and initialize the counter
let growthRate: number = 0; // Default growth rate initialized to zero

const counterDisplay = document.createElement("div"); // Create a div for displaying the counter
const growthRateDisplay = document.createElement("div");
counterDisplay.innerHTML = `${counter} purrs`;
growthRateDisplay.innerHTML = `Growth Rate: ${growthRate} purrs/sec`;
app.append(counterDisplay); // Append the counter display to the app element
app.appendChild(growthRateDisplay);

let previousTime: number = performance.now();
let isActive: boolean = false;

function updateCount() {
  const currentTime = performance.now();
  const increment = (currentTime - previousTime) / 1000;
  counter += increment * growthRate;
  counterDisplay.innerHTML = `${Math.round(counter)} purrs`;
  previousTime = currentTime;
  requestAnimationFrame(updateCount);
}

const upgradeButton = document.createElement("button");
upgradeButton.innerHTML = "Increase Growth Rate (+1) - Cost 10 purrs";
upgradeButton.disabled = true;
app.appendChild(upgradeButton);

function updateShopButtons() {
  upgradeButton.disabled = counter < 10;
}

upgradeButton.addEventListener("click", () => {
  if (counter >= 10) {
    counter -= 10;
    growthRate += 1;
    growthRateDisplay.innerHTML = `Growth Rate: ${growthRate} purrs/sec`;
    updateShopButtons();
  }
});

button.addEventListener("click", () => {
  counter += 1;
  updateShopButtons();
  if (!isActive) {
    isActive = true;
    requestAnimationFrame(updateCount);
  }
});
