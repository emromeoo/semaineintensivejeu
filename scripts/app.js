let onload ="document.write('chargement...')"
let background = document.querySelector(".background")
let stopDetection = ""
let minX = 0
let maxX = 1350

// création des collisions
let obstacles =  [
  {ymin:120, ymax: 190, xmin: 60, xmax:190},
  {ymin:170, ymax: 350, xmin: 550, xmax:670},
  {ymin:450, ymax: 550, xmin: 170, xmax:290},
  {ymin:70, ymax: 170, xmin: 910, xmax:1030},
  {ymin:10, ymax: 190, xmin: 1220, xmax:1360},
  {ymin:460, ymax: 600, xmin: 930, xmax:990},
  {ymin:450, ymax: 510, xmin: 990, xmax:1140},
  {ymin:510, ymax: 600, xmin: 1080, xmax:1150},
  {ymin:-70, ymax: 670, xmin: -60, xmax:40},
  {ymin:660, ymax: 670, xmin: 40, xmax:1450},
  {ymin:-120, ymax: -40, xmin: 30, xmax:1450},
  {ymin:-120, ymax: -40, xmin: -70, xmax:40},
  {ymin:-70, ymax: 661, xmin: 1380, xmax:1450},

 //collisions de la map
]


// position de départ du joueur
let posY = 300
let posX =1100
// les variables
let dir=0
let press = false
let mauvais =document.querySelector("#mauvais")
let bon =document.querySelector("#bon")

// création du personnage
function generatePerso(){
perso = document.getElementById("perso")

}
generatePerso()
if (dir == 0) {
perso.style.imageOrientation="flip"
}

// choix de l'image à éviter

//let mechant = ['images/julien.png','images/mauvais.gif','images/mauvais2.gif','images/mauvais3.gif']
//let goods = ['images/bon.gif','images/francesca.png']
/*function julien(){
  let mechantRandom = Math.floor(Math.random()*1000)
  if (mechantRandom <1) {
    creatureM.style.background = mechant[0]
  }
  let numRandom = Math.floor(Math.random()*(mechant.length - 1))
  creatureM.style.background = mechant[numRandom+1]
}

// choix de l'image à ramasser
function francesca(){
  let randomGoods = Math.floor(Math.random()*1000)
  if (randomGoods < 1) {
    creatureG.style.background = goods[1]
  }
  else {
    creatureG.style.background = goods[0]
  }
}*/

// changement d'état au clic du bouton "play"

let jouer = document.querySelector('h2')
jouer.addEventListener('click', function(){
  document.querySelector('.Jeu').style.display =  'none'  // changement d'état
  document.querySelector(".jeuxX").style.display = "block"
},false )


// fonction de déplacement du personnage
let deplacement = ()=> {

  window.addEventListener(
    "keypress",
    function(e){
      let stopDetection = 0;


      console.log(collaps())
      if (e.keyCode==100){            // déplacepment à l'enfoncement de certaines touches
        if(collaps(posX+1, posY)){
          posX += 10
          perso.style.left = posX + "px"
          dir=1
          press = true
        }
      }
      else if (e.keyCode==11){
        console.log(dir)
        if(collaps(posX-1, posY)){
          posX -=10
          perso.style.left = posX + "px"
          dir=3
          press = true
        }
       }
       else if (e.keyCode == 122){
         if(collaps(posX, posY-1)){
           posY -=10
           perso.style.top = posY + "px"
           dir=0
           press = true
         }
       }
       else if (e.keyCode==115){
         if(collaps(posX, posY+1)){
           posY +=10
           perso.style.top = posY + "px"
           dir = 2
           press = true
         }
       }
  })

}
deplacement();

//fonction de collision
function collaps(posX, posY) {
  for (let i = 0; i < obstacles.length; i++) {
    if ((posX > obstacles[i].xmin && posX < obstacles[i].xmax)  && (posY > obstacles[i].ymin && posY < obstacles[i].ymax)){
      return 0;
    }
  }
  return 1;
}



// affichage des personnages bon et mauvais

function afficheElements()
{
stopDetection = 0;
let elemX = Math.floor(Math.random()*1350 ); // position de l'image
let elemY = Math.floor(Math.random()*650);
let elemType = Math.floor(Math.random()*2); // choix du type d'image
if (elemType == 0)
{
  //francesca()                     // appel de la fonction
  bon.style.left=elemX+"px"           // positionnement de l'image
  bon.style.top=elemY+"px"
  bon.style.display = "block"

  console.log(elemX,elemY)
}
else
 {
   //julien()
  mauvais.style.left=elemX+"px"
  mauvais.style.top=elemY+"px"
  mauvais.style.display = "block"
  bon.style.display = "none"        // supprime l'image bonne, nécessite plus de rapidité
    console.log(elemX,elemY)
}
}

function collisions()         // collision entre les personnages
 {
   posX = parseInt($('#perso').css('left'));
   posY = parseInt($('#perso').css('top'));
   if ($('#bon').css('display') == 'none')
   {
     elemType = 'mauvais';
     elemX = parseInt($('#mauvais').css('left'));
     elemY = parseInt($('#mauvais').css('top'));
   }
   else
   {
     elemType = 'bon';
     elemX = parseInt($('#bon').css('left'));
     elemY = parseInt($('#bon').css('top'));
   }
   if ((elemX>posX-20) && (elemX<(posX+125-50+20)) && (elemY>posY-20) && (elemY<(posY+177-116+20)) && (stopDetection == 0))
   {
     stopDetection = 1;
     if (elemType=='bon')
     {
       var nbBon = parseInt($('#info1').text())+1;
       $('#info1').text(nbBon);
       var score = parseInt($('#info3').text())+5;
       $('#info3').text(score);
       $('#bon').css('display', 'none');
       //youWin()
     }
     else
     {
       let nbMauvais = parseInt($('#info2').text())+1;
       $('#info2').text(nbMauvais);
       let score = parseInt($('#info3').text())-5;
       $('#info3').text(score);
       $('#mauvais').css('display', 'none');
       //gameOver()
     }
   }
 }


 setInterval(afficheElements, 5000);    // temps entre deux images à afficher
 setInterval(collisions, 500);          //interval de regardde collision

/*
 function gameOver(){
   if (nbMauvais == 3 || julien == 1 ) {
     setTimeOut(
       function  lose(){
         rouge.style.display = "inline-block"
         tableau.style.display = 'inline-block'
       },8000
     )
     rouge.style.display = 'none'
     document.querySelector('.Jeu').style.display =  'none' // changement d'état
     document.querySelector(".jeuxX").style.display = "block"
   }

 }

 function youWin(){
   if (tabScore == 25 || francesca == 1 || userName == 'OnEstDansLaMerde' ) {
     setTimeOut(
       function  win(){
         vert.style.display = "inline-block"
         tableau.style.display = 'inline-block'
       },8000
     )
     vert.style.display = 'none'
     document.querySelector('.Jeu').style.display =  'none' // changement d'état
     document.querySelector(".jeuxX").style.display = "block"
   }

 }*/
