# Expo Firebase Database Fetch App

This is an Expo React Native application that fetches data from Firebase Firestore and displays various product categories and offers. The application shows categories and exclusive offers for products like microphones, headphones, and watches, with dynamic discount and price details.

## Features

- Fetches and displays data from Firebase Firestore for different product categories.
- Displays product categories in a horizontal list format.
- Shows exclusive offers in a card layout, including discounts and prices.
- Provides "Buy Now" links for users to purchase products via external links.
- Interactive card press feature to show detailed product information in an overlay.
- Firebase Firestore real-time updates using `onSnapshot`.

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/MasterBhuvnesh/Expo_Firebase_Database.git
   ```

2. **Navigate to the project directory**:

   ```bash
   cd Expo_Firebase_Database
   ```

3. **Install dependencies**:

   ```bash
   npm install
   ```

4. **Configure Firebase**:

   - Create a Firebase project by visiting [Firebase Console](https://console.firebase.google.com/).
   - Add Firebase to your Expo app by following [this guide](https://firebase.google.com/docs/web/setup).
   - Update your `firebaseconfig.js` file with the Firebase credentials.

5. **Start the application**:
   ```bash
   npx expo start
   ```

## Firebase Firestore Structure

- **products** collection: Contains product categories.
  - Fields: `image`, `name`
- **microphone** collection: Contains microphone products.
  - Fields: `image`, `name`, `price`, `discount`, `link`
- **headphone** collection: Contains headphone products.
  - Fields: `image`, `name`, `price`, `discount`, `link`
- **watch** collection: Contains watch products.
  - Fields: `image`, `name`, `price`, `discount`, `link`

## Components Overview

### `Fetch.js`

The main component that fetches data from Firestore and displays it in categories and offers sections.

- **Categories Section**: A `FlatList` displaying categories fetched from the Firestore `products` collection.
- **Exclusive Offers Section**: Displays microphone, headphone, and watch offers with a discount and price calculation.
- **Details Screen Overlay**: A modal view showing detailed information about a selected product.

### Styling

- The app uses `StyleSheet` to style the layout, including the main screen, category list, cards, and product details overlay.
- Fonts used include `PoppinsBold`, `PoppinsSemi`, and `Poppins`.

## Usage

- **Fetching Data**: The app uses Firestore's real-time updates with the `onSnapshot` method to fetch and display data from the collections.
- **Interacting with Products**: Users can tap on product cards to view more details. Pressing "Buy Now" opens the product link in a web browser.

## Dependencies

- **React Native**: For building the mobile app.
- **Firebase**: To handle Firestore for fetching product data.
- **Expo**: Provides the framework for building the app.

Install the required dependencies using:

```bash
npm install @react-native-firebase/app @react-native-firebase/firestore expo-linking
```

## Customization

You can modify the Firestore collection names and the fields used in the app to match your database structure. The component styles can also be adjusted to fit your UI/UX needs.

## Known Issues

- Ensure that Firebase is properly configured in your project. Missing Firebase credentials will cause errors during data fetching.
- If you encounter errors related to bundling or resolving modules, try running `expo start -c` to clear the cache.

### This part of the code is for fetching real-time data from a Firestore database in a React Native or React project and storing it in state variables. Let me break it down:

### 1. **State Variables:**

```js
const [users, setUsers] = useState([]);
const [microphone, setMicrophone] = useState([]);
const [headphone, setHeadphone] = useState([]);
const [watch, setWatch] = useState([]);
const [selectedItem, setSelectedItem] = useState(null);
```

- `users`, `microphone`, `headphone`, and `watch` are state variables used to store data from different Firestore collections.
- Each state variable has a corresponding `setState` function (`setUsers`, `setMicrophone`, etc.) to update the data.
- `selectedItem` is for handling user interaction with a specific item (e.g., when an item is clicked or selected).

### 2. **Firestore Collection References:**

```js
const listRef = firebase.firestore().collection("products");
const microphoneRef = firebase.firestore().collection("microphone");
const headphoneRef = firebase.firestore().collection("headphone");
const watchRef = firebase.firestore().collection("watch");
```

- These lines define references to different Firestore collections: `products`, `microphone`, `headphone`, and `watch`.
- `listRef`, `microphoneRef`, `headphoneRef`, and `watchRef` are used later to query and listen to the documents within these collections.

### 3. **`useEffect` Hook:**

The `useEffect` hook ensures that the Firestore data is fetched once when the component mounts, and it listens for real-time updates from Firestore.

Inside the `useEffect` function, there are four asynchronous functions for fetching data.

### 4. **Fetching Data:**

#### 4.1. **Fetching Users Data:**

```js
const fetchData = async () => {
  listRef.onSnapshot((QuerySnapshot) => {
    const users = [];
    QuerySnapshot.forEach((doc) => {
      const { image, name } = doc.data();
      users.push({ id: doc.id, image, name });
    });
    setUsers(users);
  });
};
```

- `listRef.onSnapshot` sets up a listener for real-time updates from the `products` collection.
- For every document (`doc`) retrieved in the snapshot (`QuerySnapshot`), it extracts `image` and `name` fields.
- The data is then stored in the `users` state array.

#### 4.2. **Fetching Microphone Data:**

```js
const fetchMicrophoneData = async () => {
  microphoneRef.onSnapshot((QuerySnapshot) => {
    const mics = [];
    QuerySnapshot.forEach((doc) => {
      const { image, name, price, discount, link } = doc.data();
      mics.push({ id: doc.id, image, name, price, discount, link });
    });
    setMicrophone(mics);
  });
};
```

- Similar to `fetchData`, `microphoneRef.onSnapshot` listens to changes in the `microphone` collection.
- It retrieves `image`, `name`, `price`, `discount`, and `link` for each document.
- The data is stored in the `microphone` state variable.

#### 4.3. **Fetching Headphone Data:**

```js
const fetchHeadphoneData = async () => {
  headphoneRef.onSnapshot((QuerySnapshot) => {
    const phones = [];
    QuerySnapshot.forEach((doc) => {
      const { image, name, price, discount, link } = doc.data();
      phones.push({ id: doc.id, image, name, price, discount, link });
    });
    setHeadphone(phones);
  });
};
```

- This function fetches data from the `headphone` collection in the same way as before, storing it in the `headphone` state.

#### 4.4. **Fetching Watch Data:**

```js
const fetchWatchData = async () => {
  watchRef.onSnapshot((QuerySnapshot) => {
    const watchs = [];
    QuerySnapshot.forEach((doc) => {
      const { image, name, price, discount, link } = doc.data();
      watchs.push({ id: doc.id, image, name, price, discount, link });
    });
    setWatch(watchs);
  });
};
```

- This function fetches data from the `watch` collection and stores it in the `watch` state.

### 5. **Triggering the Fetch Functions:**

```js
fetchData();
fetchMicrophoneData();
fetchHeadphoneData();
fetchWatchData();
```

- These function calls trigger the data fetching from all four collections when the component mounts.

### Summary:

This code initializes state to hold data from multiple Firestore collections (`products`, `microphone`, `headphone`, and `watch`). It uses Firestore's `onSnapshot` method to listen for real-time changes and update the respective state arrays. Each function listens to its respective collection and updates the state as new data is received or when documents change in Firestore.
