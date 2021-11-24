let myButton = document.querySelector(`#next-step`)
let firstInput = document.querySelector(`#input-1`)
let secondInput = document.querySelector(`#input-2`)

myButton.addEventListener("click", redirectPage)

function redirectPage() {
    let firstDisplayContainer = document.querySelector(`#display-container-1`)
    let secondDisplayContainer = document.querySelector(`#display-container-2`)
    let firstValue = Number(firstInput.value)
    let secondValue = Number(secondInput.value)

    if (firstInput.value !== "" && secondInput.value !== "") {
        if (firstValue > 0 && secondValue > 0) {
            firstDisplayContainer.style.display = "none"
            secondDisplayContainer.style.display = "block"
            createGcdBlock()
        }
        else {
            alert("ONLY POSITIVE INTEGERS")
        }
    }
    firstInput.value = ""
    secondInput.value = ""
}

function calcGcd(firstNumber, secondNumber) {
    firstNumber = Math.abs(firstNumber);
    secondNumber = Math.abs(secondNumber);
    let holdFirstNumber = firstNumber
    let holdSecondNumber = secondNumber
    let firstDivided = []
    firstDivided.push(firstNumber)
    let secondDivided = []
    secondDivided.push(secondNumber)
    let divisors = []
    let commonDivisors = []
    let pageCommonDivisors = []
    let gcd = 1
    let i = 2

    while (firstNumber != 1 || secondNumber != 1) {
        if (firstNumber % i == 0 && secondNumber % i == 0) {
            firstNumber = firstNumber / i
            secondNumber = secondNumber / i
            firstDivided.push(firstNumber)
            secondDivided.push(secondNumber)
            divisors.push(i)
            gcd *= i
            commonDivisors.push(i)
            pageCommonDivisors.push(i)
        }
        else if (firstNumber % i == 0 && secondNumber % i != 0) {
            firstNumber = firstNumber / i
            firstDivided.push(firstNumber)
            secondDivided.push(secondNumber)
            divisors.push(i)
            commonDivisors.push(0)
        }
        else if (firstNumber % i != 0 && secondNumber % i == 0) {
            secondNumber = secondNumber / i
            firstDivided.push(firstNumber)
            secondDivided.push(secondNumber)
            divisors.push(i)
            commonDivisors.push(0)
        }
        if (firstNumber % i != 0 && secondNumber % i != 0) {
            i++
        }
        if (firstDivided.find(e => e == 1)) {
            firstDivided.pop()
        }
        if (secondDivided.find(e => e == 1)) {
            secondDivided.pop()
        }
    }

    if (pageCommonDivisors == "") {
        pageCommonDivisors.push(1)
        pageCommonDivisors.push(1)
    }

    firstDivided.push("1")
    secondDivided.push("1")
    return { holdFirstNumber, holdSecondNumber, firstDivided, secondDivided, divisors, commonDivisors, gcd, pageCommonDivisors }
}

function createGcdBlock() {
    const mainDiv = document.querySelector(`.gcd-container`)
    const firstDiv = document.querySelector(`#gcd-block-1`)
    const secondDiv = document.querySelector(`#gcd-block-2`)
    const thirthDiv = document.querySelector(`#gcd-block-3`)
    let myFirstList = document.createElement("ul")
    let mySecondList = document.createElement("ul")
    let myThirthList = document.createElement("ul")
    let calculatedGcd = calcGcd(Number(firstInput.value), Number(secondInput.value))
    let holdCommonDivisor
    let lastCommonElement = calculatedGcd.commonDivisors.slice(-1)

    for (let i = 0; i < calculatedGcd.firstDivided.length; i++) {
        let firstListViewItem = document.createElement('li');
        firstListViewItem.innerHTML = calculatedGcd.firstDivided[i]
        myFirstList.appendChild(firstListViewItem)
        firstDiv.appendChild(myFirstList)
    }
    for (let i = 0; i < calculatedGcd.secondDivided.length; i++) {
        let secondListViewItem = document.createElement('li');
        secondListViewItem.innerHTML = calculatedGcd.secondDivided[i]
        mySecondList.appendChild(secondListViewItem)
        secondDiv.appendChild(mySecondList)
    }
    for (let i = 0; i < calculatedGcd.divisors.length; i++) {

        let thirthListViewItem = document.createElement('li');
        if (calculatedGcd.divisors[i] == calculatedGcd.commonDivisors[i] || calculatedGcd.divisors[i] == holdCommonDivisor) {
            thirthListViewItem.className = "common-divisors"
        }
        thirthListViewItem.innerHTML = calculatedGcd.divisors[i]
        myThirthList.appendChild(thirthListViewItem)
        thirthDiv.appendChild(myThirthList)
    }

    let myLine = document.querySelector(`#vertical-line`)
    myLine.style.height = myThirthList.offsetHeight + 20 + "px"

    let gcdResult = document.createElement("span")
    gcdResult.id = "gcd-result"
    gcdResult.innerHTML = `GCD(${calculatedGcd.holdFirstNumber}, ${calculatedGcd.holdSecondNumber}) = ${calculatedGcd.pageCommonDivisors.join(" . ")} = ${calculatedGcd.gcd}`
    mainDiv.appendChild(gcdResult)
}