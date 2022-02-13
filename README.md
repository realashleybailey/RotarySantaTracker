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
- NPM script commands for quick and easy "Build", "Develope" and "Deploy"
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

| Command | Information |
|---------|-------------|
| npm run start | Start the built in Express server.<br> <strong>YOU MUST USE 'NPM BUILD' COMMAND FIRST</strong> |
| npm run build | Build the repository into the 'dist' folder for distribution. |
| npm run dev  | Start a NODEMON server that automatically restarts on every file change.  |
| npm run serve | Start the Vue JS development server that will automatically build the project and render it to the page |
| npm run lint | Begin a project wide file linting to tidy up code and test for errors |
| npm run test:unit | Begin a unit test on the project to check the web site functions as intended |
| npm run test:e2e | Begin a visual Chrome test using Cypress to check web elements are rendering correctly |
[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/realashleybailey/RotarySantaTracker/blob/master/LICENSEs)
