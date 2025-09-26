
// box x / 0 / x / 0 / x / 0 / x / 0 / x

// 1 2 3 4 5 6 7 8 9

// 1 2 3
// 4 5 6
// 7 8 9

// 1 4 7
// 2 5 8
// 3 6 9

// 1 5 9
// 3 5 7


const welcome = document.getElementById('Welcome');
const game = document.getElementById('game');
const boxes = document.querySelectorAll('.box');
const message = document.getElementById('message');
const resetButton = document.getElementById('reset');


let vez;
let fimDeJogo;
let player1;
let player2;

function startGame(event) {
    event.preventDefault();

    player1 = document.getElementById('player1').value || "Jogador 1";
    player2 = document.getElementById('player2').value || "Jogador 2";

    boxes.forEach(box => {
        box.textContent = '';
        box.classList.remove('X', 'O', 'vencedor');
        box.style.cursor = "pointer";
    });

    welcome.style.display = 'none';
    game.style.display = 'flex';

    vez = 0;
    fimDeJogo = false;

    message.style.display = 'flex';
    message.textContent = `Vez de ${player1} ❌`;
    boxes.forEach(box => {
        box.addEventListener('click', () => {
            if (fimDeJogo) return;

            if (box.textContent === '') {
                box.textContent = vez % 2 === 0 ? 'X' : 'O';
                box.style.cursor = 'not-allowed';
                box.classList.add(vez % 2 === 0 ? 'X' : 'O');
                vez++;

                let vencedor = verificarVencedor();
                if (vencedor) {
                    message.textContent = `${vencedor} venceu!`;
                    message.style.display = 'flex';
                    fimDeJogo = true;
                } else if (Array.from(boxes).every(box => box.textContent)) {
                    message.textContent = 'Velha!';
                    message.style.display = 'flex';
                    fimDeJogo = true; // 
                }else{
                    message.textContent = `Vez de ${vez % 2 === 0 ? player1 : player2} ${vez % 2 === 0 ? '❌' : '⭕'}`;
                }
            }
        });
    });
}

function reiniciarJogo() {
    vez = 0;
    fimDeJogo = false;
    boxes.forEach(box => {
        box.style.cursor = 'pointer';
        box.textContent = '';
        box.classList.remove('X', 'O', 'vencedor');
    });
    message.textContent = `Vez de ${player1} ❌`;
    message.style.display = 'flex';
}

function voltarInicio() {
    welcome.style.display = 'flex';
    game.style.display = 'none';
    message.style.display = 'none';
}

function verificarVencedor() {
    const player1 = document.getElementById('player1').value;
    const player2 = document.getElementById('player2').value;

    const vitorias = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let cond_vitoria of vitorias) {
        let [a, b, c] = cond_vitoria;
        if (boxes[a].classList.contains('X') && boxes[b].classList.contains('X') && boxes[c].classList.contains('X')) {
            [a, b, c].forEach(atual => boxes[atual].classList.add('vencedor'));
            boxes.forEach(box => box.style.cursor = 'not-allowed');
            return player1;

        }
        if (boxes[a].classList.contains('O') && boxes[b].classList.contains('O') && boxes[c].classList.contains('O')) {
            [a, b, c].forEach(atual => boxes[atual].classList.add('vencedor'));
            boxes.forEach(box => box.style.cursor = 'not-allowed');
            return player2;
        }
    }

    return null;
}
