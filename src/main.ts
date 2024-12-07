// Import the CSS for styling
import "./style.css";

// Game constants to avoid magic numbers
const COST_SCALING_FACTOR = 1.15;
const INITIAL_COUNTER = 0;

const app: HTMLDivElement = document.querySelector("#app")!;
const gameName = "Kitty Clicker";
document.title = gameName;

interface Item {
  name: string;
  cost: number;
  rate: number;
  description: string;
}

const availableItems: Item[] = [
  {
    name: "Catnip",
    cost: 10,
    rate: 0.1,
    description: "A bit of catnip increases purrs by 0.1 per second.",
  },
  {
    name: "Scratching Post",
    cost: 100,
    rate: 2,
    description: "A scratching post increases purrs by 2 per second.",
  },
  {
    name: "Yarn Ball",
    cost: 1000,
    rate: 50,
    description: "A yarn ball increases purrs by 50 per second.",
  },
  {
    name: "Pet Orange Cat",
    cost: 5000,
    rate: 100,
    description:
      "You notice that more cats are beginning to surround you, which increases purrs by 75 per second.",
  },
  {
    name: "Pet Black Cat",
    cost: 10000,
    rate: 250,
    description:
      "The mystical Black Cat appears, significantly boosting purrs by 200 per second.",
  },
];

// Initialize counter and upgrades (Magic Numbers, Naming)
let counter: number = INITIAL_COUNTER; // Start with a clearly defined constant
let previousTime: number = performance.now();
let isActive: boolean = false;
const upgrades = new Array(availableItems.length).fill(0); // Initialize upgrades array

// Add cat image that was inspired by https://eltz36.github.io/cmpm-121-demo-1/
const catImage = document.createElement("img");
catImage.src = "/cmpm-121-demo-1/assets/catimage.jpg";
catImage.style.width = "300px"; // Adjust image size
catImage.style.display = "block"; // Center the image
catImage.style.margin = "10px auto"; // Add margin for spacing
app.append(catImage);

// Create UI components dynamically
const mainButton = document.createElement("button");
mainButton.innerHTML = "Pet the Cat 🐾";
const counterDisplay = document.createElement("div");
const growthRateDisplay = document.createElement("div");

// Header added above buttons (Better cognitive load ordering)
const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header, mainButton, growthRateDisplay, counterDisplay);

// Display initial values
counterDisplay.innerHTML = `${counter} purrs`;

// Update the growth rate display
function calculateGrowthRate(): number {
  return availableItems.reduce(
    (total, item, index) => total + upgrades[index] * item.rate,
    0,
  );
}

// Updates only the UI (Long Method)
function updateDisplay(): void {
  const growthRate = calculateGrowthRate();
  growthRateDisplay.innerHTML = `Growth Rate: ${Math.round(growthRate * 10) / 10} purrs/sec`;
  counterDisplay.innerHTML = `${Math.round(counter)} purrs`;
}

// Handles game logic (Long Method)
function updateGameLogic(deltaTime: number): void {
  availableItems.forEach((item, index) => {
    counter += deltaTime * upgrades[index] * item.rate;
  });
  updateDisplay();
}

// Animation loop (Splits concerns: Update Display vs. Logic)
function gameLoop(): void {
  const currentTime = performance.now();
  const deltaTime = (currentTime - previousTime) / 1000;
  previousTime = currentTime;

  updateGameLogic(deltaTime);
  requestAnimationFrame(gameLoop);
}

// Main button to simulate cat petting
mainButton.addEventListener("click", () => {
  counter++;
  updateDisplay();
  updateShopButtons(); // Ensure buttons are updated dynamically
  if (!isActive) {
    isActive = true;
    requestAnimationFrame(gameLoop);
  }
});

// Dynamically create shop UI and attach event listeners
availableItems.forEach((item, index) => {
  const shopButton = document.createElement("button");
  shopButton.id = `shopButton-${index}`;
  shopButton.innerHTML = `${item.name}: ${item.cost} purrs`;
  shopButton.disabled = true;

  const descriptionDiv = document.createElement("div");
  descriptionDiv.innerHTML = item.description;
  descriptionDiv.style.fontStyle = "italic";

  const upgradeDiv = document.createElement("div");
  upgradeDiv.id = `upgradeDiv-${index}`;
  upgradeDiv.innerHTML = `Number of ${item.name}: ${upgrades[index]}`;

  shopButton.addEventListener("click", () => {
    if (counter >= item.cost) {
      counter -= item.cost;
      upgrades[index]++;
      item.cost = Math.round(item.cost * COST_SCALING_FACTOR * 1000) / 1000; // Scaling cost
      shopButton.innerHTML = `${item.name}: ${item.cost} purrs`;
      upgradeDiv.innerHTML = `Number of ${item.name}: ${upgrades[index]}`;
      updateShopButtons();
    }
  });

  app.appendChild(shopButton);
  app.appendChild(descriptionDiv);
  app.appendChild(upgradeDiv);
});

// Updates shop buttons based on current purrs (Duplicate Logic)
function updateShopButtons(): void {
  availableItems.forEach((item, index) => {
    const shopButton = document.getElementById(
      `shopButton-${index}`,
    ) as HTMLButtonElement;
    if (shopButton) {
      shopButton.disabled = Math.round(counter) < item.cost;
    }
  });
}
