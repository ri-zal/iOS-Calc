class Calculator {
    constructor(prevOutputText, curOutputText) {
        this.prevOutputText = prevOutputText
        this.curOutputText = curOutputText
        this.clear()
    }

    clear() {
        this.prevOutput = ''
        this.curOutput = ''
        this.operation = undefined
    }

    appendNumber(number) {
        if (number === '.' && this.curOutput.includes('.')) return
        this.curOutput = this.curOutput.toString() + number.toString()
    }

    chooseOperation(operation) {
        if (this.curOutput === '') return
        if (this.prevOutput !== '') {
            this.compute()
        }
        this.operation = operation
        this.prevOutput = this.curOutput
        this.curOutput = ''
    }

    percentToDecimal() {
        const number = parseFloat(this.curOutput)
        if (isNaN(number)) return 
        this.curOutput = (number/100).toString()
        this.operation = undefined
    }

    signChange() {
        let inverted
        const number = parseFloat(this.curOutput)
        if (isNaN(number)) return
        if (number >= 0) {
            inverted = -Math.abs(number)
        } else {
            inverted = Math.abs(number)
        }
        this.curOutput = inverted
    }

    compute () {
        let computation
        const prev = parseFloat(this.prevOutput)
        const current = parseFloat(this.curOutput)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '−':
                computation = prev - current
                break
            case '×':
                computation = prev * current
                break
            case ('÷'):
                computation = prev / current
                break
            default:
                return
      }
        this.curOutput = computation
        this.operation = undefined
        this.prevOutput = ''
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay() {
        this.curOutputText.innerText =
          this.getDisplayNumber(this.curOutput)
        if (this.operation != null) {
          this.prevOutputText.innerText =
            `${this.getDisplayNumber(this.prevOutput)} ${this.operation}`
        } else {
          this.prevOutputText.innerText = ''
        }
    }
}

const numberButtons = document.querySelectorAll('.numbers')
const operationButtons = document.querySelectorAll('.operations')
const percentButton = document.querySelector('#percent')
const signChangeButton = document.querySelector('#signChange')
const equalsButton = document.querySelector('#equals')
const clearButton = document.querySelector('#clear')
const prevOutputText = document.querySelector('#prevOutput')
const curOutputText = document.querySelector('#curOutput')

const calculator = new Calculator(prevOutputText, curOutputText)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})
  
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

percentButton.addEventListener('click', button => {
    calculator.percentToDecimal()
    calculator.updateDisplay()
})

signChangeButton.addEventListener('click', button => {
    calculator.signChange()
    calculator.updateDisplay()
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

clearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

document.addEventListener('keydown', function (event) {
    let numberPattern = /[0-9]/g
    let operationPattern = /[+\-*\/]/g

    if (event.key.match(numberPattern)) {
        event.preventDefault()
        calculator.appendNumber(event.key)
        calculator.updateDisplay()
    }

    if (event.key === '.') {
        event.preventDefault()
        calculator.appendNumber(event.key)
        calculator.updateDisplay()
    }

    if (event.key.match(operationPattern)) {
        event.preventDefault()
        if (event.key === '*') {
            calculator.chooseOperation('×')
            calculator.updateDisplay()
            
        } else if (event.key === '/') {
            calculator.chooseOperation('÷')
            calculator.updateDisplay()
        } else {
            calculator.chooseOperation(event.key)
            calculator.updateDisplay()
        }
    }

    if (event.key === 'Enter' || event.key === '=') {
        event.preventDefault()
        calculator.compute()
        calculator.updateDisplay()
    }

    if (event.key === 'Delete') {
        event.preventDefault()
        calculator.clear()
        calculator.updateDisplay()
    }
})
