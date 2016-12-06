# wysiwyg editor demostration
[![Build Status](https://travis-ci.com/mzbac/page_editor.svg?token=Trbw6Ac7azbSVGZpYNwP&branch=master)](https://travis-ci.com/mzbac/page_editor)
# Introduction
This project demostrated how you can build your page by using a wysiwyg editor. 
it has two core parts.

- src/editor is wrapper of draft-js editor, It borrows draft-js-plugin-edit's plugable architect, and provides infrastructure of all the plugin/middleware.

- src/middleWares has two main middleware.
StyleMiddleWare bascally provide the style related functions, It has a lot of draft-js default styles and also includes some custom styles such as link and inline katex.
customComponentMiddleWare provide core functions of inserting custom block into draft-js gives user power to editor content on page with desired custom component.

#Get started

- run `npm install` to install all the dependencies.
- run `npm run start-dev` to start dev server.

#Live Demo
[Live Demo](https://sizzling-torch-9797.firebaseapp.com/)
