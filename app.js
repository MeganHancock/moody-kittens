let kittens = []


// const randomKittenImage = Math.floor(Math.random() * kittenImage.length);
// console.log(random, months[random]);

/**
 * Called when submitting the new Kitten Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * then add that data to the kittens list.
 * Then reset the form
 */
function addKitten(event) {
    event.preventDefault()
    let form = event.target

    let kitten = {
        id: generateId(),
        name: form.name.value,
        mood: '5',
        affection: 5,
    }

    kittens.push(kitten)
    saveKittens()
    form.reset()
}

/**
 * Converts the kittens array to a JSON string then
 * Saves the string to local storage at the key kittens 
 */
function saveKittens() {
  window.localStorage.setItem("kittens", JSON.stringify(kittens));
  drawKittens()
}

/**
 * Attempts to retrieve the kittens string from local storage
 * then parses the JSON string into an array. Finally sets
 * the kittens array to the retrieved array
 */
function loadKittens() {
  let storedKittens = JSON.parse(window.localStorage.getItem("kittens"))
  if (storedKittens) {
    kittens = storedKittens
  }
  
}

/**
 * Draw all of the kittens to the kittens element
 */
function drawKittens() {
  let kittenCardElement = document.getElementById("kitten-card")
  let kittenCardTemplate = ""
  kittens.forEach(kitten => {
    if (kitten) {
        kittenCardTemplate += `
            <div id="kittens" class="d-flex justify-content-center align-items-center flex-wrap card w-25">
                <img id="spooky-cat" src="spooky-big-eyes-cat.png" class="kitten-img" alt="kitten">
                <h2 class="name-tag">${kitten.name}</h2>
                <h4 class="mood">Mood: ${kitten.mood}</h4>
                <button class="interaction" onclick="pet('${kitten.id}')"><big>Pet</big></button>
                <button class="interaction" onclick="ignore('${kitten.id}')"><big>Ignore</big></button>
                <button class="interaction delete" onclick="deleteKitten('${kitten.id}')"><big>💀</big></button>
            </div>
        `;
    }
  });
    kittenCardElement.innerHTML = kittenCardTemplate
    
}

function deleteKitten(kittenId) {
  let index = kittens.findIndex(kitten => kitten && kitten.id === kittenId)
  if (index === -1) {
    throw new Error("Invalid Kitten ID");
  }
  kittens.splice(index, 1)
  saveKittens()

}


// /**
//  * Find the kitten in the array by its id
//  * @param {string} id 
//  * @return {Kitten}
// //  */
function findKittenById(id) {
let currentKitten = kittens.find(kitten => kitten && kitten.id === id);
return currentKitten;
}


// // /**
//  * Find the kitten in the array of kittens
//  * Generate a random Number
//  * if the number is greater than .5 
//  * increase the kittens affection
//  * otherwise decrease the affection
//  * @param {string} id 

function pet(id) {
  let currentKitten = findKittenById(id)

  if (currentKitten ) {
    if (Math.random() < 0.5 ){
    currentKitten.mood++;
  } else {
    currentKitten.mood--;
  }
  console.log("pet cat")
  // setKittenMood()
  saveKittens()
  
}}

/**
 * Find the kitten in the array of kittens
 * Set the kitten's mood to tolerant
 * Set the kitten's affection to 5
 * @param {string} id
 */
function ignore(id) {
  let currentKitten = findKittenById(id)
  if(currentKitten.mood < 10) {
  currentKitten.mood++;
  // setKittenMood()
  saveKittens()
  console.log("ignore cat")
}}

/**
 * Sets the kittens mood based on its affection
 * @param {Kitten} kitten 
 */
// function setKittenMood(kitten) {
//   let currentKitten = findKittenById(kitten)
//   let kittenImg = document.getElementById("spooky-cat").sheet;
//   if(currentKitten.mood <= 3){
//     kittenImg.insertRule("kitten.angry");
//   } else if(currentKitten.mood >= 7){
//     kittenImg.insertRule("kitten.happy");
//   } else {
//     kittenImg.insertRule("kitten.tolerant");
//   }
// }

/**
 * Removes all of the kittens from the array
 * remember to save this change
 */
// function clearKittens(){
// localStorage.clear();
// location.reload();
// }

// function showButton(){
//   document.getElementById("clearKittens").removeAttribute('hidden');
// }
/**
 * Removes the welcome content and should probably draw the 
 * list of kittens to the page. Good Luck
 */
function getStarted() {
  document.getElementById("welcome").remove();
drawKittens()

}



// --------------------------------------------- No Changes below this line are needed

/**
 * Defines the Properties of a Kitten
 * @typedef {{id:string, name: string, mood: string, affection: number}} Kitten
 */


/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return Math.floor(Math.random() * 10000000) + "-" + Math.floor(Math.random() * 10000000)
}

loadKittens()