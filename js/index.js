// DOM Content Loaded - Event Listener
// Fetch the monsters from monsters.json
// Display data from response.json - limit to 50
// Body should contain name, age, & description

// Create form w/ name, age, description
// Create a button (w/ placeholder name)
// Button event takes values from form and saves to API (POST)

// Create another button that when clicked, displays 50 more monsters

document.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM')
    createForm()
    submitButton()
    createLoadMoreButton()
})

let offest = 0

function displayMonsters() {
    fetch('http://localhost:3000/monsters?_limit=50')
    .then((resp) => resp.json())
    .then((data) => {
        const dinoList = document.createElement('ul')
        const dinoContainer = document.body

        data.forEach((monster) => {
            const monsterData = document.createElement('li')
            monsterData.innerHTML = `Name: ${monster.name}<br>Age: ${monster.age}<br>Description: ${monster.description}`
            dinoList.appendChild(monsterData)
        })
        dinoContainer.appendChild(dinoList)
    })
}
displayMonsters()

function createForm() {
    const createMonsterContainer = document.getElementById('create-monster')

    const form = document.createElement('form')

    const createName = document.createElement('input')
    createName.type = 'text'
    createName.name = 'name'
    createName.placeholder = 'name'
    createName.id = 'dino-name'

    const createAge = document.createElement('input')
    createAge.type = 'text'
    createAge.name = 'age'
    createAge.placeholder = 'age'
    createAge.id = 'dino-age'

    const createDescription = document.createElement('input')
    createDescription.type = 'text'
    createDescription.name = 'description'
    createDescription.placeholder = 'description'
    createDescription.id = 'dino-description'

    const createButton = document.createElement('input')
    createButton.type = 'submit'
    createButton.value = 'Create Dinosaur'
    createButton.id = "dino-button"

    form.appendChild(createName)
    form.appendChild(createAge)
    form.appendChild(createDescription)
    form.appendChild(createButton)

    createMonsterContainer.appendChild(form)
}

function submitButton() {
    const button = document.querySelector('form');
    const newName = document.getElementById('dino-name');
    const newAge = document.getElementById('dino-age');
    const newDescription = document.getElementById('dino-description');
    const newMonsterContainer = document.getElementById('monster-container');
    const dinoul = document.createElement('ul');
  
    let existingMonsters = []; // Array to store the existing monsters
  
    // Fetch the existing monsters from the server
    fetch('http://localhost:3000/monsters?_limit=50')
      .then((resp) => resp.json())
      .then((data) => {
        existingMonsters = data;
      });
  
    const handleSubmit = (event) => {
      event.preventDefault();
  
      // Check if the new monster already exists
      const monsterExists = existingMonsters.some((monster) => {
        return (
          monster.name === newName.value &&
          monster.age === newAge.value &&
          monster.description === newDescription.value
        );
      });
  
      if (monsterExists) {
        console.log('Monster already exists');
        return;
      }
  
      fetch('http://localhost:3000/monsters', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: newName.value,
          age: newAge.value,
          description: newDescription.value,
        }),
      })
        .then((resp) => resp.json())
        .then((data) => {
          const newMonsterDataList = document.createElement('li');
          newMonsterDataList.innerHTML = `Name: ${data.name}<br>Age: ${data.age}<br>Description: ${data.description}`;
          dinoul.appendChild(newMonsterDataList);
          newMonsterContainer.appendChild(dinoul);
          existingMonsters.push(data); // Add the new monster to the existing monsters array
        });
  
      newName.value = '';
      newAge.value = '';
      newDescription.value = '';
    };
  
    button.addEventListener('submit', handleSubmit);
  }

function createLoadMoreButton() {
    const loadMoreButton = document.createElement("button");
    loadMoreButton.textContent = "Load More";
    loadMoreButton.addEventListener("click",loadMoreMonsters);
    document.body.appendChild(loadMoreButton);
}

function loadMoreMonsters() {
    offest += 50

    fetch(`http://localhost:3000/monsters?_limit=50&_offset=${offset}`)
    .then((resp) => resp.json())
    .then((data) => {
      displayMonsters(data);
    });
}