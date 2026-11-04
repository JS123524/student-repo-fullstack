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

## Notes

- Each project includes its own `package.json` and `package-lock.json`.
- The `node_modules/` directories are excluded from Git using `.gitignore`.
