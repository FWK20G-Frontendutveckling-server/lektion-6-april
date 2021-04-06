const searchInputElem = document.querySelector('#playElem');

function showInsults(insults) {
  const insultsElem = document.querySelector('#insults');
  for(insult of insults) {
    const insultElem = document.createElement('li');
    insultElem.innerHTML = `${insult.insult} - ${insult.play}`;
    insultsElem.append(insultElem);
  }
}

async function getInsults() {
  const response = await fetch('http://localhost:8000/api/insults');
  const data = await response.json();
  console.log('Data:', data);
  showInsults(data.insults);
}

async function getPlay() {
  const searchTerm = searchInputElem.value;
  const response = await fetch(`http://localhost:8000/api/insults/${searchTerm}`);
  const data = await response.json();
  console.log('Data:', data);
}

async function addInsult() {
  const obj = {
    insult: 'Test',
    play: 'Testar'
  }
  
  const response = await fetch('http://localhost:8000/api/insults', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj)
  });
  const data = await response.json();
}

document.querySelector('#buttonElem').addEventListener('click', () => {
  addInsult();
});

document.querySelector('#getButtonElem').addEventListener('click', () => {
  getInsults();
});

document.querySelector('#searchButtonElem').addEventListener('click', () => {
  getPlay();
});