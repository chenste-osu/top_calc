var memory = {
    currentNum: ["0"],
    operator: [],
    prevNum: "0",
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
    if (memory.prevNum == "0") {
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
    memory.prevNum = "0";
}

function firstZeroPop() {
    if (memory.currentNum.length == 1 && isNumEmpty()) {
        memory.currentNum.pop();
    }
}

function updateDisplay(num) {
    if (num.length > 10) {
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
        result == prevnum / currentnum;
    }

    console.log("result", result);

    updateDisplay(result);
    storeNum(result);

    // update display needs a way to overwrite a prevnum on display

    clearNum();

}

function clickAdd() {
    // first need to operate on the prev 2 nums
    // then set the current operator which can change when pressing another operator
    // pressing equals simply evaluates the 2 nums and operator and updates display
    if (memory.operatorPressed == true) {
        storeOp("+");
        return;
    }
    storeOp("+");
    operate();
}

function clickSubtract() {
    //memory.operators.push("-");
}

function clickMultiply() {
    //memory.operators.push("*");
}

function clickDivide() {
    //memory.operators.push("/");
}

function clickNum(num) {
    if (isNumFull(9)) {
        return
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
        for (let i = 0; i < digits; i++) {
            memory.currentNum.push("0");
        }
    }
    updateDisplay(memory.currentNum.join(""));
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

function main() {
    initButtons();
}

main();
