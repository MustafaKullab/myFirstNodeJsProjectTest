const express = require("express");
const mongoose = require("mongoose");

const Article = require("./models/Article");

mongoose
  .connect(
    "mongodb://MustafaKullab:Newnew123123@ac-bqpjdes-shard-00-00.pss0lzq.mongodb.net:27017,ac-bqpjdes-shard-00-01.pss0lzq.mongodb.net:27017,ac-bqpjdes-shard-00-02.pss0lzq.mongodb.net:27017/?ssl=true&replicaSet=atlas-klf5zu-shard-0&authSource=admin&appName=myFirstNodeJsCluster"
  )
  .then(() => {
    console.log("Connected successfully");
  })
  .catch((err) => {
    console.log("Error : Can't found database" + err);
  });

const path = require("path");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to my project");
});

app.get("/test", (req, res) => {
  let numbers = "";
  for (let i = 1; i <= 100; i++) {
    numbers += `${i} - `;
  }
  res.render("index.ejs", {
    numbers: numbers,
    name: "Mustafa",
  });
});

// لتخزين مقالات في قاعدة البيانات  endpoint
app.post("/articles", async (req, res) => {
  const { articleTitle, articleBody } = req.body; // عشان تخلي الكلاينت نفسه هو اللي يكتب البيانات بحالتنا من البوستمان بنكتب  body params
  const newArticle = new Article();
  ((newArticle.title = articleTitle),
    (newArticle.body = articleBody),
    (newArticle.numberOfLikes = 0));
  await newArticle.save();
  res.json(newArticle);
});

// لارجاع كل البيانات او المقالات من قاعدة البيانات
app.get("/articles", async (req, res) => {
  const articles = await Article.find();
  res.json(articles);
});

app.get("/articles/:articleId", async (req, res) => {
  const { articleId } = req.params;
  try {
    let article = await Article.findById(articleId); // الطريقة الشائعة والصحيحة
    return res.json(article);
  } catch (err) {
    console.log(err);
    return;
  }

  //   const thisArticle = articles.find( // احد الطرق والتي تعد يدوية ولا تستخدم
  //     (article) => article._id.toString() === articleId
  //   );
  // res.json(thisArticle);
});

// لتعديل مقالة معينة
app.put("/articles/:articleId", async (req, res) => {
  const { title, body } = req.body;
  const { articleId } = req.params;
  try {
    const articles = await Article.findByIdAndUpdate(articleId, {
      title: title,
      body: body,
    });

    res.json(articles);
  } catch (err) {
    console.log(err);
  }
});

// لحذف مقالة معينة
app.delete("/articles/:articleId", async (req, res) => {
  const { articleId } = req.params;
  try {
    let articles = await Article.findByIdAndDelete(articleId); // id دالة تحذف بناءا على ال
    res.json(articles);
  } catch (err) {
    console.log(err);
  }
});

app.get("/showAllArticles", async (req, res) => {
  const articles = await Article.find();
  res.render("allArticles.ejs", {
    allArticles: articles,
  });
});

app.listen(5000, () => {
  console.log("Server is listening on port 5000...");
});
