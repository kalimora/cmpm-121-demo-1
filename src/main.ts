import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Kitty Clicker";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const button = document.createElement("button");
button.innerHTML = "Pet Cat 🐱";
app.appendChild(button);  // Adding the button to the 'app' element instead of 'document.body'
