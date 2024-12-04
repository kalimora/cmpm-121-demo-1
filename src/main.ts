// Import the CSS for styling
import "./style.css";

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
    { name: "Catnip", cost: 10, rate: 0.1, description: "A bit of catnip increases purrs by 0.1 per second." },
    { name: "Scratching Post", cost: 100, rate: 2, description: "A scratching post increases purrs by 2 per second." },
    { name: "Yarn Ball", cost: 1000, rate: 50, description: "A yarn ball increases purrs by 50 per second." },
    { name: "Pet Orange Cat", cost: 5000, rate: 100, description: "You notice that more cats are beginning to surround you, which increases purrs by 75 per second." },
    { name: "Pet Black Cat", cost: 10000, rate: 250, description: "The mystical Black Cat appears, significantly boosting purrs by 200 per second." }
  ];

// Main button to simulate cat petting
const mainButton = document.createElement("button");
mainButton.innerHTML = "Pet the Cat 🐾"; // Changed emoji to a paw print
app.appendChild(mainButton);

let counter: number = 0;
const counterDisplay = document.createElement("div");
const growthRateDisplay = document.createElement("div");

mainButton.addEventListener("click", () => {
  counter += 1;
  counterDisplay.innerHTML = `${Math.round(counter)} purrs`; // Now clearly labelled as "purrs"
  updateShopButtons();
});

counterDisplay.innerHTML = `${counter} purrs`;

let previousTime: number = performance.now();
let isActive: boolean = false;

const upgrades = new Array(availableItems.length).fill(0);

function updateCount() {
  const currentTime = performance.now();
  const increment = (currentTime - previousTime) / 1000;
  availableItems.forEach((item, index) => {
    counter += increment * upgrades[index] * item.rate;
  });
  const growthRate = availableItems.reduce(
    (total, item, index) => total + upgrades[index] * item.rate,
    0,
  );
  growthRateDisplay.innerHTML = `Growth Rate: ${Math.round(growthRate * 10) / 10} purrs/sec`;
  counterDisplay.innerHTML = `${Math.round(counter)} purrs`;
  previousTime = currentTime;
  updateShopButtons();
  requestAnimationFrame(updateCount);
}

function updateShopButtons() {
  availableItems.forEach((item, index) => {
    const shopButton = document.getElementById(
      `shopButton-${index}`,
    ) as HTMLButtonElement;
    if (shopButton) {
      shopButton.disabled = Math.round(counter) < item.cost;
    }
  });
}

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);
app.append(mainButton);
app.append(growthRateDisplay);
app.append(counterDisplay);

// Dynamically creating buttons for each item
availableItems.forEach((item, index) => {
  const shopButton = document.createElement("button");
  shopButton.innerHTML = `${item.name}: ${item.cost} purrs`;
  shopButton.id = `shopButton-${index}`;
  shopButton.disabled = true;
  app.appendChild(shopButton);

  const descriptionDiv = document.createElement("div");
  descriptionDiv.innerHTML = item.description;
  descriptionDiv.style.fontStyle = "italic";
  app.appendChild(descriptionDiv);

  const upgradeDiv = document.createElement("div");
  upgradeDiv.id = `upgradeDiv-${index}`;
  upgradeDiv.innerHTML = `Number of ${item.name}: ${upgrades[index]}`;
  app.appendChild(upgradeDiv);

  shopButton.addEventListener("click", () => {
    if (counter >= item.cost) {
      counter -= item.cost;
      upgrades[index]++;
      item.cost = Math.round(item.cost * 1.15 * 1000) / 1000; // Increase the cost by a factor of 1.15
      shopButton.innerHTML = `${item.name}: ${item.cost} purrs`;
      upgradeDiv.innerHTML = `Number of ${item.name}: ${upgrades[index]}`;
      updateShopButtons();
    }
    if (!isActive) {
      isActive = true;
      requestAnimationFrame(updateCount);
    }
  });
});
