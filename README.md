# How to Run the Project

Follow the steps below to run the project locally.

## Step 1: Install Dependencies

Install all required packages:
npm install

## Step 2: Set Up Environment Variables

This project uses environment variables.

1. Copy the example environment file:
   cp .env.example .env

2. Open the `.env` file and update the values:
   GRQ_API=your_groq_api_key
   PORT=5000
   FROM_EMAIL=onboarding@resend.dev
   RESEND_API=your_resend_api_key

## Step 3: Start the Development Server

Run the project using:
npm run dev

The application will run on http://localhost:5000
