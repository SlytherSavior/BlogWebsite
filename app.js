const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
// Load the lodash library
const lod = require('lodash');

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum constius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();
const posts  = [];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// Define the route for the home page
app.get("/", (req,res) => { 
  res.render("home", {homeContent: homeStartingContent, userPosts: posts});
});

// Define the route for the about page
app.get("/about", (req,res) =>  { 
  res.render("about", {aboutContent: aboutContent});
});

// Define the route for the contact page
app.get("/contact", (req,res) =>  { 
  res.render("contact", {contactContent: contactContent});
});

// Define the route for the compose page
app.get("/compose", (req,res) =>  { 
  res.render("compose");
});

// Define the route for handling the form submission in the compose page
app.post("/compose", (req,res) =>{ 
  posts.push({title: req.body.Title, content:req.body.postBody});
  res.redirect("/");
});

// Function to check if a post with the specified title exists
function checkMatch(element) { 
  for (let i = 0; i < posts.length; i++) { 
    if (lod.lowerCase(posts[i].title) === element) { 
      return posts[i];
    }
  }
  return "Match not found";
}

// Define the route for individual posts
app.get("/posts/:title", (req,res) =>  { 
  // Check if there is a post with the specified title
  const matched = checkMatch(lod.lowerCase(req.params.title));
  console.log(matched);
  
  // Render the post page with the matched post's title and content
  res.render("post", {postTitle: matched.title, postBody: matched.content });
});

// Start the server on port 3000
app.listen(3000, function() {
  console.log("Server started on port 3000");
});
