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
    { name: "Catnip", cost: 10, rate: 0.1, description: "Increases purrs by 0.1 per second." },
    { name: "Scratching Post", cost: 100, rate: 2, description: "Increases purrs by 2 per second." },
    { name: "Yarn Ball", cost: 1000, rate: 50, description: "Increases purrs by 50 per second." }
  ];

const button = document.createElement("button");
button.innerHTML = "Pet Cat 🐱";
app.appendChild(button); 

let counter: number = 0;
let totalGrowthRate: number = 0;
const counterDisplay = document.createElement("div");
const growthRateDisplay = document.createElement("div");
counterDisplay.innerHTML = `${counter} purrs`;
growthRateDisplay.innerHTML = `Growth Rate: ${totalGrowthRate} purrs/sec`;
app.appendChild(counterDisplay);
app.appendChild(growthRateDisplay);

let previousTime: number = performance.now();
let isActive: boolean = false;
const upgrades = new Array(availableItems.length).fill(0);

function updateCount() {
  const currentTime = performance.now();
  const increment = (currentTime - previousTime) / 1000;
  counter += increment * totalGrowthRate;
  counterDisplay.innerHTML = `${Math.round(counter)} purrs`;
  previousTime = currentTime;
  requestAnimationFrame(updateCount);
}

function updateShopButtons() {
  availableItems.forEach((item, index) => {
    const shopButton = document.getElementById(`shopButton-${index}`) as HTMLButtonElement;
    shopButton.disabled = Math.round(counter) < item.cost;
  });
}

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);
app.append(button);
app.append(growthRateDisplay);
app.append(counterDisplay);

availableItems.forEach((item, index) => {
  const shopButton = document.createElement("button");
  shopButton.innerHTML = `${item.name}: Cost ${item.cost} purrs`;
  shopButton.id = `shopButton-${index}`;
  shopButton.disabled = true;
  
  const itemCounterDiv = document.createElement("div");
  itemCounterDiv.innerHTML = `${item.name} owned: ${upgrades[index]}`;
  itemCounterDiv.id = `itemCounter-${index}`;
  app.appendChild(shopButton);
  app.appendChild(itemCounterDiv);

  shopButton.addEventListener("click", () => {
    if (counter >= item.cost) {
      counter -= item.cost;
      upgrades[index]++;
      totalGrowthRate += item.rate;
      item.cost = Math.round(item.cost * 1.15 * 1000) / 1000;  // Increase the cost for the next purchase
      shopButton.innerHTML = `${item.name}: Cost ${item.cost} purrs`;
      itemCounterDiv.innerHTML = `${item.name} owned: ${upgrades[index]}`;
      growthRateDisplay.innerHTML = `Growth Rate: ${totalGrowthRate} purrs/sec`;
      updateShopButtons();
    }
  });
});

button.addEventListener("click", () => {
  counter += 1;
  counterDisplay.innerHTML = `${Math.round(counter)} purrs`;
  updateShopButtons();
  if (!isActive) {
    isActive = true;
    requestAnimationFrame(updateCount);
  }
});
