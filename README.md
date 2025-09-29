
# VectorShift Project

This project consists of a React frontend and a Python backend. Follow the instructions below to get both services running locally.

## Prerequisites

-   Node.js and npm installed
    
-   Python 3.x and pip installed
    

## Getting Started

### 1. Backend Setup

First, let's get the backend server running.

1.  **Navigate to the backend directory:**
    
    ```
    cd backend
    
    ```
    
2.  **Install the required Python packages:** It's recommended to use a virtual environment.
    
    ```
    # Create and activate a virtual environment (optional but recommended)
    python -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    
    # Install dependencies
    pip install -r requirements.txt
    
    ```
    
3.  **Run the backend server:**
    
    ```
    uvicorn main:app --reload
    
    ```
    
    The backend server should now be running on `http://127.0.0.1:8000`.
    

### 2. Frontend Setup

Next, set up and run the React application.

1.  **Navigate to the frontend directory:** Open a new terminal window and run:
    
    ```
    cd frontend
    
    ```
    
2.  **Install npm packages:**
    
    ```
    npm install
    
    ```
    
    or if you use yarn:
    
    ```
    yarn install
    
    ```
    
3.  **Run the frontend application:**
    
    ```
    npm start
    
    ```
    
    or if you use yarn:
    
    ```
    yarn start
    
    ```
    
    The React development server will start, and your application should open automatically in your web browser at `http://localhost:3000`.
    

You should now have both the frontend and backend running on your local machine!
