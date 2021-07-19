This is a fullstack blog application designed with React, Nodejs, and MongoDB. It is currently being hosted on Heroku.  

\*\*\*Try it out at https://serene-ravine-32193.herokuapp.com/ using the credentials below\*\*\*\
Username: guest \
Password: guest

Some website features are:
<ul>
<li>User login with token authorization
<li>Logged in users can create their own blog post on the public wall
<li>Each post can be expanded/collapsed for  information
<li>Users can like any of the posts
<li>Users can only delete their own posts from the wall
</ul>
<br>

Building this app was a great learning experience to familiiarize myself with an array of web technologies.

The backend is built with Nodejs and Express while using Mongoose to communicate with MongoDB. Uses bcrypt hashing function to keep users passwords safe. There is a testing suite for the backend using Jest and Supertest.


This app uses Cypress for End to End testing, this simulates how users can potentially interact with the website.

The frontend is built with React, Styled Components, and Axios for routing. Styled Components allows for CSS to be applied using Javascript.

In it's current state, this app could be used as a team message board. Allowing communications to be asynchronous and keeping email inboxes uncluttered.