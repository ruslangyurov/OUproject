# Trailer Tracking and Collaboration System

This project is a real-time trailer tracking and collaboration platform designed to improve visibility, communication, and productivity in a logistics environment. It is inspired by challenges observed in a real-world depot setting, and aims to digitalize and streamline trailer movement tracking.

## Features

**Real-Time Trailer Tracking**  
  Updates trailer locations live using Socket.io.
- **Collaborative Dashboard**  
  Users can view, update, and comment on trailer statuses.
- **Authentication System**  
  Role-based access using JWT for secure and personalized interactions.
- **Customizable Board Interface**  
  Move trailers between lanes, filter by type or status, and highlight key data.
- **Responsive UI**  
  Built with Material UI (MUI) for consistent, mobile-friendly user experience.

## Tech Stack

- **Frontend:** React, Material UI  
- **Backend:** Node.js, Express  
- **Database:** MongoDB with Mongoose  
- **Real-Time Communication:** Socket.io  
- **Authentication:** JWT


## Instalation

1. Clone the repository:
```bash
   git clone https://github.com/your-username/trailer-tracking-system.git
   cd trailer-tracking-system
   ```

2. Install dependencies:
- For the backend:
     ```bash
     cd server
     npm install
     ```
- For the frontend:
     ```bash
     cd client
     npm install
     ```
3. Set up environment variables:
Create a `.env` file in the `server` directory with the following:
```env
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_secret_key
   ```
4. Run the application:
- Start backend:
     ```bash
     npm run dev
     ```
- Start frontend (in another terminal):
     ```bash
     npm start
     ```

## Folder structure

```
/client      # React frontend
/server      # Node.js + Express backend
```

## Usage

1. **Login/Register** as a user.
2. **Track trailer movements in the yard** by filling in the relevant information .
3. **Collaborate** by assigning trailers to bays and updating statuses.
4. **Receive live updates** across all connected clients.

## Challenges

- Designing a real-time interface that updates smoothly across clients.
- Implementing role-based access securely.
- Modeling trailer and user data efficiently in MongoDB.


## Future Enhancements

- Mobile application (React Native).
- Email notifications and audit logs.
- Integration with depot management systems.





