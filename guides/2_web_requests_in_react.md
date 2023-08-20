# (GUIDE) Web Requests in React

This guide will discuss the basics of web requests including what they are, how they work, and how to make a web request.

# What are Web Requests?
Web requests allow the user or developer to ask, send, or perform other functions through HTTP requests and typically involves the use of a URL.

When a request is made, it is sent from the web browser to the web server where the server can a response which will vary on the request method.

There are 5 commonly used HTTP requests methods: GET, POST, PUT, PATCH, DELETE
- GET is used to obtain specific resources from servers
- POST is used to create a new resource at the specified URL
- PUT is used to update an existing resource by "creating" a new version of the resource with the modified changes
- PATCH is similar to PUT but instead of creating a new version, it partially modifies the current version.
- DELETE is used to delete a specific resource

At the moment, the website's code only involves the use of GET, POST, PUT, and DELETE.

# How to Make a Web Request in React?
There are two main ways to make HTTP request: 
- [fetch()](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch): The built-in Fetch API provided by Javascript
- Axios: An HTTP client library which requires installation

So far, fetch() is the only method used in order to run the website.

fetch() takes in a url and an optional second parameter. 

A video showing how to use fetch() can be found [here](https://youtu.be/cuEtnrL9-H0)