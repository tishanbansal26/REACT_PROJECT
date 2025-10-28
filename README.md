# CORELINE - React E-Commerce Application

A modern e-commerce application for CORELINE T-shirts built with React, Firebase Authentication, and Bootstrap.

## Features

- **Product Catalog**: Browse our collection of premium T-shirts
- **Shopping Cart**: Add items to cart with persistent storage
- **User Authentication**: Sign up and log in with Firebase
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Checkout Process**: Complete order flow with shipping information

## Tech Stack

- **React 18.2**: Frontend framework
- **React Router v6**: Client-side routing
- **Firebase**: Authentication and potential database
- **Bootstrap 5.3**: UI components and styling
- **Context API**: State management for cart and authentication

## Project Structure

```
COORELINE/
├── public/
│   ├── index.html
│   ├── CORELINE.png (logo)
│   └── Aug_22__1639_15s_202508221701_ah42s.mp4 (background video)
├── src/
│   ├── components/
│   │   ├── Navbar.js
│   │   ├── Footer.js
│   │   ├── Home.js
│   │   ├── About.js
│   │   ├── Shop.js
│   │   ├── Contact.js
│   │   ├── Cart.js
│   │   ├── Checkout.js
│   │   └── Auth.js
│   ├── contexts/
│   │   ├── AuthContext.js
│   │   └── CartContext.js
│   ├── firebase/
│   │   └── config.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
└── package.json
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Configure Firebase:
   - Open `src/firebase/config.js`
   - Replace the placeholder Firebase configuration with your actual Firebase project credentials:
```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID"
};
```

3. Start the development server:
```bash
npm start
```

The application will open in your browser at `http://localhost:3000`

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## Key Components

- **AuthContext**: Manages user authentication state
- **CartContext**: Handles shopping cart operations
- **Navbar**: Navigation with cart count display
- **Home**: Landing page with featured products
- **Shop**: Complete product catalog
- **Cart**: View and manage cart items
- **Checkout**: Order completion flow
- **Auth**: Login/Signup component

## Features Implemented

✅ Component-based architecture
✅ React Router for navigation
✅ Context API for state management
✅ Firebase Authentication integration
✅ Persistent cart storage with localStorage
✅ Responsive Bootstrap design
✅ Form handling for checkout and contact

## Future Enhancements

- [ ] Connect to Firebase Firestore for product data
- [ ] Implement payment gateway integration
- [ ] Add product search and filtering
- [ ] User order history
- [ ] Product reviews and ratings
- [ ] Admin dashboard for inventory management

## License

© 2025 CORELINE. All Rights Reserved.
