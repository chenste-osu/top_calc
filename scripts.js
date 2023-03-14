var memory = {
    currentNum: ["0"],
    operator: [],
    prevNum: "",
    operatorPressed: false,
    operatePressed: false,
    deletePressed: false
};

function setOpPress(binary) {
    memory.operatorPressed = binary;
}

function setOperatePress(binary) {
    memory.operatePressed = binary;
}

function setDeletePress(binary) {
    memory.deletePressed = binary;
}

function parseCurrent() {
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

function setCurrent(array) {
    memory.currentNum = array;
}

function popCurrent() {
    memory.currentNum.pop();
}

function storeNum(num) {
    memory.prevNum = num;
}

function pushNum(num) {
    memory.currentNum.push(num);
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
    if (num == NaN) {
        num = "ERROR";
    }
    else if (num.toString().length > 10) {
        num = num.toString().slice(0,10);
    } 
    let display = document.getElementById("display");
    display.textContent = num;
}

function operate() {
    let prevnum = parsePrev();
    let currentnum = parseCurrent();
    let operator = parseOp();
    let result = "";
    if (operator == "+") {
        result = prevnum + currentnum;
    } else if (operator == "-") {
        result = prevnum - currentnum;
    } else if (operator == "*") {
        result = prevnum * currentnum;
    } else if (operator == "/") {
        result = prevnum / currentnum;
    }
    updateDisplay(result);
    storeNum(result);
}

function clickOperator(sign) {
    if (memory.operatorPressed) {
        storeOp(sign);
        return;
    }
    else if (isPrevEmpty()) {
        storeNum(parseCurrent());
        clearNum();
        storeOp(sign);
        setOpPress(true);
        return;
    }
    // if operate has been pressed and delete is issued
    if (memory.deletePressed) {
        clearPrev();
        storeNum(parseCurrent());
        clearNum();
        setDeletePress(false);
    }
    else {
        operate();
        clearNum();
        setOperatePress(false);
    }
    storeOp(sign);
    setOpPress(true);
}

function clickOperate() {
    if (memory.operatorPressed) {
        return;
    }
    if (isPrevEmpty()) {
        return;
    }
    setOperatePress(true);
    setDeletePress(false);
    operate();
}

function clickNum(num) {
    if (isNumFull(9)) {
        return
    }
    if (memory.operatorPressed) {
        clearNum();
    }
    if (memory.deletePressed) {
        clearPrev();
    }
    setOpPress(false);
    setOperatePress(false);
    setDeletePress(false);
    firstZeroPop();
    pushNum(num);
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
            pushNum("0");
        }
    }
    updateDisplay(parseCurrent());
}

function deleteNum() {
    if (isNumEmpty() && isPrevEmpty()) {
        return;
    }
    if (memory.operatePressed) {
        // prev num (aka the result) becomes the current num
        // the old current num becomes the new prev num
        let tempNum = parseCurrent();
        let stringNum = parsePrev().toString();
        if (stringNum.length > 10) {
            stringNum = stringNum.slice(0, 10);
        }
        let newCurrent = stringNum.split('');
        setCurrent(newCurrent);
        storeNum(tempNum);
        setOperatePress(false);
        setDeletePress(true);
    }
    if (memory.currentNum.length > 0) {
        popCurrent();
    }
    if (memory.currentNum.length < 1) {
        pushNum("0");
    }
    updateDisplay(memory.currentNum.join(""));
}

function clickDecimal() {
    if (memory.currentNum.includes(".")) {
        return;
    }
    clickNum(".");
}

function allClear() {
    clearNum();
    pushNum("0");
    clearOp();
    clearPrev();
    setDeletePress(false);
    setOpPress(false);
    setOperatePress(false);
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
    initDecimal();
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
    add[0].addEventListener("click", () => clickOperator("+"));
}

function initSubtract() {
    let subtract = document.getElementsByClassName("subtract");
    subtract[0].addEventListener("click", () => clickOperator("-"));
}

function initMultiply() {
    let multiply = document.getElementsByClassName("multiply");
    multiply[0].addEventListener("click", () => clickOperator("*"));
}

function initDivide() {
    let divide = document.getElementsByClassName("divide");
    divide[0].addEventListener("click", () => clickOperator("/"));
}

function initOperate() {
    let operate = document.getElementsByClassName("operate");
    operate[0].addEventListener("click", () => clickOperate());
}

function initDecimal() {
    let decimal = document.getElementsByClassName("decimal");
    decimal[0].addEventListener("click", () => clickDecimal());
}

function main() {
    initButtons();
}

main();
