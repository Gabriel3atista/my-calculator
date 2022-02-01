// Configuração de data e hora local
const date = new Date();
let locale = 'pt-BR';
let dateElement = document.querySelector('.date');
let timeElement = document.querySelector('.time');
let optionsDate = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
}
let optionsTime = {
    hour: '2-digit',
    minute: '2-digit'
}

let setDateTime = function () {

    const date = new Date();
    dateElement.innerHTML = date.toLocaleDateString(locale, optionsDate);
    timeElement.innerHTML = date.toLocaleTimeString(locale, optionsTime);

}

setDateTime();

setInterval(() => {

    setDateTime();

}, 1000);

// Criando a operação

let operation = [0];
let historyOperation = [];
let audio = new Audio('click.mp3');
let audioOnOff = false;
let display = document.querySelector('#display > .operation');
let history = document.querySelector('#display > .history');
display.innerHTML = operation;

let clearAll = () => {

    historyOperation = [];

    operation = [0];

    display.style.fontSize = '4rem';

    setDisplayHistoryOperation();

    setDisplayOperation();


}

let cancelEntry = () => {

    if(operation.length == 1){

        operation = [0];

        display.style.fontSize = '4rem';

        setDisplayOperation();

    }else{

        operation.pop();

        setDisplayOperation();

    }

}

let getLastOperation = () => {

    return operation[operation.length - 1];

}

let setLastOperation = (value) => {

    return operation[operation.length - 1] = value;

}

let getOperator = (value) => {

    return ['+', '-', '*', '/', '%'].indexOf(value) > -1;

}

let addOperation = (value) => {

    if(!getOperator(value)){

        if(display.innerText.length > 8){

            display.style.fontSize = '3rem';

            if(display.innerText.length > 13){

                return

            }
    
        }else{
    
            display.style.fontSize = '4rem';
    
        }

        if(operation == 0){

            setLastOperation(parseInt(value));

            setDisplayOperation();

        }else{

            if(!isNaN(getLastOperation())){

                let newValue = getLastOperation() + value;

                setLastOperation(parseInt(newValue));

                setDisplayOperation();

            }else{

                operation.push(parseInt(value));
                
                setDisplayOperation();
    
            }

        }
  
    }else{

        if(!isNaN(getLastOperation())){

            calc();

            operation.push(value);

            setHistoryOperation();

            setDisplayOperation();

        }else{

            setLastOperation(value);

            setDisplayOperation();

        }

    }

}

let setHistoryOperation = () => {

    if(operation.length = 2){

        historyOperation = operation;

        history.innerHTML = historyOperation.join('');

        operation = [0];

    }

}

let setDisplayHistoryOperation = ()=>{

    history.innerHTML = historyOperation.join('');

}

let setDisplayOperation = () => {

    display.innerHTML = operation.join('');

}

let getResult = () => {

    return eval(historyOperation.join('') + operation.join(''));

}

let calc = () => {

    operation = [getResult()];
    
    historyOperation = [];

    setDisplayHistoryOperation();

    setDisplayOperation();

}

let playAudio = () => {

    audio.play();

}

// Resgatando a classe dos botões para efetuar as operações
let btn = () => {

    let btnElement = document.querySelectorAll('#buttons > div');

    btnElement.forEach(btn => {

        btn.addEventListener('click', e => {

            let btnValue = btn.className.replace('btn ', '');

            switch (btnValue) {

                case '0':
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                case '7':
                case '8':
                case '9':
                    addOperation(btnValue);
                    break;
                case 'soma':
                    addOperation('+');
                    break;
                case 'subtracao':
                    addOperation('-');
                    break;
                case 'multiplicacao':
                    addOperation('*');
                    break;
                case 'divisao':
                    addOperation('/');
                    break;
                case 'porcento':
                    addOperation('%');
                    break;
                case 'ac':
                    clearAll();
                    break;
                case 'ce':
                    cancelEntry();
                    break;
                case 'igual':
                    calc();
                    break;
                case 'virgula':
                    break;
                case 'sound':
                    toggleAudio();
                    break;

                default: setDisplayOperation('ERROR');
            }
        });
    });

    return;

}

let keyboard = () => {

    document.addEventListener('keyup', (e)=>{

        switch (e.key) {

            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                addOperation(e.key);
                break;
            case '+':
            case '-':
            case '*':
            case '/':
                addOperation(e.key);
                break;
            case 'Escape':
                clearAll();
                break;
            case 'Backspace':
                cancelEntry();
                break;
            case '=':
            case 'Enter':
                calc();
                break;
            case 'virgula':
                break;
        }

    })

}

keyboard();
btn();