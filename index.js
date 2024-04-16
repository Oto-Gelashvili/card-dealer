let buttons = document.querySelectorAll("button");
let cards = [2,3,4,5,6,7,8,9,10,"J","Q","K","A"];
let suits = ["\u2665", "\u2666", "\u2663", "\u2660"];
let output = [];
const gamesInfo = {
    bura3: {
      name: 'bura3',
      startingIndex: 8,
      player: 2,
      cardsPerPerson: 3,
      endingIndex: cards.length
    },
    bura5: {
      name: 'bura5',
      startingIndex: 4,
      player: 2,
      cardsPerPerson: 5,
      endingIndex: cards.length
    },
    poker: {
        name: 'poker',
        startingIndex: 0,
        player: 5,
        cardsPerPerson: 2,
        endingIndex: cards.length
      },
    joker: {
        name: 'joker',
        startingIndex: 4,
        player: 4,
        cardsPerPerson: 9,
        endingIndex: cards.length
    }
};

// slider 
const slider = document.getElementById("customSlider");
const sliderValue = document.querySelector(".slider-value");
const sliderValueContainer = document.querySelector(".value-container");
  slider.oninput = function() {
    sliderValue.innerHTML = this.value;
    gamesInfo.poker.player = this.value;
    
  };
function outputCards(name){
  output = [];
  for(let i= gamesInfo[name].startingIndex;i<gamesInfo[name].endingIndex;i++){
      for(let j=0;j<suits.length;j++){
          output.push(cards[i] + " of " + suits[j]);
      }
  }
  if(name == 'joker'){
    let sixOfHeartsIndex = output.indexOf(`6 of \u2665`);
    output.splice(sixOfHeartsIndex, 1, "joker");
    let sixOfdiaIndex = output.indexOf("6 of \u2666");
    output.splice(sixOfdiaIndex, 1, "joker");
  }
}
for (let z = 0; z < buttons.length; z++) {
    buttons[z].addEventListener('click', function() {
      if(this.innerHTML == "BURA3" ||this.innerHTML == "BURA5" ||this.innerHTML == "POKER" ||this.innerHTML ==  "JOKER"){
      outputCards(this.innerHTML.toLowerCase());
      let initialOutputSize = output.length;
      this.innerHTML="";
      this.style.fontSize = "1.4rem"; 
      this.style.display = "grid"; 
      this.style.gap = "1rem"
      this.style.placeItems = "center"; 
      this.style.gridTemplateColumns = `repeat(${gamesInfo[this.classList[1]].player}, 1fr)`; 
      while(output.length>initialOutputSize-gamesInfo[this.classList[1]].cardsPerPerson * gamesInfo[this.classList[1]].player){
          const newElement = document.createElement("div");
          let randomIndex = Math.floor(Math.random() * output.length);
          let randomCard = output[randomIndex];
          output.splice(randomIndex, 1);
          newElement.textContent = randomCard;
          if(newElement.textContent.includes(`\u2665`) || newElement.textContent.includes( `\u2666`)){
            newElement.style.color = " #CC0300";
          }
          this.appendChild(newElement);
      }
    }else {
        this.style.fontSize = "3.2rem"; 
        this.style.display = "flex"; 
        this.innerHTML=this.classList[1].toUpperCase();
      }
    });
}
