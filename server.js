const express = require("express") //inportando express
const nunjucks = require("nunjucks") // moto de view .Interação com template engine

const server = express() //criando servidor ---- chamdno função express para dentro do servidor
const videos = require("./data")
const cursos = require("./cursos")


server.use(express.static("public"))

server.set("view engine", "njk") // configurando minha template engine

nunjucks.configure("views", {
   express: server,
   autoescape: false,
   noCache: true
})

server.get("/", function (req, res) { //REQ- requisição
   const data = {
      avatar: "perfil.jpg",
      name: "Daniel itallo",
      role: "Desenvolvedor Full-Stack",
      description: 'Programador full-Stack, focado em desenvolver os melhores software e da a melhor experiência ao seu usúario! <a href="/company">Rocketseat</a>',
      links: [{
            name: "GitHub",
            url: "https://github.com/italodaniel"
         },
         {
            name: "Instagram",
            url: "https://www.instagram.com/"
         },
         {
            name: "Linkedin",
            url: "https://www.linkedin.com/"
         },
      ]
   }
   return res.render("abaout", {
         data
      }),
      server.use(function (req, res) {
         res.status(404).render("not-found");
      });
})

server.get("/course", function (req, res) { //REQ- requisição
   return res.render("course", {
         items: cursos
      }),
      server.use(function (req, res) {
         res.status(404).render("not-found");
      });
})

server.get("/portfolio", function (req, res) { //REQ- requisição
   return res.render("portfolio", {
         items: videos
      }),
      server.use(function (req, res) {
         res.status(404).render("not-found");
      });
})

server.get("/company", function (req, res) { //REQ- requisição
   return res.render("company"),
      server.use(function (req, res) {
         res.status(404).render("not-found");
      });
})

server.get("/video", function (req, res) {
   const id = req.query.id

   const video = videos.find(function (video) {
      return video.id == id
   })

   if (!video) {
      return res.send("Video not found")
   }
   return res.render("video", { item: video })
})

server.listen(5000, function () {
   console.log("server");
})