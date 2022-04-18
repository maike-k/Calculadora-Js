// Selecionando os botões
const operations = document.querySelectorAll('.operator')
const numberButtons = document.querySelectorAll('.numbers')
const allClear = document.querySelector('.all-clear')
const partialClear = document.querySelector('.partial-clear')
const previousOperandTextElement = document.querySelector('.previous-operand')
const currentOperandTextElement = document.querySelector('.current-operand')
const equalsButton = document.querySelector('.equalsButton')

class Calculator {
  constructor(previousOperandTextElement, currentOperadtextElement) {
    this.previousOperandTextElement = previousOperandTextElement
    this.currentOperadtextElement = currentOperadtextElement
    this.clear()
  }

  // função para deletar um número
  deleteNumber() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
  }
  // função para limpar o priviousOperand e o currentOperand
  clear() {
    this.previousOperand = ''
    this.currentOperand = ''
    this.operation = undefined
  }
  // função para mostrar o conteúdo na tela
  updateDisplay() {
    this.previousOperandTextElement.innerText = `${this.formatDisplayNumber(
      this.previousOperand
    )} ${this.operation || ''}`
    this.currentOperadtextElement.innerText = this.formatDisplayNumber(
      this.currentOperand
    )
  }

  // função para guardar os números selecionados
  appendNumber(number) {
    if (this.currentOperand.includes('.') && number == '.') return
    this.currentOperand = `${this.currentOperand}${number.toString()}`
  }
  // função para guardar os operadores selecionados
  chooseOperation(operation) {
    if (this.currentOperand === '') return // inicializar o current operand sempre um com um número
    if (this.previousOperand != '') {
      this.calculate()
    }

    this.operation = operation
    this.previousOperand = this.currentOperand // mostrando o sinal da operação
    this.currentOperand = ''
  }

  // função que irá solucionar as operações solicitadas
  calculate() {
    let result = ''
    const previousOperandFloat = parseFloat(this.previousOperand)
    const currentOperandFloat = parseFloat(this.currentOperand)
    switch (this.operation) {
      case '+':
        result = previousOperandFloat + currentOperandFloat
        break
      case '-':
        result = previousOperandFloat - currentOperandFloat
        break
      case '*':
        result = previousOperandFloat * currentOperandFloat
        break
      case '/':
        result = previousOperandFloat / currentOperandFloat
        break
      default:
        return
    }
    this.currentOperand = result
    this.operation = undefined
    this.previousOperand = ''
  }
  // função que irá acresentar a divisão entre as casas decimais
  formatDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.'[0])) // transformando o número inteiro, em um decimal
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', {
        maximumFractionDigits: 0
      })
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }
}

const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
)

allClear.addEventListener('click', () => {
  calculator.clear()
  calculator.updateDisplay()
})

for (const numberButton of numberButtons) {
  numberButton.addEventListener('click', () => {
    calculator.appendNumber(numberButton.innerText)
    calculator.updateDisplay()
  })
}

for (const operationButton of operations) {
  operationButton.addEventListener('click', () => {
    calculator.chooseOperation(operationButton.innerText)
    calculator.updateDisplay()
  })
}

equalsButton.addEventListener('click', () => {
  calculator.calculate()
  calculator.updateDisplay()
})

partialClear.addEventListener('click', () => {
  calculator.deleteNumber()
  calculator.updateDisplay()
})
