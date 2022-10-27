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
            case '÷':
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

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

clearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})