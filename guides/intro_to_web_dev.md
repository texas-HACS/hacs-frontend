# (GUIDE) Intro to Web Dev

Many websites involve the use of HTML, CSS, and Javascript

HTML is used to dictate the structure and organization of the website i.e. what content goes where.

CSS is used to add design and generally make the website look nicer.

Javascript is used to add functionality to the website and is the only one of the three that is a programming language.

# HTML
Hypertext Markup Language, or HTML is the standard markup language for documents displayed on a web browser
The basic syntax is a piece of content enclosed within an HTML tag like this:
```
<body>This is where the web page's content will be placed</body>
```
Most tags have a closing tag like the one shown above while other don't like the one below:
```
<img src="" alt="">
```
Most if not all tags have attributes which act as parameters and provide more detail on how the content is displayed. `src` and `alt` shown above are two examples of attributes. Another two attributes `id` and `class` are used to apply styles from a .css file. There are many other attributes that vary in function.

Finally, Some tags are used to group sections of content together, some apply certain styles without using css, and others can add components/widgets to a page.

A page containing the various attributes can be found [here](https://www.w3schools.com/tags/ref_attributes.asp)
A page containing a list of HTML tags can be found [here](https://www.w3schools.com/tags/ref_byfunc.asp)
A video reviewing the basics of HTML can be found [here](https://youtu.be/qz0aGYrrlhU). It also goes over how the Internet works and some basic css.

# CSS
Cascading Stylesheet, or CSS is one of the styling languages used to style a web page. It can also be quite complex at first. Without CSS and styling all web pages will essentially look like word documents.

CSS is basically a set of rules that dictates how sections of content are styled. These CSS rules include a selector, declaration block, and a declaration.
    - Selectors specifies which HTML elements will be styled with the rule
    - The declaration block will have one or more declarations separated by semicolons
    - Declarations are a CSS property followed by a colon and an appropriate value
An example of this is shown below:

![CSS example](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/CSS_basics/css-declaration-small.png)

There are also three different ways to apply CSS:
    - Inline style which uses the style attribute to style a single specific element

    ```
    <span style="font-size: 16pt">Inline Style Example</span>
    ```
    - Embedded stylesheet which uses the <style> tag to define CSS rules

    ```
    <style>
        span {
            font-size: 16pt;
        }
    </style>
    ```
    - External stylesheet which involves placing all of your CSS in a separate .css file and is imported using the `<link>` tag.
    The link tag should look something like this:

    ```
    <link href="styles.css" rel="stylesheet">
    ```
    The .css file will have the same format as the image shown above.

There are also many options available for selectors including element selectors, ID name selectors,Class name selectors, descendant selectors, pseudo-class selectors, and multiple selectors.
A link to a page explaining these selectors can be found [here](https://www.w3schools.com/css/css_selectors.asp)

There is also many options for units of size which is explained [here](https://www.w3schools.com/cssref/css_units.php). Relative sizes are typically preferred over absolute size to allow for more responsive designs.

Another thing to learn about CSS is the Box Model explained [here](https://www.w3schools.com/css/css_boxmodel.asp).

Finally, there are many CSS properties so a list of them can be found [here](https://www.w3schools.com/cssref/index.php).

# Javascript
Javascript is probably one of the easier programming languages that has some similarities to Java and Python. As it is a programming language, there are a lot of things to go over.

I highly recommend going through the Javascript modules in [FreeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/). It'll go over the basics of Javascript and also go over more complex topics. I recommend the Basic Javascript, ES6, Basic Data Structures, and Functional Programming sections of the course.