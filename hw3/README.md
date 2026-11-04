# HW3: Full Stack Frameworks and Libraries

## Tutorials

### 1. React

- Followed the [Tic-Tac-Toe Tutorial](https://react.dev/learn/tutorial-tic-tac-toe).
- Built an interactive Tic-Tac-Toe game using React.
- Implemented turn tracking, winner detection, and move history.

#### How to Run

Make sure Node.js and npm are installed.

From the repository root:

```bash
cd hw3/react
npm ci
npm run dev
```

Open the local URL displayed in the terminal.

### 2. Socket.IO

- Followed the [Basic Chat Application Tutorial](https://socket.io/get-started/chat).
- Built a real-time chat application using Node.js, Express, and Socket.IO.
- Implemented message broadcasting between connected clients.

#### How to Run

From the repository root:

```bash
cd hw3/socketio
npm ci
node index.js
```

Open `http://localhost:3000` in your browser.

Open multiple browser tabs to test real-time messaging between clients.

## Exercise: Rick and Morty API

- Built a React application using the [Rick and Morty API](https://rickandmortyapi.com/api/).
- Used React Router to implement four routes:
  - `/home` - Displays a welcome message and navigation links.
  - `/characters` - Displays the first 100 characters with their names, images, species, and status.
  - `/species` - Groups all characters by species, showing the character count and names for each species.
  - `/locations` - Groups all locations by type and displays the count for each type.
- Used the Fetch API to retrieve paginated data.
- Added loading states, error handling, and fallback values for missing data.

### How to Run

From the repository root:

```bash
cd hw3/rickandmorty
npm ci
npm run dev
```

Open the local URL displayed in the terminal.

Use the navigation links to explore the four routes.

## Notes

- Each project includes its own `package.json` and `package-lock.json`.
- The `node_modules/` directories are excluded from Git using `.gitignore`.
