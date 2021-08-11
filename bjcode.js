let blackjackgame={
	'you':{'scorespan':"#your-blackjack-result",'div':"#your-box",'score':0},
	'dealer':{'scorespan':"#dealer-blackjack-result",'div':"#dealer-box",'score':0},
	'cards':['A','2','3','4','5','6','7','8','9','10','J','K','Q'],
	'cardsmap':{'A':[1,11],'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'J':10,'Q':10,'K':10},
	'wins':0,
	'losses':0,
	'draws':0,
	'isstand':false,
	'completeturn':false
}
const you=blackjackgame['you'];
const dealer=blackjackgame['dealer'];
const hitSound = new Audio('sounds/swish.m4a');
const lossSound = new Audio('sounds/aww.mp3');
const winSound = new Audio('sounds/cash.mp3');
function showcard(card,activeplayer)
{
 if(activeplayer['score']<=21)
 {
  let cardimg=document.createElement('img');
  cardimg.src=`photos/${card}.png`;
  document.querySelector(activeplayer['div']).appendChild(cardimg);
  hitSound.play();	
 }	
}
function pickcard()
{
return blackjackgame['cards'][Math.floor(Math.random()*13)];	
}
function blackjackhit()
{
if(blackjackgame['isstand']==false)
{
 let card=pickcard();
 showcard(card,you);
 updatescore(card,you);
 showscore(you);	
}
}
function bjstand()
{
	dealerlogic();
}
function blackjackdeal()
{
	if(blackjackgame['completeturn']==true)
	{
		blackjackgame['isstand']=false;
		let yourimages=document.querySelector('#your-box').querySelectorAll('img');
		let dealerimages=document.querySelector('#dealer-box').querySelectorAll('img');
		for(let i=0;i<yourimages.length;i++)
		{
			yourimages[i].remove();
		}
		for(let j=0;j<dealerimages.length;j++)
		{
			dealerimages[j].remove();
		}
		you['score']=0;
		dealer['score']=0;
		document.querySelector('#your-blackjack-result').textContent=0;
		document.querySelector('#your-blackjack-result').style.color='white';
		document.querySelector('#dealer-blackjack-result').textContent=0;
		document.querySelector('#dealer-blackjack-result').style.color='white';
		document.querySelector('#blackjack-result').textContent=`Let's Play`;
		document.querySelector('#blackjack-result').style.color='black';
        blackjackgame['completeturn']=false;
	}
}

function updatescore(card,activeplayer)
{
 if(card=='A')
 {
  if(activeplayer['score']+11<=21)
  {
  	activeplayer['score']+=11;
  }
  else
  {
   activeplayer['score']+=1;	
  }	
 }
 else
 {
 	activeplayer['score']+=blackjackgame['cardsmap'][card];
 }	
}
function showscore(activeplayer)
{
	if(activeplayer['score']<=21)
	{
		document.querySelector(activeplayer['scorespan']).textContent=activeplayer['score'];
	}
	else{
		document.querySelector(activeplayer['scorespan']).textContent='Bust';
		document.querySelector(activeplayer['scorespan']).style.color='red';
	}
}
/*function dealerlogic() {
   blackjackgame['isstand'] = true;
   let card = pickcard();
   showcard(card, dealer);
   updatescore(card, dealer);
   showscore(dealer);

   if (dealer['score'] > 15)  {
     blackjackgame['completeturn'] = true;
      //Display the result
     showresult(computewinner());
   }
  
}*/
function sleep(ms)
{
 return new Promise(resolve=>setTimeout(resolve,ms));	
}
async function dealerlogic()
{
blackjackgame['isstand']=true;
while(dealer['score']<=15&&blackjackgame['isstand']==true)
{
	let card=pickcard();
	showcard(card,dealer);
	updatescore(card,dealer);
	showscore(dealer);
	await sleep(1000);
}
blackjackgame['completeturn']=true;
showresult(computewinner());
}

function computewinner()
{
 let winner;
 if(you['score']<=21)
 {
 	if(you['score']>dealer['score']||dealer['score']>21)
 	{
 		blackjackgame['wins']++;
 		winner=you;
 	}
 	else if(you['score']<dealer['score'])
 	{
 		blackjackgame['losses']++;
 		winner=dealer;
 	}
 	else if(you['score']==dealer['score'])
 	{
 		blackjackgame['draws']++;
 		
 	}

 }
 else if(you['score']>21&&dealer['score']<=21)
 {
 	blackjackgame['losses']++;
 	winner=dealer;
 }
 else{
 	blackjackgame['draws']++;
 }
return winner;
}
function showresult(result)
{
	let resultspan=document.querySelector('#blackjack-result');
	if(blackjackgame['completeturn']==true)
	{
	 if(result==you)
	 {
	 	resultspan.textContent='You won';
	 	resultspan.style.color='green';
	 	winSound.play();
	 	document.getElementById('wins').textContent=blackjackgame['wins'];
	 }
	 else if(result==dealer)
	 {
	    resultspan.textContent='You lose';
	 	resultspan.style.color='red';
	 	lossSound.play();
	 	document.getElementById('losses').textContent=blackjackgame['losses'];	
	 }
	 else{
	 	resultspan.textContent='Tie';
	 	resultspan.style.color='yellow';
	 	hitSound.play();
	 	document.getElementById('draws').textContent=blackjackgame['draws'];
	 }	
	}
}

document.querySelector('#hit').addEventListener('click',blackjackhit);
document.querySelector('#stand').addEventListener('click',bjstand);
document.querySelector('#deal').addEventListener('click',blackjackdeal);