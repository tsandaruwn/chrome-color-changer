// Function to change the background color of the current tab
async function changeColor(color) {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab && tab.url && !tab.url.startsWith('chrome://')) {
        try {
            await chrome.scripting.executeScript({
                target: { tabId: tab.id },
                func: (color) => {
                    document.body.style.backgroundColor = color;
                },
                args: [color]
            });
        } catch (error) {
            console.error("Error executing script:", error);
        }
    } else {
      console.log("Cannot change color of chrome:// pages");
    }
}

// Add event listeners to the color buttons
document.getElementById("red").addEventListener("click", () => changeColor("#C599B6"));
document.getElementById("blue").addEventListener("click", () => changeColor("#9ACBD0"));
document.getElementById("green").addEventListener("click", () => changeColor("#00FF9C"));
document.getElementById("yellow").addEventListener("click", () => changeColor("#FFF574"));

// Reset the background color
document.getElementById("reset").addEventListener("click", () => changeColor("white"));