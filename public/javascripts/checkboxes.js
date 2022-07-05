let checkAllTrig = 0;
document.getElementById("checkallbox").onclick = hi;
let max = document.getElementsByClassName("checkbox").length;

function hi() {
    if(!checkAllTrig){
        for(let k = 1; k < max + 1; k++){
            document.getElementById("checkbox" + k).checked = true;
        }
        checkAllTrig = 1;
    } else {
        for (let k = 1; k < max + 1; k++) {
            document.getElementById("checkbox" + k).checked = false;
        }
        checkAllTrig = 0;
    }
}