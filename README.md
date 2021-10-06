# HACS-OpenSource-WebSite

React-based frontend for the Hispanic Association of Computer Scientists website. We allow our members to be able to contribute to the website and gain experience with industry tools.

# Important!

This project is only intended for students at The University of Texas at Austin! We appreciate any offers of help, but please do not try to contribute if you are not a member of the Hispanic Association of Computer Scientists at UT Austin.

# Pre-Setup Setup

You will need:

- node.js [(install)](https://nodejs.org/en/) 
  - or use `homebrew` (macOS only)
- git [(install)](https://git-scm.com/downloads)
- a text editor of your choice or IDE. [Brackets](https://brackets.io/), [VSCode](https://code.visualstudio.com/download), and [Webstorm](https://www.jetbrains.com/webstorm/download/) are all great.

If you aren't familiar with `git`, please be sure to check out [this tutorial](http://noodle.med.yale.edu/hdtag/notes/git_tut.pdf) before working with the site, and reach out to the current web development officer for more help.

# Quick Start

Clone the repo. Put it somewhere more permanent than the Downloads folder. Navigate in terminal/powershell to the project and use

> npm install

This installs all packages/libraries you currently needed for this project locally. You can start the development server with

> npm start

This is a script in the package.json file. Its function is to start up webpack and a developer server where your changes will be watched and automatically recompiled so you can see them live. If a tab isn't opened automatically, you can go to
`http://localhost:5000/`
Feel free to mess around with the code and see what happens.

# How to Contribute

Check out the "[Issues](https://github.com/texas-HACS/hacs-frontend/issues)" tab at the top of the page! These are features or bugs that we want to work on.
Feel free to assign yourself to any issue that hasn't been claimed, or message the current web dev officer in the Discord if you want to work on something different.

If there is an issue that you want to work on that someone else is working on, feel free to message them and see if they want any help!

With any questions, feel free to reach out to Jeffrey Moulckers!

## Rules for Branching

In order to have a consistent flow with developer branches we need to implement a naming convention on new branches, as well as a step by step approach to merging and pull requests.

### Branch Naming Convention

```bash
developerName-feature

# Example
mydevname-admin-panel
```

### Merging and Pull Requests

1. Push your branch's code to GitHub
2. Create a new [Pull Request](https://opensource.com/article/19/7/create-pull-request-github)
3. Set the base branch to `master` and the compare branch to your personal branch
4. Request others to review your code. PRs require an admin's approval to merge into master
5. After review, your code will be merged by designated Git Master.

# Beginner's Guide
Watch this [React Tutorial for Beginners](https://www.youtube.com/watch?v=QJZ-xgt4SJo). This aligns pretty well with our site, and goes through a fairly simple tutorial to get started. Try and relate the concepts discussed to what you see inside of our own codebase.

# TODO

Finish fleshing out the how to contribute section

Add in current web dev team

# Available Scripts

In the project directory, you can run:

## `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

## `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.