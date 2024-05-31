# Welcome to your Movie List app 👋

An app that provides movie information by displaying a list of films sourced from The Movie Database (TMDb) API. It features the top movies for each year, allows users to filter by genre, and offers smooth scrolling.
Built with React Native. 

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Download the Expo app on your mobile
   Access the below link, select the device which you have android or ios, scan the QR code and download the app
- [Expo Go](https://docs.expo.dev/get-started/set-up-your-environment/), a limited sandbox for trying out app development with Expo

3. Start the app

   **NOTE: Please make sure your laptop / PC and Mobile device is connected to the same wifi/network**

   ```bash
    npx expo start
   ```
   After running the above command, a QR code will be generated. Please scan the QR code and the app will start running on your device

## Features List

### Things covered
- [x] Display a list of movies from the TMDb API
- [x] Filter movies by genre
- [x] Smooth scrolling
- [x] Fetching subsequent year movies by scrolling to the bottom
- [x] Fetching previous year movies on refresh
- [x] Search Functionality with scrolling and fetching new movies 
- [x] Component Unit Test cases
- [x] Centralised Store using Zustand
- [x] Usage of TypeScript for enhanced type safety and code quality.
- [x] Implementation of this project in React Native

### Things which can be taken
- [ ] More Test Coverage, in terms of component and store testing
- [ ] Movie Detail Page providing more information of the movie
- [ ] Advanced search functionality
- [ ] Multiple Device compatibility testing

## Technologies Used

- [TypeScript](https://www.typescriptlang.org/): A typed superset of JavaScript that compiles to plain JavaScript.
- [React Native](https://reactnative.dev/): A framework for building native applications using React.
- [Zustand](https://github.com/pmndrs/zustand): A small, fast and scaleable state management library for React.
- [Axios](https://axios-http.com/): A promise-based HTTP client for making HTTP requests in the browser and Node.js.
- [Expo](https://expo.dev/): A framework and platform for universal React applications.
- [Jest](https://jestjs.io/): A delightful JavaScript testing framework with a focus on simplicity.
- [react-test-renderer](https://reactjs.org/docs/test-renderer.html): A package that provides a React renderer that can be used to render React components to pure JavaScript objects.

