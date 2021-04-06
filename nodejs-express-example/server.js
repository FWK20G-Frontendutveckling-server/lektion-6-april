//Importera npm modul express
const express = require('express');
//Skapa upp en server
const app = express();

//Används för statiska filer (HTML, CSS, JS, Bilder etc)
//Express kommer automatiskt att skicka tillbaka dessa filer i mappen frontend till klienten
//Om url:en matchas ex /style.css
app.use(express.static('frontend'));
app.use(express.json());

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

// URL: /api/insults
// Metod: POST
// Används för att lägga till en ny insult

app.post('/api/insults', (request, response) => {
  console.log('Request ', request.body);
  //Hämta ut det som finns medskickat från front-end i body
  const insultToAdd = request.body;
  //Lägg till objektet i vår array
  insults.push(insultToAdd);
  
  const result = {
    success: true,
    insults: insults
  }

  response.send(JSON.stringify(result));
});

// URL: /api/insults/:play
// Metod: GET
// Används för att söka efter en specifik pjäs

// :play är en param eller dynamisk url där man kan från front-end skicka med
// något som sedan hamnar i :play och vi kan hämta ut
app.get('/api/insults/:play', (request, response) => {
  console.log(request.params.play);
  //Hämta ut innehållet i :play (exempelvis Julius Ceasar)
  const search = request.params.play;

  //Sök igenom vår insults array efter träffar
  const result = insults.filter((insult) => {
    return insult.play === search
  });

  const res = {
    insults: result
  }

  //Returnera svar
  response.json(res);
});

//Lyssnar på port 8000
app.listen(8000, () => {
  console.log('Server started');
});