var current_player = "X"
var x_score = 0
var o_score = 0
var turn_count = 0
var game_board = {'7' : ' ', '8' : ' ', '9' : ' ',
                 '4' : ' ', '5' : ' ', '6' : ' ',
                 '1' : ' ', '2' : ' ', '3' : ' ',
                }
document.querySelectorAll('.row').forEach(cell => cell.addEventListener('click', cellClicked))
document.querySelector('.reset').addEventListener('click', resetClicked);
displayed_msg = document.getElementById("display_player")
displayed_msg.innerHTML = current_player




/* All beginning variables above */

function player_change(){
    console.log("changing player")
    if (current_player == "X")
        current_player = "O";
    else
        current_player = "X";
    displayed_msg.innerHTML = current_player
}

function submit_move(event){
    game_board[event.target.id] = current_player;
    console.log("he placed: " + game_board[event.target.id])
    turn_count += 1
    if (turn_count > 3)
        console.log(game_board['7'] === game_board['8'] && game_board['8'] === game_board['9'])
        if (game_board['7'] === game_board['8'] === game_board['9'])
            console.log("winner!")
        else if (game_board['7'] === game_board['8'] && game_board['8'] === game_board['9'])
            console.log("winner!")
        else if (game_board['3'] === game_board['6'] && game_board['6'] === game_board['9'])
            console.log("winner!")
        else if (game_board['4'] === game_board['5'] && game_board['5'] === game_board['6'])
            console.log("winner!")
        else if (game_board['1'] === game_board['2'] && game_board['2'] === game_board['3'])
            console.log("winner!")
        else if (game_board['2'] === game_board['5'] && game_board['5'] === game_board['8'])
            console.log("winner!")
        else if (game_board['1'] === game_board['4'] && game_board['4'] === game_board['7'])
            console.log("winner!")
        else if (game_board['1'] === game_board['5'] && game_board['5'] === game_board['9'])
            console.log("winner!")
        else if (game_board['3'] === game_board['5'] && game_board['5'] === game_board['7'])
            console.log("winner!")
    console.log("he moved at: " + event.target.id);
    // Move is done

    player_change(current_player)
}
function cellClicked (event) {
    console.log("<h1>test test test </h1>")
    console.log(event.target.id)
    document.getElementById(event.target.id).style.backgroundColor = "rgb(238, 121, 140)";
    document.getElementById(event.target.id).innerHTML = current_player;
    submit_move(event)
}

function resetClicked(){
    console.log("reset clicked")
    location.reload()
}


