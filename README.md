
# Introduction
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

We decided to publish the template we use to build many different apps and MVP. This template allows us to gain countless hours on the start of a new React project. 

If you find it useful, please consider staring the repos. 

If you find a bug, please open an issue and we'll look into it. Or even better: submit a Pull Request with a fix :-).

# What's included? 
The following tools and librairies are included:
- [React](https://reactjs.org/) - Reactive JavaScript framework.
- [Redux](https://redux.js.org/) - React data store management.
- [Redux Toolkit](https://redux-toolkit.js.org/) - Opinionated Redux management library.
- [Firebase SDK](https://firebase.google.com/) - Authentication, data storage and serverless functions. This basically acts as the backend.
- [Sentry SDK](https://sentry.io) - Automated errors logging. 
- [React-i18n](https://react.i18next.com/) - Translations. Default to French and English. 
- [Material-ui](https://material-ui.com/) - Design kit for React based on Google's Material design guidelines.


# How to start
## Prerequisites
### Firebase
This projet relies on Firebase for Users authentication. Before you start, you'll need to: 
1. Create a Firebase project.
2. Create a webb app in this project.
3. Enable Firebase hosting
4. Activate authentication by email and Google

### Sentry
This projcet relies on Sentry for errors reporting. Before you start, you'll need to create a Sentry project.

## Template
Copy this project as a template to start working on your own project

## Run locally 
1. Clone your new repository locally
2. Install the dependencies: $`npm install`
3. Update the configfile located at `src/config/config.js` to add your firebase config and Sentry connection link
3. Run the server: $`npm start`
4. Open in the brower: [http://localhost:3000](http://localhost:3000)

## Develop
Hot reload is activated on the developement server. Every change saved in the code will force an app reload and change will be available immediately.

### New page
To add a new page in the app, follow these steps:
1. Duplicate the `src/Template` or `src/Dashboard` folder. Template is a component using a state slice, Dashboard is a simple component with no global state. 
2. Rename the new folder, files and functions to make it match you new page name
3. If you choose to create a component with a global scope slice,update `src/app/store.js` to include the new store slice in the global store
4. Update `src/config/routes.js` to add a new route to match your preferences. 
5. Look at your browser: the new page appeared in the menu automagically.   

**Note:** If your new page is to appear in the navigation menu, update the translation file for every language in `/public/locales/` by adding the reference in the `navbar` object. See *Translations* for more details about the translations. 

### Style
To change the global styling and theme options (color palette, typography,...), update the files in `src/theme`  

**Note:** You'll find more about the theming options in [Material-UI's](https://material-ui.com/customization/theming/) documentation. 

### Translations
Translation files are located in `public/locales/` and organised in subfolders corresponding to the language code (e.g.: fr, en).  

To add a new language:
1. Add a new folder and copy the content of one of the already existing folders.
2. Translate the content of every file in your new folder.
3. Add your language to the array `LANGUAGES_LABELS` in `src/config/config.js`. The format is `{code: 'en', text: 'English'}`

# License
See LICENSE.md
