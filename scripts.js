var memory = {
    currentNum: ["0"],
    operators: [],
    prevNums: []
};

function isNumEmpty() {
    if (memory.currentNum.length == 1 && memory.currentNum[0] == "0") {
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

function isOpEmpty() {
    if (memory.operators.length > 0) {
        return true;
    } else {
        return false;
    }
}

function firstZeroPop() {
    if (memory.currentNum.length == 1 && isNumEmpty()) {
        memory.currentNum.pop();
    }
}

function updateDisplay(num) {
    let display = document.getElementById("display");
    display.textContent = num;
}

function clickNum(num) {
    if (isNumFull(9)) {
        return
    }
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
    if (!isNumEmpty()) {
        console.log("current length", memory.currentNum.length);
        for (let n = 0; n <= memory.currentNum.length; n++) {
            memory.currentNum.pop();
        }
        memory.currentNum.push("0");
    }
    console.log(memory.currentNum);
    if (!isOpEmpty()) {
        for (let o = 0; o < memory.operators.length + 1; o++) {
            memory.operators.pop();
        }
    }
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

function main() {
    initButtons();
}

main();
