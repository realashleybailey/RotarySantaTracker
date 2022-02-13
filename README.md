<p align="center">
    <img src="https://user-images.githubusercontent.com/16636012/153734435-6d903cf5-f46f-48ad-8ea1-0cd45470d331.png"/>
</p>

# Rotary Santa Tracker
Simple Vue.js Application for hosting a tracking map to locate Santas Sleigh

View Site: [https://rotarysantatracker.gitcloud.org/](https://rotarysantatracker.gitcloud.org/)

Author: [@realashleybailey](https://www.github.com/realashleybailey)

Status
---
[![Develop](https://github.com/realashleybailey/RotarySantaTracker/actions/workflows/develop_pr_checks.yml/badge.svg)](https://github.com/realashleybailey/RotarySantaTracker/actions/workflows/develop_pr_checks.yml)
[![Release](https://github.com/realashleybailey/RotarySantaTracker/actions/workflows/release_pr_checks.yml/badge.svg)](https://github.com/realashleybailey/RotarySantaTracker/actions/workflows/release_pr_checks.yml)
[![Deploy](https://github.com/realashleybailey/RotarySantaTracker/actions/workflows/deploy.yml/badge.svg)](https://github.com/realashleybailey/RotarySantaTracker/actions/workflows/deploy.yml)

Highlights
---
- Use Vue.js for simple templated design
- Very easy to config using the config.json file located inside "src" folder
- NPM script commands for quick and easy "Build", "Develop" and "Deploy"
- Built in Express server for quick runtime

Tech stack
---
- Vue.js
- Typescript
- HTML & CSS
- NPM
- Firebase: Firestore, Storage
- Google Maps

Wiki
---
1. [Build setup](https://github.com/realashleybailey/RotarySantaTracker#Build-setup)
2. [Project modules](https://github.com/realashleybailey/RotarySantaTracker#Project-modules)
3. [Workflows](https://github.com/realashleybailey/RotarySantaTracker#Workflows)

Build setup
---

### Command Table

| Command | Information |
|---------|-------------|
| npm run start | Start the built in Express server. <strong>YOU MUST USE 'NPM BUILD' COMMAND FIRST</strong> |
| npm run build | Build the repository into the 'dist' folder for distribution. |
| npm run dev  | Start a NODEMON server that automatically restarts on every file change.  |
| npm run serve | Start the Vue JS development server that will automatically build the project and render it to the page |
| npm run lint | Begin a project wide file linting to tidy up code and test for errors |
| npm run test:unit | Begin a unit test on the project to check the web site functions as intended |
| npm run test:e2e | Begin a visual Chrome test using Cypress to check web elements are rendering correctly |

<br>

### Install
Clone the Github Repository to your local machine.
```
git clone https://github.com/realashleybailey/RotarySantaTracker
```

### Config
The site is easy to config using the configuration file located at ```C:/projectRoot/src/config.json```.
The JSON keys are as follows:
| JSON Key | Information |
|----------|-------------|
| home | Stores JSON object for 'title' & 'desc'. |
| home -> title | Title for the home page |
| home -> desc | Description for the home page |
| | |
| about | Stores JSON object for 'title' & 'desc'. |
| about -> title | Title for the about page |
| about -> desc | Description for the about page |
| | |
| donate | Stores JSON object for 'title' & 'desc'. |
| donate -> title | Title for the donate page |
| donate -> desc | Description for the donate page |
| donate -> url | The url that the Donate button will redirect the user to |
| | |
| firebase | An object that store the Firebase Configuration as provided in the firebase console |
### Step 1

Run NPM install command to pull in dependencies into the project.
```
npm install
```

### Step 2.1
To instantly build the project into its HTML, CSS & JAVASCRIPT files use the build command.
```
npm run build
```

The build files are located in the folder ```C:/projectRoot/dist/public```

### Step 2.2
If you wish to begin editing the Vue JS template you will want to follow these instructions.
```
npm run serve
```

This will start a development server that will automatically serve and update the project as you edit it.
<br>
The project files are located in ```C:/projectRoot/src```, and the folder structure is as follows.

| Folder | Information |
---------|-------------|
| assets | To store images and files that you want to dynamically import into the project |
| components | Reusable components like a navigation bar or other reusable elements |
| router | Stores an 'index.ts' file that outlines the website directorys linking pages to domain folders. Example About View may link to folder /about.
| store | Deprecated not needed for this project. |
| views | Store the file templates for the different pages in the site.



[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/realashleybailey/RotarySantaTracker/blob/master/LICENSEs)
