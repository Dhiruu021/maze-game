const mazeContainer = document.getElementById("maze");
const startButton = document.getElementById("startButton");
const congratulationsMessage = document.getElementById("congratulationsMessage");
const upButton = document.getElementById("upButton");
const downButton = document.getElementById("downButton");
const leftButton = document.getElementById("leftButton");
const rightButton = document.getElementById("rightButton");

const rows = 10;
const cols = 10;
let maze = [];
let playerPosition = { row: 0, col: 0 }; // Starting position of the player
let exitPosition = { row: 9, col: 9 }; // Exit position

// Generate maze grid with walls and empty spaces
function generateMaze() {
    maze = [];
    for (let row = 0; row < rows; row++) {
        const rowArray = [];
        for (let col = 0; col < cols; col++) {
            // Randomly place walls (1 is wall, 0 is empty space)
            rowArray.push(Math.random() < 0.2 ? 1 : 0);
        }
        maze.push(rowArray);
    }
    // Ensure player and exit positions are open
    maze[playerPosition.row][playerPosition.col] = 0;
    maze[exitPosition.row][exitPosition.col] = 0;
}

// Create the maze grid on the screen
function renderMaze() {
    mazeContainer.innerHTML = ''; // Clear previous maze
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            if (maze[row][col] === 1) {
                cell.classList.add("wall");
            }
            if (row === playerPosition.row && col === playerPosition.col) {
                cell.classList.add("player");
                cell.style.backgroundImage = `url("download.png")`;
                cell.style.backgroundSize = `cover`; // Use 'cover' to ensure the image covers the entire cell
                cell.style.backgroundPosition = `center center`; // Center the image both horizontally and vertically

            }
            if (row === exitPosition.row && col === exitPosition.col) {
                cell.classList.add("exit");
                cell.style.backgroundImage = `url("images.jpeg")`;
                cell.style.backgroundSize = `cover`; // Use 'cover' to ensure the image covers the entire cell
                cell.style.backgroundPosition = `center center`; // Center the image both horizontally and vertically
            }
            mazeContainer.appendChild(cell);
        }
    }
}

// Handle user input for player movement
function movePlayer(direction) {
    const { row, col } = playerPosition;

    switch (direction) {
        case "up":
            if (row > 0 && maze[row - 1][col] !== 1) {
                playerPosition.row--;
            }
            break;
        case "down":
            if (row < rows - 1 && maze[row + 1][col] !== 1) {
                playerPosition.row++;
            }
            break;
        case "left":
            if (col > 0 && maze[row][col - 1] !== 1) {
                playerPosition.col--;
            }
            break;
        case "right":
            if (col < cols - 1 && maze[row][col + 1] !== 1) {
                playerPosition.col++;
            }
            break;
    }

    // Re-render the maze after moving
    renderMaze();

    // Check if the player reached the exit
    if (playerPosition.row === exitPosition.row && playerPosition.col === exitPosition.col) {
        showCongratulations();
    }
}

// Show the congratulations message
function showCongratulations() {
    congratulationsMessage.style.display = "block"; // Show the message
}

// Start the game when the start button is clicked
startButton.addEventListener("click", () => {
    playerPosition = { row: 0, col: 0 };
    generateMaze();
    renderMaze();
    congratulationsMessage.style.display = "none"; // Hide congratulations message when the game starts
    
});

// Add event listeners for navigation buttons
upButton.addEventListener("click", () => movePlayer("up"));
downButton.addEventListener("click", () => movePlayer("down"));
leftButton.addEventListener("click", () => movePlayer("left"));
rightButton.addEventListener("click", () => movePlayer("right"));

generateMaze();
renderMaze();
