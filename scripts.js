var memory = {
    currentNum: "0",
    operators: [],
    isFull: false,
};

function main() {
    initButtons();
    
    document.getElementById("display").textContent = "0";
}

function isFull(current) {
    if (current.length > 9) {
        return true;
    } 
    return false;
}

function clickNum(num) {
    if (isFull(memory.currentNum)) {
        return
    }
    if (memory.currentNum == "0") {
        memory.currentNum = num;
    } else {
        memory.currentNum += num;
    }
    document.getElementById("display").textContent = memory.currentNum;
    console.log(memory.currentNum);
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

main();
