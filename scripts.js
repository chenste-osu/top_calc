var memory = {
    currentNum: ["0"],
    operator: [],
    prevNum: "",
    operatorPressed: false
};

function setOpPress(binary) {
    memory.operatorPressed = binary;
}

function parseCurrent() {
    // check and convert number to a float
    let curr = memory.currentNum.join("");
    curr = parseFloat(curr);
    if (!isNaN(curr)) {
        return curr;
    }
}

function parsePrev() {
    if (memory.prevNum === "") {
        return "";
    }
    let prev = parseFloat(memory.prevNum);
    if (!isNaN(prev)) {
        return prev;
    }
}

function parseOp() {
    if (!isOpEmpty()) {
        return memory.operator[0];
    }
}

function isNumEmpty() {
    if (memory.currentNum.length == 1 && memory.currentNum[0] == "0") {
        return true;
    } else {
        return false;
    }
}

function isPrevEmpty() {
    if (memory.prevNum === "") {
        return true;
    } else {
        return false;
    }
}

function isOpEmpty() {
    if (memory.operator.length == 0) {
        return true;
    } else {
        return false;
    }
}

function isNumFull(digits) {
    if (memory.currentNum.length > digits) {
        return true;
    } 
    return false;
}

function storeNum(num) {
    memory.prevNum = num;
}

function storeOp(op) {
    clearOp();
    memory.operator.push(op);
}

function delOp() {
    memory.operator.pop();
}

function clearNum() {
    memory.currentNum.length = 0;
}

function clearOp() {
    if (!isOpEmpty()) {
        memory.operator.pop();
    }
}

function clearPrev() {
    memory.prevNum = "";
}

function firstZeroPop() {
    if (memory.currentNum.length == 1 && isNumEmpty()) {
        memory.currentNum.pop();
    }
}

function updateDisplay(num) {
    if (num.toString().length > 10) {
        num = "OVERFLOW";
    }
    let display = document.getElementById("display");
    display.textContent = num;
}

function operate() {
    let prevnum = parsePrev();
    let currentnum = parseCurrent();
    let operator = parseOp();
    let result = "";

    console.log("operate activated")
    console.log("prevnum", prevnum);
    console.log("currentnum", currentnum);
    console.log("operator", operator);

    if (operator == "+") {
        result = prevnum + currentnum;
    } else if (operator == "-") {
        result = prevnum - currentnum;
    } else if (operator == "*") {
        result = prevnum * currentnum;
    } else if (operator == "/") {
        result = prevnum / currentnum;
    }

    console.log("result", result);

    updateDisplay(result);
    storeNum(result);
}

function clickAdd() {
    if (memory.operatorPressed == true) { 
        storeOp("+");
        return;
    }
    if (isPrevEmpty()) {
        storeNum(parseCurrent());
        storeOp("+");
        setOpPress(true);
        return;
    }
    operate();
    storeOp("+");
    clearNum();
    setOpPress(true);
}

function clickSubtract() {
    if (memory.operatorPressed == true) {
        storeOp("-");
        return;
    }
    if (isPrevEmpty()) {
        storeNum(parseCurrent());
        storeOp("-");
        setOpPress(true);
        return;
    }
    operate();
    storeOp("-");
    clearNum();
    setOpPress(true);
}

function clickMultiply() {
    if (memory.operatorPressed == true) {
        storeOp("*");
        return;
    }
    if (isPrevEmpty()) {
        storeNum(parseCurrent());
        storeOp("*");
        setOpPress(true);
        return;
    }
    operate();
    storeOp("*");
    clearNum();
    setOpPress(true);
}

function clickDivide() {
    if (memory.operatorPressed == true) {
        storeOp("/");
        return;
    }
    else if (isPrevEmpty()) {
        storeNum(parseCurrent());
        storeOp("/");
        setOpPress(true);
        return;
    }
    else {
        operate();
        storeOp("/");
        clearNum();
        setOpPress(true);
    }
}

function clickOperate() {
    if (memory.operatorPressed == true) {
        return;
    }
    if (isPrevEmpty()) {
        return;
    }
    operate();
}

