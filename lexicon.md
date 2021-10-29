# IMPORTANT PROJECT-RELATED VOCABULARY
<br />

App: the component (class) that encompasses all of the front-end code.
<br/>
<br/>
auth/setAuth state: allows us to verify if a user is authenticated.
<br />
<br/>
Route, Router, Switch: allows us to create routes in the front-end.
<br/>
<br />
LandingPage: component (class) that encompasses the landing page.
<br />
<br/>
Register: component (class) that relates to the signup page. The most important variables inside this component are:
<ul>
  <li>username: variable used to store the username of the user. </li>
  <li>email: variable used to store the email of the user. </li>
  <li>password: variable used to store the password of the user. </li>
</ul>
Login: component (class) that relates to the login page. The most important variables inside this component are:
<ul>
  <li>username: variable used to store the username of the user to compare against what is in the database. </li>
  <li>password: variable used to store the password of the user to compare against what is in the database. </li>
</ul>
Description: component (class) that describes the product in the landing page.
<br />
<br />
Dashboard: component (class) that relates to the main page when the user signs in.
<br />
<br />
Play: component (class) that relates to the logic of the trivia application. The most important variables inside this component are:
<ul>
  <li>questions: variable used to store the questions fetched from the OpenTrivia API. </li>
  <li>loading: variable used to state of the loading component that shows the questions to the user. </li>
  <li>currQuestion: variable used to store the current question number. </li>
  <li>startGame: variable used to indicate whether the game has started or not. </li>
  <li>score: variable used to store the current score of the user.</li>
  <li>btnClicked: variable used to store the button pressed by the user.</li>
  <li>gameOver: variable used to indicate whether the game is over or not.</li>
  <li>correct_audio: variable used to store the sound that plays when a user answers a question correctly.</li>
  <li>wrong_audio: variable used to store the sound that plays when a user does not answer a question correctly.</li>
</ul>


server: variable used throughout the app for the Express middleware.
<br />
<br />
Register method (backend): function to register a user.
<br />
<br />
userExists method: function to check if a user exists on the MySQL database.
<br />
<br />
Login method (backend): function that logs in a user or rejects them based on the information given in the inputs.
<br />
<br />
Access token (backend): generates an access token for the user on successful login.
<br />
<br />
Refresh token (backend): generates a refresh token for the user.


