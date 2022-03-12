 class Calculator {
     constructor(previousOperandTextElement, currentOperandTextElement) {
         this.previousOperandTextElement = previousOperandTextElement ;
         this.currentOperandTextElement = currentOperandTextElement ;
         this.clear()
     }
     clear() {
         this.previousOperand = '' ;
         this.currentOperand = '' ;
         this.arithmetic = undefined ;

     }

     delete() {

        this.currentOperand= this.currentOperand.slice(0 ,-1)

     }

     typeDigit(digit) {

        if(digit=== '.' && this.currentOperand.includes('.')) {
            return
        }

        this.currentOperand += digit ;

     }
    chooseArithmetic(arithmetic) {
         
      if (this.currentOperand=== ' ') {
          return
      }

      if (this.previousOperand !== ' ')  {
          this.compute()
      }


        this.arithmetic = arithmetic ;
        this.previousOperand = this.currentOperand ;
        this.currentOperand = ' ' ;

    }

    compute() {

        let answer ;
        var prev =parseFloat( this.previousOperand ) ;
        var current =parseFloat( this.currentOperand ) ;
        if (isNaN(prev) || isNaN(current)) {
            return
        }

        switch(this.arithmetic) {
            case '+' :{
                answer = prev + current
            }
            break ;

            case '-' :{
                answer = prev - current
            }
            break ;

            case '/' :{
                answer = prev / current
            }
            break ;

            case '*' :{
                answer = prev * current
            }
            break ;

            default:
                    undefined ;}

        this.previousOperand = ' ' ;
        this.currentOperand = answer
        this.arithmetic = undefined ;

    }

    update() {
        this.previousOperandTextElement.innerText = this.previousOperand ;
        this.currentOperandTextElement.innerText = this.currentOperand ;

    }

 }

const digitButton = document.querySelectorAll ('[data-number]') ;
const arithmeticButton = document.querySelectorAll ('[data-operation]') ;
const cancelButton = document.querySelector ('[data-all-clear]') ;
const deleteButton = document.querySelector ('[data-delete]') ;
const answerButton = document.querySelector ('[data-equals]') ;
const previousOperandTextElement = document.querySelector ('[data-previous-operand]') ;
const currentOperandTextElement = document.querySelector ('[data-current-operand]') ;

const myCalculator = new Calculator (previousOperandTextElement , currentOperandTextElement)

digitButton.forEach((button)=>{
    button.addEventListener('click' , ()=>{
        myCalculator.typeDigit(button.innerText)
        myCalculator.update()
    })

})

arithmeticButton.forEach((button)=>{
    button.addEventListener('click' , ()=>{
        myCalculator.chooseArithmetic(button.innerText) ;
        myCalculator.update();
    })
})

cancelButton.addEventListener('click', ()=>{
    myCalculator.clear() ;
    myCalculator.update() ;
})

deleteButton.addEventListener('click' , ()=>{
    myCalculator.delete() ;
    myCalculator.update() ;
})

answerButton.addEventListener('click' , ()=>{
    myCalculator.compute() ;
    myCalculator.update() ;
})