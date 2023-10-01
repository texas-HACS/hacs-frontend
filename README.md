# HACS-Open-Source-Website

React-based frontend for the Hispanic Association of Computer Scientists website. We allow our members to be able to contribute to the website and gain experience with industry tools.

Refer to the below [Quick Start](#quick-start) guide first to get set up!

# Important!

This project is only intended for students at The University of Texas at Austin! We appreciate any offers of help, but please do not try to contribute if you are not a member of the Hispanic Association of Computer Scientists (HACS) at UT Austin.

# Pre-Setup Setup

## Join the Team

**_IMPORTANT:_** Prior to anything, you must ensure the following steps are complete:

1. Fill out the [HACS Web Dev interest form](https://texashacs.org/develop)
2. Join our Discord server
3. Join our [GitHub Organization](https://github.com/texas-HACS) ([GitHub](https://GitHub.com) account required)

**_NOTE:_** Step 1 must be completed in order to be sent an invite for steps 2 and 3.

## Development Environment Setup

You will need:

- node.js [(install)](https://nodejs.org/en/), specifically version 16
  - or use `homebrew` (macOS only)
- git [(install)](https://git-scm.com/downloads)
- a text editor of your choice or IDE. [Brackets](https://brackets.io/), [VSCode](https://code.visualstudio.com/download), and [Webstorm](https://www.jetbrains.com/webstorm/download/) are all great.
- a terminal to access the command line
  - see 
[`Intro to the Command Line`](https://github.com/texas-HACS/hacs-frontend/blob/master/guides/intro_to_the_command_line.md) in our [guides](https://github.com/texas-HACS/hacs-frontend/tree/master/guides/)

If you aren't familiar with `git`, please be sure to check out [this tutorial](http://noodle.med.yale.edu/hdtag/notes/git_tut.pdf) or [this video](https://youtu.be/DVRQoVRzMIY) before working with the site, and reach out to the current web development officer for more help.

Bonus Tip: Follow the [`Great Environment Setup`](https://github.com/texas-HACS/hacs-frontend/blob/master/guides/great_environment_setup.md) guide for a good starter development environment.

# Quick Start

## 0. Set Up Your Local Development Environment

Please make sure you have completed the [Pre-Setup Setup](#pre-setup-setup) steps above on your current machine.

## 1. Clone the repo

Open up your terminal of choice. Change into a good directory for all things HACS web dev! (i.e. hacs-webdev/)

```bash
cd hacs-webdev
```

Clone the [hacs-frontend](https://github.com/texas-HACS/hacs-frontend) repository:

```bash
git clone https://github.com/texas-HACS/hacs-frontend.git
```

Navigate into the project:

```bash
cd hacs-frontend
```

And install the npm dependencies:

```bash
npm install --legacy-peer-deps
```

OR

```bash
npm i --legacy-peer-deps
```

This installs all packages/libraries you currently needed for this project locally.

## 2. Request/Set Up Environment Variables

Request the environment variable file (.env) from the current web development officer.

Save this file to the root of the hacs-frontend project. This means that .env should be located at `.../hacs-webdev/hacs-frontend/.env`

**_IMPORTANT:_** Please do not share the file or any of its contents with anyone. You won't be doing any good to us and this will just be a nuisance.

**_MAC USERS:_** You may not be able to rename this file properly using just Finder. Once you have placed the env file in the correct location, open up the terminal, navigate to `hacs-frontend`, and perform the following command:
```bash
mv env .env
```
This will rename env to .env, which is able to be done at the terminal level, but not in Finder.

## 3. Test to Ensure Everything Works

You can then start the development server for our frontend:

```bash
npm start
```

This is a script in the package.json file ([`hacs-frontend/package.json`](https://github.com/texas-HACS/hacs-frontend/blob/master/package.json)). Its function is to start up webpack and a developer server where your changes will be watched and automatically recompiled so you can see them live.

If a tab isn't opened automatically, you can go to
[http://localhost:3000/](http://localhost:3000/) in either Chrome or Edge.

### Make some changes

Feel free to mess around with the code and see what happens.
This will not change anything except for the code on your machine!

You will also be able to see these changes occur in your browser whenever you save your files (since it will recompile if `npm start` is left running).


**_NOTE:_** Please reach out to the current Web Development Officer if you have trouble with any of these steps.

## 4. Begin Development!

The best way of learning is by doing. Head over to the [hacs-frontend](https://github.com/texas-HACS/hacs-frontend) repo in GitHub and assign yourself to an [issue](https://github.com/texas-HACS/hacs-frontend/issues). Reach out to the current Web Development Officer if you need help with this or would like to be assigned an issue.

Of course, feel free to collaborate on issues!

**_IMPORTANT:_** Please be sure to follow the [conventions](#conventions) for our site found below.

Refer to this readme and the guides found in [`hacs-frontend/guides`](https://github.com/texas-HACS/hacs-frontend/tree/master/public) first for further setup or quick references.

## 5. Learn More

### Beginners

Watch this [React Tutorial for Beginners](https://www.youtube.com/watch?v=QJZ-xgt4SJo) and these videos about react hooks: [useState](https://youtu.be/V9i3cGD-mts), [useEffect](https://youtu.be/-4XpG5_Lj_o), [useRef](https://youtu.be/42BkpGe8oxg). This aligns pretty well with our site, and goes through a fairly simple tutorial to get started. Try and relate the concepts discussed to what you see inside of our own codebase.

### Guides

There are also a few guides (and more to come) found in [`hacs-frontend/guides`](https://github.com/texas-HACS/hacs-frontend/tree/master/guides).

Here are the topics covered:

[`Introduction to Website Development`](https://github.com/texas-HACS/hacs-frontend/blob/master/guides/1_intro_to_web_dev.md)

[`Web Requests in React`](https://github.com/texas-HACS/hacs-frontend/blob/master/guides/2_web_requests_in_react.md)

[`Developing in React`](https://github.com/texas-HACS/hacs-frontend/blob/master/guides/3_developing_in_react.md)

[`Functional React`](https://github.com/texas-HACS/hacs-frontend/blob/master/guides/4_functional_react.md)

[`git, GitHub, and Version Control`](https://github.com/texas-HACS/hacs-frontend/blob/master/guides/5_git_github_and_version_control.md)

[`How texashacs.org Functions`](https://github.com/texas-HACS/hacs-frontend/blob/master/guides/6_how_texashacs.org_functions.md)

# How to Contribute

Check out the "[Issues](https://github.com/texas-HACS/hacs-frontend/issues)" tab at the top of the page! These are features or bugs that we want to work on.
Feel free to assign yourself to any issue that hasn't been claimed, or message the current web dev officer in the Discord if you want to work on something different.

If there is an issue that you want to work on that someone else is working on, feel free to message them and see if they want any help!

With any questions, feel free to reach out to Alexander Valdez!

# Conventions

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

# TODO

Finish fleshing out the how to contribute section

Add in current web dev team

# Available Standard Scripts

In the project directory, you can run:

## `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

## `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

# Helpful Custom Scripts

TODO: Add some helpful scripts to `hacs-frontend/scripts` and outline them here.

# Helpful Bash Commands
TODO: Finish the command line intro guide and put some helpful bash commands and their usage here
