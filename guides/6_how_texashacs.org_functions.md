# (GUIDE) How texashacs.org Functions
This guide will focus on the frontend.

If you're interested in working on the backend, feel free to reach out to the current Web Dev Officer for access to the backend repository.

# Table of Contents
[Basic Website Information](#basic-information-about-the-website)

&nbsp;&nbsp;&nbsp;&nbsp;[Firebase Hosting](#hosting)

&nbsp;&nbsp;&nbsp;&nbsp;[Frontend](#frontend)

[How the Website Functions](#how-the-website-functions)

---

# Basic Information about the Website

## Hosting
We use Firebase to host the static files of out frontend. 

There are two versions of the site, a live version and a development version which allows us to preview changes and rollback buggy versions

## Frontend
The frontend of the website is built using React, so prior knowledge or a review of the React framework is recommended.

Refer to the React guide for a quick run through on React

# How the Website Functions
Most of the website's content is stored in our database on Firebase. 

In order to access this database, we need the keys in the .env file which should be provided to you by the current Web Dev Officer.

We also use the authentication features provided by Firebase to make the admin sign-in page functional.

The code used to connect to our Firebase account (for both storage and authentication) is shown in src/_firebase.js and should be untouched.

Once this connection has been established, the website can be rendered properly with the entirety of the site's content

To see every file that uses this connection for either authentication or database access use the search feature to search for "config"

If you ever want to add content to the website that requires changes to the database, reach out to the current Web Dev Officer to discuss these changes.

Finally, the remaining code in the src folder involves the structure and design of the website.
