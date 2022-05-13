const express = require("express");

const port = process.env.port || 3000;
const db = require("./models");

const app = express();
const es6Rendered = require("express-es6-template-engine");


//FRAMEWORK SET UP//
app.engine("html", es6Rendered);
app.set("views", "views");
app.set("view engine", "html");

//LOGGING REQUESTS//
app.all("*", (req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

//READS JSON BODY OF REQUEST//
app.use(express.json());
app.use(express.static("public"));

//GET REVIEWS AND DISPLAY DATA/
app.get("/", (req, res) => {
    db.user.findAll().then((results) => {
      res.render("index", { locals: { results: results} });
     })
    
})

//GET ALL REVIEWS FOR AN INDIVIDUAL DESK//
app.get("/reviews/:deskid", (req, res) => {
    let deskid = req.params.deskid
    db.user.findAll({ where: {desk:deskid} }).then((results) => {
        res.json(results)
    });
});


//POST A REVIEW//
app.post("/reviews", (req, res) => {
    const { username, desk, review } = req.body;

    db.user.create({
        username: username,
        desk: desk,
        review: review,

    })
        .then((user) => {
            res.json({
                success: true,
                user_id: user.id,
                user_username: user.username,
                user_desk: user.desk,
                user_review: user.review
            });
        })
})

app.listen(port, () => {
    console.log(`Server running at ${port}`);
})