function clickNum(num) {
    if (isNumFull(9)) {
        return
    }
    if (memory.operatorPressed) {
        clearNum();
    }
    setOpPress(false);
    firstZeroPop();
    memory.currentNum.push(num);
    updateDisplay(memory.currentNum.join(""));
}

function clickZero(digits) {
    if (isNumEmpty()) {
        return;
    } 
    else if (digits == 1 && isNumFull(9)) {
        return;
    } 
    else if(digits == 2 && isNumFull(8)) {
        return;
    }
    else {
        if (memory.operatorPressed) {
            clearNum();
        }
        setOpPress(false);
        for (let i = 0; i < digits; i++) {
            memory.currentNum.push("0");
        }
    }
    updateDisplay(parseCurrent());
}

function deleteNum() {
    if (isNumEmpty()) {
        return;
    }
    if (memory.currentNum.length > 0) {
        memory.currentNum.pop();
    }
    if (memory.currentNum.length < 1) {
        memory.currentNum.push("0");
    }
    updateDisplay(memory.currentNum.join(""));
}

function allClear() {
    clearNum();
    memory.currentNum.push("0");
    clearOp();
    clearPrev();
    
    updateDisplay(memory.currentNum.join(""));
}

function initButtons() {
    initOne();
    initTwo();
    initThree();
    initFour();
    initFive();
    initSix();
    initSeven();
    initEight();
    initNine();
    initZero();
    initDoubleZero();
    initDelete();
    initAllClear();
    initAdd();
    initSubtract();
    initMultiply();
    initDivide();
    initOperate();
}

function initZero() {
    let zero = document.getElementsByClassName("zero");
    zero[0].addEventListener("click", () => clickZero(1));
}

function initDoubleZero() {
    let doublezero = document.getElementsByClassName("doublezero");
    doublezero[0].addEventListener("click", () => clickZero(2));
}

function initOne() {
    let one = document.getElementsByClassName("one");
    one[0].addEventListener("click", () => clickNum("1"));
}

function initTwo() {
    let two = document.getElementsByClassName("two");
    two[0].addEventListener("click", () => clickNum("2"));
}

function initThree() {
    let three = document.getElementsByClassName("three");
    three[0].addEventListener("click", () => clickNum("3"));
}

function initFour() {
    let four = document.getElementsByClassName("four");
    four[0].addEventListener("click", () => clickNum("4"));
}

function initFive() {
    let five = document.getElementsByClassName("five");
    five[0].addEventListener("click", () => clickNum("5"));
}

function initSix() {
    let six = document.getElementsByClassName("six");
    six[0].addEventListener("click", () => clickNum("6"));
}

function initSeven() {
    let seven = document.getElementsByClassName("seven");
    seven[0].addEventListener("click", () => clickNum("7"));
}

function initEight() {
    let eight = document.getElementsByClassName("eight");
    eight[0].addEventListener("click", () => clickNum("8"));
}

function initNine() {
    let nine = document.getElementsByClassName("nine");
    nine[0].addEventListener("click", () => clickNum("9"));
}

function initDelete() {
    let del = document.getElementsByClassName("delete");
    del[0].addEventListener("click", () => deleteNum());
}

function initAllClear() {
    let clear = document.getElementsByClassName("clear");
    clear[0].addEventListener("click", () => allClear());
}

function initOperate() {
    let operate = document.getElementsByClassName("operate");
    operate[0].addEventListener("click", () => operate());
}

function initAdd() {
    let add = document.getElementsByClassName("add");
    add[0].addEventListener("click", () => clickAdd());
}

function initSubtract() {
    let subtract = document.getElementsByClassName("subtract");
    subtract[0].addEventListener("click", () => clickSubtract());
}

function initMultiply() {
    let multiply = document.getElementsByClassName("multiply");
    multiply[0].addEventListener("click", () => clickMultiply());
}

function initDivide() {
    let divide = document.getElementsByClassName("divide");
    divide[0].addEventListener("click", () => clickDivide());
}

function initOperate() {
    let operate = document.getElementsByClassName("operate");
    operate[0].addEventListener("click", () => clickOperate());
}



function main() {
    initButtons();
}

main();
