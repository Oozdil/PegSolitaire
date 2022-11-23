var pins = [];
var defaultValues = [
    -1, -1, 1, 1, 1, -1, -1,
    -1, -1, 1, 1, 1, -1, -1,
    1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 0, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1,
    -1, -1, 1, 1, 1, -1, -1,
    -1, -1, 1, 1, 1, -1, -1,
];
var pinSelected = false;

function SetGameBoardDefaults() {
    for (var i = 0; i < 7; i++) {
        for (var j = 0; j < 7; j++) {
            var value = defaultValues[i * 7 + j];
            const pin = {
                value: value,
                x: j,
                y: i,
                selected: false
            };
            pins.push(pin);
        }
    }
    SetGameBoardPins();

}
function SetGameBoardPins() {
    var gameBoard = document.getElementById("gameBoard");
    gameBoard.innerHTML = "";
    for (var i = 0; i < 7; i++) {
        for (var j = 0; j < 7; j++) {
            var pinButton = document.createElement('div');
            var id = i + "" + j;
            //console.log(id);
            pinButton.setAttribute("onclick", "PinSelect('" + id + "','" + i + "','" + j + "')");
            pinButton.setAttribute('id', id);
            pinButton.setAttribute('class', 'pin pin-empty');
            gameBoard.append(pinButton);
        }
    }
    DrawGameBoard();
}
function DrawGameBoard() {
    for (var i = 0; i < 7; i++) {
        for (var j = 0; j < 7; j++) {
            var value = pins[i * 7 + j].value;
            var selected = pins[i * 7 + j].selected;
            var pinButton = document.getElementById(i + "" + j);


            if (selected) {
                pinButton.setAttribute("class", "pin pin-selected");
            }
            else {

                if (value == 1) {
                    pinButton.setAttribute('class', 'pin pin-full');
                }
                else if (value == 0) {
                    pinButton.setAttribute('class', 'pin pin-empty');
                }
                else {
                    pinButton.setAttribute('class', 'pin pin-passif');
                }
            }
        }
    }
}
function PinSelect(id, i, j) {
    var pinIndex = parseInt(i) * 7 + parseInt(j);
    var selectedPin = pins[pinIndex];
    var value = selectedPin.value;
    var id = i + "" + j;
    var selectedPinButton = document.getElementById(id);
    //pasif alana tıklandı geç
    if (value == -1)
        return;

    //tıklanan alan dolu ise
    if (value == 1) {

        AllPinsNonSelect();
        selectedPin.selected = true;
        DrawGameBoard();
    }

    var selectedPinExists = false;
    for (var a = 0; a < 49; a++) {
        if (pins[a].selected == true) {
            selectedPinExists = true;
            a = 49;
        }
    }


    if (value == 0 && selectedPinExists) {
        MakeMove(i, j);
    }


}
function AllPinsNonSelect() {
    for (var i = 0; i < 49; i++)
        pins[i].selected = false;
}
function MakeMove(i, j) {

    var fromPin;
    for (var a = 0; a < 49; a++) {
        if (pins[a].selected)
            fromPin = pins[a];
    }
    var fromX = parseInt(fromPin.x);
    var fromY = parseInt(fromPin.y);
    var targetX = parseInt(j);
    var targetY = parseInt(i);

    if (fromX == targetX && Math.abs(targetY - fromY) == 2) {
        var removeX = fromX;
        var removeY = (fromY + targetY) / 2;

        pins[removeY * 7 + removeX].value = 0;
        pins[fromY * 7 + fromX].value = 0;
        pins[fromY * 7 + fromX].selected = false;
        pins[targetY * 7 + targetX].value = 1;

        DrawGameBoard();
        //console.log("dikey ==>" + removeX + " " + removeY);
    }
    if (fromY == targetY && Math.abs(targetX - fromX) == 2) {
        var removeY = fromY;
        var removeX = (fromX + targetX) / 2;
        pins[removeY * 7 + removeX].value = 0;
        pins[fromY * 7 + fromX].value = 0;
        pins[fromY * 7 + fromX].selected = false;
        pins[targetY * 7 + targetX].value = 1;
        DrawGameBoard();
        //console.log("yatay ==>" + removeX + " " + removeY);
    }

    WriteRemainigPins();
}
function WriteRemainigPins() {
    var count = 0;
    for (var i = 0; i < 49; i++) {
        if (pins[i].value == 1) {
            count++;
        }
    }
    $("#demo").html(count);
    //    alert(count);
}
function myFunction() {
    document.getElementById("demo").innerHTML = "32";
    pins=[];
    pinSelected=false;
    SetGameBoardDefaults();
  }