// defining buttons
const numbers = Array.from(document.getElementsByClassName("number"));
const operator = Array.from(document.getElementsByClassName("operator"));
const clear = document.getElementsByClassName("clear");
const equal = document.getElementsByClassName("result");

// defining screens
const currentExpression = document.getElementById("current-expression");
const previousExpression = document.getElementById("previous-expression");

let result = 0;
let operation = null;

const operationBox = document.getElementById("operation");

// ac
clear[0].addEventListener('click', (e) => {
    allClear(previousExpression, currentExpression, operationBox, operation);
});

// del by backspace
document.addEventListener('keydown', (e) => {
    if (e.keyCode === 8 || e.keyCode === 46) {
        currentExpression.innerText = currentExpression.innerText.slice(0, -1)
        if (currentExpression.innerText.length < 1) {
            currentExpression.innerText = 0;
        }
    }
});

// del
clear[1].addEventListener('click', (e) => {
    currentExpression.innerText = currentExpression.innerText.slice(0, -1)
    if (currentExpression.innerText.length < 1) {
        currentExpression.innerText = 0;
    }
});


// input
numbers.forEach((e) => {
    e.addEventListener('click', (e) => {
        if (currentExpression.innerText.length < 12)  {
            if (e.target.id == "period" && !currentExpression.innerText.includes(".")) {
                currentExpression.innerText += e.target.innerText;
            } else if (e.target.classList.contains("number") && e.target.id != "period") {
                if (!currentExpression.innerText.includes(".")) {
                    if (currentExpression.innerText == 0) {
                        currentExpression.innerText = "";
                    }
                }
                currentExpression.innerText += e.target.innerText;
            }
        }
    });
});
document.addEventListener('keydown', (e) => {
    if (e.key < 10 && e.key >= 0) {
        if (currentExpression.innerText.length < 12)  {
            if (e.key == "." && !currentExpression.innerText.includes(".")) {
                currentExpression.innerText += e.key;
            } else if (e.key != ".") {
                if (!currentExpression.innerText.includes(".")) {
                    if (currentExpression.innerText == 0) {
                        currentExpression.innerText = "";
                    }
                }
                currentExpression.innerText += e.key;
            }
        }
    }
});

operator.forEach((e) => {
    e.addEventListener('click', (e) => {
        if (operation === null) {
            previousExpression.innerText = currentExpression.innerText;
            currentExpression.innerText = 0;
            operation = e.target.id;
            console.log(operation + " set by one");
        } else if (operation != null) {
            if (operation == "plus") {
                previousExpression.innerText = parseFloat(previousExpression.innerText) + parseFloat(currentExpression.innerText);
                operation = e.target.id;
            } else if (operation == "minus") {
                previousExpression.innerText = parseFloat(previousExpression.innerText) - parseFloat(currentExpression.innerText);
                operation = e.target.id;
            } else if (operation == "multiply") {
                previousExpression.innerText = parseFloat(previousExpression.innerText) * parseFloat(currentExpression.innerText);
                operation = e.target.id;
            } else if (operation == "divide") {
                previousExpression.innerText = parseFloat(previousExpression.innerText) / parseFloat(currentExpression.innerText);
                operation = e.target.id;
            } else if (operation == "percentage") {
                previousExpression.innerText = (parseFloat(previousExpression.innerText) / 100) * parseFloat(currentExpression.innerText);
                operation = e.target.id;
            } else if (operation == "power") {
                let n = previousExpression.innerText;
                for (i = 1; i < parseFloat(currentExpression.innerText); i++) {
                    previousExpression.innerText = previousExpression.innerText * n;
                }
                operation = e.target.id;
            }
            console.log(operation + " set by two")
            currentExpression.innerText = 0;
        }
    });
});

equal[0].addEventListener('click', (e) => {
    if (operation == "plus") {
        result = parseFloat(previousExpression.innerText) + parseFloat(currentExpression.innerText);
    } else if (operation == "minus") {
        result = parseFloat(previousExpression.innerText) - parseFloat(currentExpression.innerText);
    } else if (operation == "multiply") {
        result = parseFloat(previousExpression.innerText) * parseFloat(currentExpression.innerText);
    } else if (operation == "divide") {
        result = parseFloat(previousExpression.innerText) / parseFloat(currentExpression.innerText);
    } else if (operation == "percentage") {
        result = (parseFloat(previousExpression.innerText) / 100) * parseFloat(currentExpression.innerText);
    }else if (operation == "power") {
        result = previousExpression.innerText;
        for (i = 1; i < parseFloat(currentExpression.innerText); i++) {
            result = result * previousExpression.innerText;
        }
    }
    allClear(previousExpression, currentExpression, operationBox, operation);
    currentExpression.innerText = result;
});

const allClear = (previous, current, operationBox, operation) => {
    previous.innerText = 0;
    current.innerText = 0;
    operationBox.innerText = "";
    operation = null;
}

allClear(previousExpression, currentExpression, operationBox, operation);
