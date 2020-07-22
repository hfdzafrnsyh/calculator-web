const calculator  = {
    displayNumber : '0',
    firstNumber : null,
    waitForSecondNumber : false ,
    operator : null

}



// update display
const updateDisplay = () => {
    document.querySelector('#displayNumber').innerText = calculator.displayNumber;
}



// clear display
const clearDisplay = () => {
    calculator.displayNumber = '0';
    calculator.firstNumber ;
    calculator.operator = null;
    calculator.waitForSecondNumber = false;
}


// input nilai
const inputValue = (digit) => {
   
   if( calculator.waitForSecondNumber && calculator.firstNumber == calculator.displayNumber ){
        calculator.displayNumber = digit;
   }else{
        if(calculator.displayNumber === '0') {
            calculator.displayNumber = digit;
        }else{
            calculator.displayNumber += digit;
        }

   }

}



// eksekusi dengan event click dan update display
const buttons = document.querySelectorAll('.button');

for ( let button of buttons ) {

    button.addEventListener('click' , (event) => {
        
        let target = event.target;

        if( target.classList.contains('clear') ) {
            clearDisplay();
            updateDisplay();
            return ;
        }


        if( target.classList.contains('negative')){
            inverseNumber();
            updateDisplay();
            return ;
        }


        if(target.classList.contains('operator')) {
            handleOperator(target.innerText);
            updateDisplay();
            return ;
        }


        if( target.classList.contains('equals')){
            actionCalculation();
            updateDisplay();
            return ''
        }
        

        inputValue(target.innerText);
        updateDisplay();
    })
}



const inverseNumber = () => {

    if(calculator.displayNumber === '0') {
        return
    }

    calculator.displayNumber = calculator.displayNumber * -1 ;
}


const handleOperator = (operator) => {

    if(!calculator.waitForSecondNumber) {
        calculator.operator = operator;
        calculator.waitForSecondNumber = true;
        calculator.firstNumber = calculator.displayNumber ; 
    }else{
        alert('operator sudah dilakukan')
    }

}


const actionCalculation = () => {

    if(calculator.firstNumber == null || calculator.displayNumber == null) {
        alert('Nilai belum ditetapkan!')
        return ;
    }

    let result = 0 ;

    if( calculator.operator === '+') {

        result = parseInt( calculator.firstNumber) + parseInt( calculator.displayNumber)

    }else{

        result = parseInt( calculator.firstNumber) - parseInt( calculator.displayNumber)

    }

  
    let history = {
        firstNumber: calculator.firstNumber,
        secondNumber: calculator.displayNumber,
        operator: calculator.operator,
        result: result
    }

    putHistory(history);
    calculator.displayNumber = result ;
    renderHistory();
}



