//mot complet à deviner
const wordElement = document.getElementById('word');
//mauvaises lettres ( à droite)
const badLetter = document.getElementById('bad-letters');
//bouton popup pour rejouer
const tryAgain = document.getElementById('play-button');
//tout le popup final
const popup = document.getElementById('popup-contenant');
//notification lettre dupliquée
const notification = document.getElementById('notification-contenant');
//message du popup selon résultat (success/fail)
const popupMessage = document.getElementById('final-message');

//toutes les parties du corps ensemble pas de byID
const figurePartie = document.querySelectorAll('.figure-partie');
let test = "toto";
// proposer les mots à deviner
const words = ['cardiologie', 'astronaute', 'ouverture', 'voyager', 'amoureux', 'spiderman',
    'labyrinthe', 'quadriceps ', 'rhododendron', 'chlorophylle ', 'aventurier', 'subjective', 'chevreuil', 'girafe', 'devinette'
];

//sélectionner un mot pour jouer
let selectedWord = words[Math.floor(Math.random() * words.length)];

console.log(selectedWord);

const goodLettersArray = [''];
const badLettersArray = [];

// Afficher le mot caché
function displayWord() {

    wordElement.innerHTML = `
    ${selectedWord
            .split('')
            .map(
                letter => `
                <span class="letter"> 
                ${goodLettersArray.includes(letter) ? letter : '' } 
                </span>
                `
                
            )
            .join('')
              }  
            `;
            
            //console.log(selectedWord+'1');
            //bonnes lettres mais une en dessous des autres
            //console.log(wordElement.innerText);
            //je veux afficher à côté
            /*
            from w3school
            remplace blue par red
            let res = str.replace(/blue/g, "red");
            test mot !! attention!! échappement 
            let alignLetters = str.replace(/\n/g, " ");
            */
           
            const alignLetters = wordElement.innerText.replace(/\n/g, ""); //PORONNNEEEEE!!! un espace fait toute la diff ^^
            console.log(alignLetters);
            
            // si le mot aligné est = au mot sélectionné
            if(alignLetters === selectedWord){
              //popupMessage.innerText = 'Bravo tu as gagné!';
              popupMessage.innerText = 'Vous avez gagné!';
              popup.style.display = 'flex';
            }
           
           

}
// map() va passer 1 à 1 les items du array

// Mauvaises lettres
function updateBadLetters(){
    // Afficher les mauvaises lettres
    badLetter.innerHTML = `
    ${badLettersArray
            .map(
                letter => `
                <span> 
                ${letter}
                </span>
                `
            )
              }  
            `;

    // Afficher les parties du bonhomme - figurePartie - partie = figure - index = le compte de mauvaises lettres
    figurePartie.forEach((partie,index) => {
        const errors = badLettersArray.length;

        if(index < errors){
            //alors tu montres une partie
            partie.style.display ='block';

        }else{
            //tun montres pas de partie
            partie.style.display ='none';
        }
    }
    
    )
    // Fail? popupMessage passe à perdu - figurePartie va comprendre toutes car selectALL
    if(badLettersArray.length === figurePartie.length){
        popupMessage.innerText = 'Vous avez perdu! Le mot était : '+selectedWord;
              popup.style.display = 'flex';
    }
}

// Afficher notification 
function displayNotification (){
    //ajouter une classe à la balise car on l'a indiqué dans le css
    notification.classList.add('afficher');
    setTimeout(() => {
        //on veut que la notif disparaîsse après 3sec
        notification.classList.remove('afficher')
    }, 2000);
}

// event listeners de 65 à 90 de A à Z
document.addEventListener('keydown', function(e) {

    //console.log(e.keyCode);
    if(e.keyCode >= 65 && e.keyCode <= 90){
        const letter = e.key;
          console.log(letter);

        //si la lettre se trouve dans le mote ( ==> parcourir le mot choisi)
        if(selectedWord.includes(letter)){

            if(!goodLettersArray.includes(letter)){
        
                goodLettersArray.push(letter)
        
                displayWord();
            }
            else{
                //afficher "lettre déjà insérée"
                displayNotification();

            }
        }
        //si ça n inclue pas la bonne lettre, ajouter au array de mauvaises lettres
        else{
        
            if(!badLettersArray.includes(letter)){
                badLettersArray.push(letter);
                console.log('la lettre '+letter+' est incorrecte');
                updateBadLetters();
            }
            /* else{
                //displayNotification();
                
            } */
        
        } 
        
    }

})


//button  #play-button

    tryAgain.addEventListener('click', () => {
        // Vider les arrays
        //attention 1 de décalage
        badLettersArray.splice(0);
        goodLettersArray.splice(0);
        console.log(goodLettersArray);
        console.log(badLettersArray);
    
        selectedWord = words[Math.floor(Math.random() * words.length)];
        popup.style.display = 'none';
        location.reload(); //et ouais ma belle :-) you've just do it!!!!!!!!!!!!!! <3
        
        
    })



// call function
displayWord();