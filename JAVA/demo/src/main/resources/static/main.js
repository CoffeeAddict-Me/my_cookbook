

function calculate() {
    retrieve()
}


function retrieve() {
    var op1 = document.getElementById("op1").value;
    var op2 = document.getElementById("op2").value;
    var op = document.getElementById("operand").value;
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        document.getElementById("result_box").style = "display:block";
        document.getElementById("result").innerHTML = this.responseText;
    }
    xhttp.open("GET", "./calculator?op1=" + op1 + "&op2=" + op2 + "&op=" + op, true);
    xhttp.send();
}