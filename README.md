# Calendar App

This is a sample calendar app developed with React and bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

We followed the principles below when building the application:

- Used `TypeScript` for type safety
- Followed the best practices of `React` and related libraries
- Followed a [BDD](https://dannorth.net/introducing-bdd/) process.
- Paid attention to the accessibility using AXE to check it.

## How to run

Before running any of the following scripts you need to run first to download all dependencies

`yarn install`

After that, in the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

## Main libraries

We used the following libraries to build the project:

- **Redux/Redux Toolkit:** Used to store and manage the application global state. We made the configuration of the store using the recommended `Redux Toolkit`.
- **Styled Components:** Used to create the style of our components
- **PopperJS:** Used to set the position for the dropdown
- **React Portal:** Wrapper to create a `React` Portal
