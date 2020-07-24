
var Board = [];
const HUMAN = '0';
const COMP = 'x';

// all winning combinations
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
        square.target.innerText = HUMAN;
        Board[square.target.id] = HUMAN;
    }

    else
    {
        return;
    }
    var winHUMAN = checkWin(Board, HUMAN);
    var winCOMP = checkWin(Board, COMP);
    if(winHUMAN[0] === true)
    {
         Winner(winHUMAN[1], HUMAN);
        return;
    }else if(winCOMP[0]===true){
	Winner(winCOMP[1], COMP);
        return;
    }else
    {
        if(checkTie()) 
        {
            return;
        }
        findBestMove(); 
        var winCOMP = checkWin(Board, COMP); 
        if(winCOMP[0] === true) 
        {
            Winner(winCOMP[1], COMP);
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



function checkTie()
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

function Winner(arrange, player)
{
    var text;
    var color;
    if(player === '0') 
    {
        color = 'green';
        text = 'You Win!';
    }
    else
    {
        color = 'red'; 
        text = 'You Lose!';
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
    var emptySpots = []; 
    for (let i = 0; i < board.length; i++)
    { 
        if(typeof board[i] === 'number')
        {
            emptySpots.push(i);
        }
    } 
    return emptySpots;
}

function randomMove()
{
    var empty = emptySquares(Board);
    var item = empty[Math.floor(Math.random() * empty.length)];
    if(item !== null)
    {
        Board[item] = COMP;
        document.getElementById(item).innerText = COMP;
    } 
}

function findBestMove()
{
    var empty = emptySquares(Board);
    var i = empty[Math.floor(Math.random() * empty.length)];
    Board[i] = COMP; 
    document.getElementById(i).innerText = COMP;
}
 

