# Pick A Flick

![MIT License](https://img.shields.io/badge/license-MIT-green)

## Description

- Purpose of this project: An app where users can add dealbreakers and movies to their profile, create a group, invite other users to the group, add user movies to the group, remove group movies with users' dealbreakers, and then randomly pick a final movie to watch.
- Problem(s) the app solves: Choosing a movie to watch as a group can be time-consuming and socially exhausting.
- Languages used: HTML, CSS, JavaScript, GraphQL
- Brief description: A simple website to help a group of friends choose a movie to watch together employing user input, anonymous veto, and a final random movie selection.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)
- [Links](#links)

## Installation

This app requires the installation of graphql, express, apollo, apollo-server-express, concurrently, bcrypt, jsonwebtoken (JWT), mongoose, bootstrap, and react for development. All are included in the package.json files and can be installed with the following input:

```bash
npm install
```

## Usage

When the user opens the application, they are met with the home page. At the top of the page is a navigation bar with "Pick A Flick" on the left and "Login/Sign Up" on the right. Below the navigation bar is text welcoming the user, a prompt for them to log in or sign up to get started, and a button that takes the to the Login or Signup page. When the user clicks that button, they are presented with two forms, one to enter their credentials to log in and another to enter their information so they can sign up.

After they log in or sign up, the navigation bar updates. Next to "Pick A Flick", links to Profile, Dealbreakers, and Movies are now revealed, and the "Login/Sign Up" on the right has been updated to "Logout". The user has also been redirected to their profile page. At the top is text welcoming the user by their username. Below that is the user's list of dealbreakers, list of saved movies, a form to create a new group, and a list of their groups.

When the user clicks on "Dealbreakers" in the navigation bar, they are taken to the Dealbreakers page. "Dealbreakers" are topics or themes that the user does not want to have in movies they watch. At the top is a dropdown menu with the full list of dealbreakers. To the right is a "Save" button, and to the right of the button is an input box. A user can type text into the input box and it will update the dropdown in real time to match. If a user clicks on the "Save" button, the dealbreaker will be added to their profile and shown in the "Your dealbreakers" section below.

When the user clicks on "Movies" in the navigation bar, they are taken to the Movie Search page. There is an input box with text "Search for a movie". To the right is a "Submit Search" button. When that button is pressed, the user is presented with cards for movies that match the search. If no movies match the search, the user is notified via a snackbar. Each movie card contains the movie's poster, title, release year, and a "View Movie Details" button. When the user clicks that button, they are taken to a new Movie Details page for that specific movie.

When the user arrives at the Movie Details page, the movie poster is on the lefthand side and movie information is on the right. The movie details include the title, release year, genre, and description. Below is a list of the movie's dealbreakers. If any of those dealbreakers are one of the user's dealbreakers, the background color changes from black to red to notify the user, and below the dealbreakers will be text that says "This movie contains one of your dealbreakers.". If the movie does not contain any of the user's dealbreakers, that text will be replaced with a "Save Movie" button. If the user clicks on that button, the movie will be saved to their profile, and the button will change to a "Remove Movie" button. If the user clicks on the "Remove Movie" button, the movie is removed from their profile and the button changes back to a "Save Movie" button. Below the button is a "Back to Search" button, which takes the user back to the Movie Search page.

Once the user has added dealbreakers and movies to their profile, they have what they need to create a group. Back on the Profile page, when the user scrolls down to the "Create A New Group form", the user can create a new group by entering the group name, description, and join code. When the user clicks on the "Create" button, a new group is created, and the user is redirected to a page for that group. Group pages can also be accessed for the group card under the "My groups" section of the profile page. Clicking on the "Go To Group" button.

When the user is at the Group page, they are welcomed at the top with the group name, group description, and the list of group memebers. Below that is the Group Info, and a prompt for the user to send the group link and join code to a friend for them to join the group. There is a "Copy Group Link" button that, when pressed, copies the link to the user's clipboard. Below the Group Info is a list of cards of the Group's movies. Each movie card has the movie poster and two buttons, a "Movie Details" button that will take the user to the movie's Movie Detials page, and a "Remove" button, which will remove the movie from the Group's movie list. Below the Group's movie section is a "Remove Movies with Dealbreakers" button, a "Pick a Flick" button, and a list of movie cards for the user's saved movies. Each card has the movie's poster and two buttons, a "Details" button that will take the user to the movie's Movie Details page, and a "Add Movie" button, which will add the movie to the Group's movie list.

Once all group members have added their movies, clicking on the "Remove Movies with Dealbreakers" button will check all the users' dealbreakers and compare them to the dealbreakers in the group's movie list. Any movies that contain a user's dealbreakers will be removed.

When a user clicks on the "Pick A Flick" button, one of the remaining movies is randomly selected, and all other movies are deleted. The group has now Picked a Flick!

## Screenshots

### Home Page

!["Screenshot of the Home Page. At the top is a navigation bar with a black background and white text on the left that reads "Pick A Flick" and to the right "Login/Sign Up". Is black text on a white background. The top text reads "Welcome to Pick A Flick", below is smaller text "Log in or sign up to get started." and a white button with blue text and border that reads "Login or Signup". At the bottom of the page is a footer with a black blackground with white text. At the top middle are two blue buttons with white details, the left button is a link to github and the right to linkedin. Below is text "2002 Made with (a blue heart icon) and the MERN stack by Meegan](./client/src/assets/images/pickaflick_home_ss.png)

### Profile Page

!["Screenshot of the Profile Page. At the top is a navigation bar with a black background and white text on the left that reads "Pick A Flick", "Profile", "Dealbreakers", and "Movies" and to the right "Logout". The main part of the page has a white background with black text. The top of the page reads 'Welcome, Meegan', below wich is "Your dealbreakers", underneath are a list of two dealbreakers. Below is a "Saved Movie" section with cards for movies.  Each card has the movie's poster and two buttons, a blue "Details" button and a red "Remove" button. Below is a "Create A New Group" form with prompts for Name, Description, and Join Code, and a green "Create" button. Below is a "My Groups" section, with cards for each group.  Each card has the group's name, descrption, join code, and two buttons, a blue "Go To Group" button and a red "Delete" button. At the bottom of the page is a footer with a black blackground with white text. At the top middle are two blue buttons with white details, the left button is a link to github and the right to linkedin. Below is text "2002 Made with (a blue heart icon) and the MERN stack by Meegan](./client/src/assets/images/pickaflick_profile_ss.png)

### Dealbreakers Page

!["Screenshot of the Dealbreakers Page. At the top is a navigation bar with a black background and white text on the left that reads "Pick A Flick", "Profile", "Dealbreakers", and "Movies" and to the right "Logout". The main part of the page has a white background with black text. The top of the page has a dropdown menu, a green "Save" button, and an input box that reads "filter list". Below is a "Your dealbreakers" section, with a list of two dealbreakers. At the bottom of the page is a footer with a black blackground with white text. At the top middle are two blue buttons with white details, the left button is a link to github and the right to linkedin. Below is text "2002 Made with (a blue heart icon) and the MERN stack by Meegan](./client/src/assets/images/pickaflick_dealbreakers_ss.png)

### Movies Page

!["Screenshot of the Movies Page. At the top is a navigation bar with a black background and white text on the left that reads "Pick A Flick", "Profile", "Dealbreakers", and "Movies" and to the right "Logout". The main part of the page has a white background with black text. At the top is an input box with text that reads "Search for a movie" with a green "Submit Search" button next to it. Below is a "Movies" section with a list of movie cards.  Each card has the movie's poster, title, release year, and a blue "View Movie Details" button. At the bottom of the page is a footer with a black blackground with white text. At the top middle are two blue buttons with white details, the left button is a link to github and the right to linkedin. Below is text "2002 Made with (a blue heart icon) and the MERN stack by Meegan](./client/src/assets/images/pickaflick_moviesearch_ss.png)

### Movie Details Page

!["Screenshot of the Movie Details Page. At the top is a navigation bar with a black background and white text on the left that reads "Pick A Flick", "Profile", "Dealbreakers", and "Movies" and to the right "Logout". The main part of the page has a white background with black text. To the left is a large image of the movie's poster. To the right are the movie details, including the title, release year, genre, and descrption. Below is a list of all the movie's dealbreakers, shown as round pills with black background and white text. Below is a green "Save Movie" button with a blue "Back To Search" button below that. At the bottom of the page is a footer with a black blackground with white text. At the top middle are two blue buttons with white details, the left button is a link to github and the right to linkedin. Below is text "2002 Made with (a blue heart icon) and the MERN stack by Meegan](./client/src/assets/images/pickaflick_moviedetails_ss.png)

### Group Page

!["Screenshot of the Group Page. At the top is a navigation bar with a black background and white text on the left that reads "Pick A Flick", "Profile", "Dealbreakers", and "Movies" and to the right "Logout". The main part of the page has a white background with black text. At the top is text welcoming the user to the group, below which is the group's description and a list of the group members. Below is the "Group Info" section, which includes a blue "Copy Group Link" button and the join code. Next is a "Group's Movie" section, with cards for each of the movies. Each card has the movie's poster and two buttons, a blue "Movie Details" button and a red "Remove" button. Next is a red "Remove Movies with Dealbreakers" button. Below that is a green "Pick A Flick!" button. Next is a "Your movies" section, which includes cards for each of the user's movies. Each card has the movie poster and two buttons, a blue "Details" button and a green "Add Movie" button. At the bottom of the page is a footer with a black blackground with white text. At the top middle are two blue buttons with white details, the left button is a link to github and the right to linkedin. Below is text "2002 Made with (a blue heart icon) and the MERN stack by Meegan](./client/src/assets/images/pickaflick_group_ss_png.PNG)

## License

This application is licensed under the MIT license.

## Contributing

If you would like to contribute to this application, please follow Creative Contribution guidelines.

## Tests

Try to access pages when not logged in, enter unexpected text into input boxes, and add and remove movies and dealbreakers from profiles and groups.

## Questions

If you have any questions:

- Email me: [meegan.r.anderson@gmail.com](mailto:meegan.r.anderson@gmail.com)
- Go to my github: [NotANewt](https://github.com/NotANewt)

## Links

- Here is the repo: [NotANewt/Pick A Flick](https://github.com/NotANewt/pick_a_flick)
- Here is the pages: [Herokuapp/pages](https://pick-a-flick-app.herokuapp.com/)
