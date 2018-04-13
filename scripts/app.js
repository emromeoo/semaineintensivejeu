let onload ="document.write('chargement...')"
let background = document.querySelector(".background")
let stopDetection = ""
let minX = 0
let maxX = 1350
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

   //chaises grise en haut
  ]
let posY = 300
let posX =1100
let dir=0
let press = false
let mauvais =document.querySelector("#mauvais")
let bon =document.querySelector("#bon")
function generatePerso(){
perso = document.getElementById("perso")

}
generatePerso()
if (dir == 0) {
perso.style.imageOrientation="flip"
}

let jouer = document.querySelector('h2')
jouer.addEventListener('click', function(){
  document.querySelector('.Jeu').style.display =  'none'
  document.querySelector(".jeuxX").style.display = "block"
},false )



let deplacement = ()=> {

  window.addEventListener(
    "keypress",
    function(e){
      let stopDetection = 0;
      console.log(e.keyCode)

      console.log(collaps())
      if (e.keyCode==39){
        console.log(dir)
        if(collaps(posX+1, posY)){
          posX += 10
          perso.style.left = posX + "px"
          dir=1
          press = true
        }
      }
      else if (e.keyCode==37){
        console.log(dir)
        if(collaps(posX-1, posY)){
          posX -=10
          perso.style.left = posX + "px"
          dir=3
          press = true
        }
       }
       else if (e.keyCode == 38){
         if(collaps(posX, posY-1)){
           posY -=10
           perso.style.top = posY + "px"
           dir=0
           press = true
         }
       }
       else if (e.keyCode==40){
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
function collaps(posX, posY) {
  for (let i = 0; i < obstacles.length; i++) {
    if ((posX > obstacles[i].xmin && posX < obstacles[i].xmax)  && (posY > obstacles[i].ymin && posY < obstacles[i].ymax)){
      return 0;
    }
  }
  return 1;
}





function afficheElements()
{
stopDetection = 0;
let elemX = Math.floor(Math.random()*1350 );
let elemY = Math.floor(Math.random()*650);
let elemType = Math.floor(Math.random()*2);
if (elemType == 0)
{

  bon.style.left=elemX+"px"
  bon.style.top=elemY+"px"
  bon.style.display = "block"

  console.log(elemX,elemY)
}
else
 {

  mauvais.style.left=elemX+"px"
  mauvais.style.top=elemY+"px"
  mauvais.style.display = "block"
  bon.style.display = "none"
    console.log(elemX,elemY)
}
}

function collisions()
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
     }
     else
     {
       let nbMauvais = parseInt($('#info2').text())+1;
       $('#info2').text(nbMauvais);
       let score = parseInt($('#info3').text())-5;
       $('#info3').text(score);
       $('#mauvais').css('display', 'none');
     }
   }
 }


 setInterval(afficheElements, 5000);
 setInterval(collisions, 500);
