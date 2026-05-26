let display = document.getElementById('display');
let expression = '';

function appendNumber(num) {
    expression += num;
    updateDisplay();
}

function appendOperator(op) {
    if (expression === '') return;
    
    // Prevent multiple operators in a row
    if (['+', '-', '*', '/'].includes(expression[expression.length - 1])) {
        return;
    }
    
    expression += op;
    updateDisplay();
}

function calculate() {
    if (expression === '') return;
    
    try {
        // Replace × with * for evaluation
        let result = eval(expression.replace('×', '*'));
        expression = result.toString();
        updateDisplay();
    } catch (error) {
        expression = 'Error';
        updateDisplay();
        setTimeout(() => {
            expression = '';
            updateDisplay();
        }, 1500);
    }
}

function clearDisplay() {
    expression = '';
    updateDisplay();
}

function backspace() {
    expression = expression.slice(0, -1);
    updateDisplay();
}

function updateDisplay() {
    display.value = expression || '0';
}

// Keyboard support
document.addEventListener('keydown', (event) => {
    const key = event.key;
    
    if (/[0-9]/.test(key)) {
        appendNumber(key);
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        event.preventDefault();
        appendOperator(key);
    } else if (key === '.') {
        appendNumber(key);
    } else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calculate();
    } else if (key === 'Backspace') {
        event.preventDefault();
        backspace();
    } else if (key === 'Escape' || key === 'c' || key === 'C') {
        clearDisplay();
    }
});

// Initialize display
updateDisplay();
