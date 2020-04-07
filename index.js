const abc = [
    ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
    ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '&#92;', 'Del'],
    ['CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '&#39;', 'Enter'],
    ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '&#145;', '&#9650;', 'Shift'],
    ['Ctrl', 'Win', 'Alt', ' ', 'Alt', '&#9668;', '&#9660;', '&#9658;', 'Ctrl']
];

const abc_rus = [
    ['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
    ['Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '&#92;', 'Del'],
    ['CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter'],
    ['Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '&#9650;', 'Shift'],
    ['Ctrl', 'Win', 'Alt', ' ', 'Alt', '&#9668;', '&#9660;', '&#9658;', 'Ctrl']
];

const transription = [
    ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace'],
    ['Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backlash', 'Delete'],
    ['CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter'],
    ['ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight'],
    ['ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'ControlRight']
];

let leng = 'eng';
let catching = [];
let keycode = [];

function SwitchLeng() {
    if (leng == 'eng') {
        for (let i in transription) {
            for (let j in transription[i]) {
                document.querySelector('#' + transription[i][j]).innerHTML = abc_rus[i][j];
            }
        }
        leng = 'rus';
    } else if (leng == 'rus') {
        for (let i in transription) {
            for (let j in transription[i]) {
                document.querySelector('#' + transription[i][j]).innerHTML = abc[i][j];
            }
        }
        leng = 'eng';  
    }


};

function PressAnimation(event, catching) {
    if (document.querySelector("#" + catching)) {
        document.querySelector("#" + catching).classList.add("active");
    }
};


window.onload = () => {
    const info_message = document.createElement('p');
    info_message.innerHTML = 'Сменить раскладку: левые Shift (сначала) + Ctrl. Сделано на Windows.';
  
    const textarea = document.createElement('textarea');
    textarea.classList.add('text');
    textarea.focus();
    textarea.selectionStart = textarea.value.length;
    textarea.value = "";

    const keyboard = document.createElement('div');
    keyboard.classList.add('keyboard');
  
    document.querySelector('body').append(info_message, textarea, keyboard);


    function Actions(catching, keycode) {
        switch (catching) {
            case 'Backspace':
                if (textarea.value) {
                    textarea.value = textarea.value.slice(0, -1);
                }
                break;
            case 'Tab':
                textarea.value += '\t';
                break;
            case 'Enter':
                textarea.value += '\n';
                break;
            case 'ControlLeft':
                break;
            case 'ControlRight':
                break;
            case 'AltLeft':
                break;
            case 'AltRight':
                break;
            case 'Delete':
                break;
            case 'ShiftLeft':
                break; 
            case 'ShiftRight':
                break; 
            case 'CapsLock':
                break; 
            case 'MetaLeft':
                break; 
            case 'ArrowUp':
                textarea.value += '▲';
                break;  
            case 'ArrowDown':
                textarea.value += '▼';
                break; 
            case 'ArrowLeft':
                textarea.value += '◄';
                break;
            case 'ArrowRight':
                textarea.value += '►';
                break;  
            
            default: 
                textarea.value += keycode;
                break;   
        }
    
    };



    /*  creating keyboard  */   
    for (let i in abc) {
        let row = document.createElement('div');
        row.classList.add('rows');
        keyboard.append(row);
        for (let j in abc[i]) {
            let letter = document.createElement('span');
            letter.classList.add('buttons');
            letter.id += transription[i][j];
            letter.innerHTML = abc[i][j];
            row.append(letter);
        }
    }

    const btn = document.querySelector('.keyboard');
    
    /* real keyboard action */ 
    document.addEventListener('keydown', function(event) {
        PressAnimation(event, event.code);
        console.log(event);

        event.preventDefault();

        if (event.code == 'ControlLeft' && event.shiftKey == true) {
            SwitchLeng();
        }
            
        Actions(event.code, event.key);

    
    })

    document.addEventListener('keyup', function(event) {
        if (document.querySelector("#" + event.code)) { 
            document.querySelector("#" + event.code).classList.remove("active");
        }
         
    })


    /* mouse action */
    btn.addEventListener('mousedown', function(event) {
        console.log(event.target.id);
        PressAnimation(event, event.target.id);
        Actions(event.target.id, event.target.innerHTML);



    })

    btn.addEventListener('mouseup', function(event) {
        if (document.querySelector("#" + event.target.id)) { 
            document.querySelector("#" + event.target.id).classList.remove("active");
        }
         
    })






}  



