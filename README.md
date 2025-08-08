📊 TradeHub - Virtual Trading & Learning Platform
Welcome to TradeHub, a modern web application that combines virtual trading, market education, and real-time charts — designed for beginners and intermediate traders to learn, simulate, and grow.

🛠️ Tech Stack
Frontend:

React.js

HTML, CSS, JavaScript

Tailwind CSS / Custom Styling

Backend:

Node.js

Express.js

MongoDB (via MongoDB Compass & MongoDB Atlas)

Tools & APIs:

TradingView (Chart WebView)

Git & GitHub for version control

✨ Features
📚 Ebooks Section
Browse trading-related eBooks

View and download options

Admin panel to upload/remove eBooks

💬 Chat Support (Messenger)
Real-time chat between users and admin (Socket.io)

Emojis, theme switch (Dark/Light)

Admin dashboard to manage queries

📈 Live Charting
Real-time TradingView charts embedded via WebView

Clean UI with chart tools and search

Theme switch (Dark/Light)

🎮 Virtual Trading Simulator
₹10 lakh virtual capital

Equity, Options & Futures simulation

Reset balance, manage wishlist

Real-time market feel (like Frontpage app)

🎓 Trading Tutorials (Coming Soon — Contributions Welcome!)
Interactive tutorials on using TradingView

Video/GIF-based explanations

Quizzes to test your learning

Smooth UI transitions and Gilroy font

🚀 Getting Started
1️⃣ Clone the Repository
bash
Copy
Edit
git clone https://github.com/ajityadav8898/TradeHub.git
cd TradeHub
2️⃣ Install Dependencies
For Backend:
bash
Copy
Edit
cd backend-folder-name
npm install
For Frontend:
bash
Copy
Edit
cd frontend-folder-name
npm install
🖥 How to Run TradeHub (5 Terminals)
TradeHub has multiple frontend and backend servers that must run simultaneously.
Follow these steps carefully:

Terminal 1 — Login Backend Server (User Authentication)
powershell
Copy
Edit
cd Latest
cd LoginSignup
cd tradehub-backend
node server.js
Expected Output:

arduino
Copy
Edit
✅ Serving static files...
🚀 Login Server running on http://localhost:5000
✅ MongoDB connected successfully
Terminal 2 — Ebooks Frontend Server
powershell
Copy
Edit
cd tradehub-frontend
cd tradehub-frontend
npm start
Expected Output:

nginx
Copy
Edit
Starting the development server...
Compiled successfully!
Local: http://localhost:3000
Terminal 3 — Ebooks Backend Server
powershell
Copy
Edit
cd tradehub-backend
cd tradehub-backend
node server.js
Expected Output:

arduino
Copy
Edit
🚀 Ebooks Server running on http://localhost:5001
✅ MongoDB connected successfully
Terminal 4 — Chatbox Frontend Server (Contact Us / Support)
powershell
Copy
Edit
cd tradehub-chatbox
npm start
If prompted:

vbnet
Copy
Edit
Something is already running on port 3000.
Would you like to run the app on another port instead? ... yes
Expected Output:

nginx
Copy
Edit
Compiled successfully!
Local: http://localhost:3001
Terminal 5 — Chatbox Backend Server (Contact Us / Support)
powershell
Copy
Edit
cd tradehub-chatbox-backend
node server.js
Expected Output:

arduino
Copy
Edit
🚀 Chat Server running on port 5002
✅ MongoDB Connected Successfully!
💡 Tips:
Always start all backend servers first before running the frontends.

Use separate terminal windows for each command.

If ports are busy, stop other processes or change the port in the config file.

🗺 Architecture Diagram

flowchart TD
    subgraph Login_System[Login System]
        LBackend[Login Backend - Port 5000]
    end

    subgraph Ebooks[📚 Ebooks Module]
        EFrontend[Ebooks Frontend - Port 3000]
        EBackend[Ebooks Backend - Port 5001]
    end

    subgraph Chatbox[💬 Chat Support]
        CFrontend[Chatbox Frontend - Port 3001]
        CBackend[Chatbox Backend - Port 5002]
    end

    User[User's Browser] --> EFrontend
    User --> CFrontend
    User --> LBackend

    EFrontend --> EBackend
    CFrontend --> CBackend

    LBackend --> MongoDB[(MongoDB Database)]
    EBackend --> MongoDB
    CBackend --> MongoDB
🔐 Folder Structure (Example)
Copy
Edit
TradeHub/
├── tradehub-frontend/
├── tradehub-backend/
├── LiveChart/
├── dhan-trading-app/
├── tradehub-chatbox/
├── tradehub-chatbox-backend/
├── tradehub-tutorial/
└── README.md
📸 Screenshots
(Add screenshots here later by uploading images and pasting the links)

🤝 Contributing
Contributions are welcome!
If you'd like to fix a bug or add a feature, please fork the repo and submit a pull request.

📬 Contact
👨‍💻 Developer: Ajit Yadav
📧 Email: yajit8898@gmail.com

⭐ Don't forget to star this repo if you like it!

This diagram will render directly in GitHub because it uses Mermaid syntax.
When someone reads your README, they’ll instantly see how the 5 servers interact.

If you want, I can also add colored node styling to the diagram so backend and frontend boxes are visually distinct. That would make it even more readable.
