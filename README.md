# FLAD-Mentorship app

FLAD Mentorship helps to link people to participate as a mentor or a mentee in the program [Let's talk about business](https://www.flad.pt/en/lets-talk-about-business/) from the Luso-American Development Foundation.

## Development Notes

FLAD-Mentorship app was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). The project uses the Firebase Realtime Database and Storage as a backend, so it requires no server-side code or SQL queries.

## To build the application

The first step is to clone this repository in your local machine and then, open a terminal and cd into the project directory

### 1. run `npm install`

This command will install all the necessary dependencies. [Material-ui](https://github.com/mui-org/material-ui), [firebase](https://github.com/firebase/), [react-to-print](https://www.npmjs.com/package/react-to-print) and [ramda](https://github.com/ramda/ramda) are some of them.

The file package.json contains the complete list of dependencies for this project.

### 2. Create a project in Firebase

In order to try this app you may create a new project in the Firebase Console. You can create a free account (here) [https://console.firebase.google.com/]

### 3. Enable Email/Password as authentication method in your Firebase project

This step is important in order to be able to create accounts in your Firebase project and try the functionality available for the different roles of the program: mentor, mentee and coordinator.

To enable Email/Password as authentication method in your Firebase project:

- Go to the [Firebase console](https://console.firebase.google.com/), open the Auth section.
- On the Sign in method tab, enable the Email/password sign-in method and click Save.

### 4. Create a folder for images

Next you will need to create a folder to storage the pictures of the mentors participating in FLAD-Mentorship program.

- Go to the [Firebase console](https://console.firebase.google.com/), open the Storage section.
- On the Files tab, click in the icon "create folder".
- Name your new folder **images**

### 5. Set the environment variables

Once you have created your project in Firebase, create manually the file .env.production in the root of your project. Type the keys generated to connect to your database as follow:

`REACT_APP_API_KEY = "your-api-key"`

`REACT_APP_AUTH_DOMAIN = "your-auth-domain"`

`REACT_APP_DATABASE_URL = "your-database-url"`

`REACT_APP_PROJECT_ID = "your-project-id"`

`REACT_APP_STORAGE_BUCKET = "your-storage-bucket"`

`REACT_APP_MESSAGING_SENDER_ID = "your-messaging-sender-id"`

### 6. Run `npm start`

This command runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### 7. Run `npm run build`

This command builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

## Contributors

- [Perla Jarillo](https://github.com/perlajarillo)
- [Fabiola Vieyra](https://github.com/Fa-v)

## Contributor Guidelines

If you're looking for a place to start contributing code, check out this list of [issues](https://github.com/perlajarillo/flad-mentorship/labels/help%20wanted) that are ready for someone to pick up and start on. The process to contribute in this repository is:

1. Comment on the issue that you're going to be working on it. This will help us to avoid work duplication.
2. Fork the repository.
3. Start coding.
4. Make a PR when you are ready.
5. A member of FLAD-Mentorship app will review your contribution and ask for any necessary changes and/or approve and merge.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
