const express = require("express");
const axios = require("axios");
const path = require("path");
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, "public")));

// show the home page
app.get("/", (req, res) => {
    res.render("index", {
        joke: null,
        name: "",
        error: null
    });
});

// get a joke from the API
app.post("/joke", async (req, res) => {
    const name = req.body.name;
    const category = req.body.category;

    try{
        const response = await axios.get(
            `https://v2.jokeapi.dev/joke/${category}?safe-mode`
        );
        res.render("index", {
            joke: response.data,
            name: name,
            error: null
        });
    } catch (error) {
        res.render("index", {
            joke: null,
            name: name,
            error: "Something went wrong. Please try again."
        });
    }
});
app.listen(port, () => {
    console.log(`Joke app running on http://localhost:${port}`);
});