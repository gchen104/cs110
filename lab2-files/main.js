let current_player = "X"
let x_score = 0
let o_score = 0
document.querySelectorAll('.row').forEach(cell => cell.addEventListener('click', cellClicked));
displayed_msg = document.getElementById("display_player")
displayed_msg.innerHTML = "<h2>X</h2>"
/*
for(var i=0;i<boxes.length;i++)
{
    boxes[i].addEventListener('click', alert("pressed box"))
}
*/

/* All beginning variables above */

function player_change(){
    if (current_player == "X")
        current_player = "O"
    else
        current_player = "X"
}
function cellClicked (event) {
    console.log("<h1>test test test </h1>")
    console.log(event.target.id)
    document.getElementById(event.target.id).style.backgroundColor = "green";


}


