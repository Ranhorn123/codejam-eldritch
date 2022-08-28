import {
    brownCards,
    blueCards,
    greenCards
} from "./data/mythicCards/index.js"
import ancientsData from "./data/ancients.js";
const card1= document.querySelector('.card-1');
const last_card=document.querySelector('.last-card')
const cardPull={
    greenCards: new Set([]),
    blueCards: new Set([]),
    brownCards: new Set([]),
};
let stack =[];
const ansCont = document.querySelector('.ancients-container');
let ancient=  {
    firstStage: {
        greenCards: 0,
        blueCards: 0,
        brownCards: 0,
      },
      secondStage: {
        greenCards: 0,
        blueCards: 0,
        brownCards: 0,
      },
      thirdStage: {
        greenCards: 0,
        blueCards: 0,
        brownCards: 0,
      }
};



function createstage(shema){
    let green =[]
    let blue=[]
    let brown=[]
   
    while(green.length < shema.greenCards){
        const random=Random(greenCards.length);
        // console.log(random)
        if (!cardPull.greenCards.has(greenCards[random])){
            green.push(greenCards[random])
            cardPull.greenCards.add(greenCards[random])
        }
    }
    while(blue.length < shema.blueCards){
        const random=Random(blueCards.length);
        if (!cardPull.blueCards.has(blueCards[random])){
            blue.push(blueCards[random])
            cardPull.blueCards.add(blueCards[random])
        }
    }
    while(brown.length < shema.brownCards){
        const random=Random(brownCards.length);
        if (!cardPull.brownCards.has(brownCards[random])){
            brown.push(brownCards[random])
            cardPull.brownCards.add(brownCards[random])
        }
    }
  let summ=[...green,...blue,...brown];
  let rezul=[];
    while (summ.length>0){
        let x=summ.splice(Random(summ.length),1)
        rezul.push(...x)
    } return rezul
}


// cardPull.greenCards.add(greenCards[0])
// console.log(ancient.firstStage)

function createStack () {
    const stage1=createstage(ancient.firstStage);
    const stage2=createstage(ancient.secondStage);
    const stage3=createstage(ancient.thirdStage);
    
    cardPull.greenCards= new Set([])
    cardPull.blueCards= new Set([])
    cardPull.brownCards= new Set([])
    // console.log(stage3.concat(stage2).concat(stage1)) 
       
    return stage3.concat(stage2).concat(stage1)
}


function Random (num){
    return Math.floor(Math.random()*num)
}
// console.log(greenCards.length)



function collor (e) {
    let n=document.querySelectorAll('.ancients-card');
    n.forEach(e=>{ e.classList.remove('border-black')})
    e.target.classList.add('border-black');
}



ancientsData.forEach(item=>{
    const card = document.createElement('img')
    card.index=item.id
    card.src=item.cardFace
    card.classList.add('ancients-card')
    card.addEventListener('click',(e)=>{
        collor(e);
        ancient=item;
        // createStack();
       stack=createStack();
      
        
    })
    ansCont.append(card)
}) 


let deck =document.querySelector('.deck')
deck.addEventListener('click',popCard)

function popCard (){
    let x=stack.pop()
    if(stack.length != 0){
        last_card.style.backgroundImage=`url(${x.cardFace})`
    }else{
        last_card.style.backgroundImage='none';
    }

}