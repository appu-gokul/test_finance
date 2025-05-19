# FinTrack - MERN Stack Finance Tracker

A modern, responsive finance management application built with the MERN stack (MongoDB, Express, React, Node.js).

## Features

- **Dashboard**: Get a quick overview of your finances with charts and key metrics
- **Transaction Management**: Track your income and expenses with detailed categorization
- **Budget Planning**: Set up budgets for different categories and track your spending
- **Interactive Reports**: Visualize your financial data with beautiful charts and graphs
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Dark Mode Support**: Choose between light and dark themes

## Technology Stack

- **Frontend**:
  - React with TypeScript
  - Tailwind CSS for styling
  - Recharts for data visualization
  - React Router for navigation
  - React Hook Form for form handling

- **Backend**:
  - Node.js with Express
  - MongoDB with Mongoose for data storage
  - RESTful API architecture

## Setup and Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file based on `.env.example` with your MongoDB connection string
4. Start the development server:
   ```
   npm run dev:all
   ```

## Development Mode

To run both the frontend and backend in development mode:

```
npm run dev:all
```

This will start the Vite development server for the frontend and the Node.js server for the backend using concurrently.

## Future Enhancements

- User authentication and profiles
- Mobile app using React Native
- Email notifications for budget alerts
- Data export to CSV/PDF
- Bank account integration

## License

This project is licensed under the MIT License.