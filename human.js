
var Board = [];
const Player1 = '0';
const Player2 = 'x';

// all winning combinations
var count=0;
const winCombinations =
[
    [0,1,2], 
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8], 
    [0,4,8],
    [6,4,2]  
];

const cells = document.querySelectorAll('.cell');

startGame();

function startGame()
{
    document.querySelector(".endgame").style.display = "none";
    Board = Array.from(Array(9).keys());
    
    for(var i = 0; i < cells.length; i++)  
    {

        cells[i].innerText = '';
        cells[i].style.removeProperty('background-color');
        cells[i].addEventListener('click', turnClick, false);
    }
}

function turnClick(square)
{

    if(typeof Board[square.target.id] === 'number')
    {
	if(count===0){
        square.target.innerText = Player1;
        Board[square.target.id] = Player1;
	count=1;
 	}else{
	square.target.innerText = Player2;
        Board[square.target.id] = Player2;
	count=0;
	}
    }

    else
    {
        return;
    }
    var winp1 = checkWin(Board, Player1);
    var winp2 = checkWin(Board, Player2);
    if(winp1[0] === true)
    {
        declareWinner(winp1[1], Player1);
        return;
    }
    else if(winp2[0] === true){
	declareWinner(winp2[1], Player2);
        return;

    }else{
        if(checkdraw()) 
        {
            return;
        }
        
    }
    
}

 
function checkWin(board, player)
{
    for (let i = 0; i < winCombinations.length; i++) 
    {
        if(board[winCombinations[i][0]] === player && board[winCombinations[i][1]] === player && board[winCombinations[i][2]] === player) 
        {
            return [true, winCombinations[i]]; 
        }
    }
    return false;
}


function checkdraw()
{
    
    if(emptySquares(Board).length === 0) 
    {
        for (let i = 0; i < cells.length; i++) 
        {
            cells[i].removeEventListener('click', turnClick, false); 
            cells[i].style.backgroundColor = 'blue'; 
            
        }
        document.querySelector(".endgame").style.display = "block"; 
        document.querySelector(".endgame .text").innerText = "Tie!"; 
        return true;
    }
    return false; 
}

function declareWinner(arrange, player)
{
    var text;
    var color;
    if(player === '0') 
    {
        color = 'green';
        text = 'Player1(0) Win!';
    }
    else
    {
        color = 'red'; 
        text = 'Player2(X) Won!';
    }
    for(let i = 0; i < arrange.length; i++)
    {
        document.getElementById(arrange[i]).style.backgroundColor = color; 
    }

    for (let index = 0; index < cells.length; index++) 
    {
        cells[index].removeEventListener('click', turnClick, false);
    }

    document.querySelector(".endgame").style.display = "block";
    document.querySelector(".endgame .text").innerText = text;
}

function emptySquares(board)
{
    var emptySpaces = []; 
    for (let i = 0; i < board.length; i++)
    { 
        if(typeof board[i] === 'number')
        {
             
            emptySpaces.push(i);
        }
    } 
    return emptySpaces;
    
}




 

 

