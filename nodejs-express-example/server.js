//Importera npm modul express
const express = require('express');
//Skapa upp en server
const app = express();

//Används för statiska filer (HTML, CSS, JS, Bilder etc)
//Express kommer automatiskt att skicka tillbaka dessa filer i mappen frontend till klienten
//Om url:en matchas ex /style.css
app.use(express.static('frontend'));

//En array med insults att skicka tillbaka till frontend
const insults = [
    {
      insult: "Never hung poison on a fouler toad",
      play: "Rickard III"
    },
    {
      insult: "He thinks too much: such men are dangerous. ",
      play: "Julius Ceasar"
    }
  ];

//En route i express som säger att om ett request använder en GET som HTTP-metod och
//url:en är /api/insults som kör den tillhörande callback-funktion och skickar tillbaka ett svar
app.get('/api/insults', (request, response) => {
  const result = {
    insults: insults
  }

  response.send(JSON.stringify(result));
});

//Lyssnar på port 8000
app.listen(8000, () => {
  console.log('Server started');
});