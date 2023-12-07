const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll(".app__card-button")
const musicaFocoInput = document.querySelector('#alternar-musica')
const startPauseBt = document.querySelector('#start-pause')
const musica = new Audio ('/sons/luna-rise-part-one.mp3') 
musica.loop = true
const audioPlay = new Audio('sons/play.mp3');
const audioPause = new Audio ('sons/pause.mp3');
const audioFinishTime = new Audio ('sons/beep.mp3');
const iniciarOuPausarBt = document.querySelector ('#start-pause span')
const tempoNaTela = document.querySelector ('#timer')
let intervaloId = null;
let tempoDecorridoEmSegundos = 1500 ;


musicaFocoInput.addEventListener ('change', () => {
    if (musica.paused) {
        musica.play()        
    }
    else {
        musica.pause()
    }
})

focoBt.addEventListener('click', () => {
    alterarContexto('foco');
    tempoDecorridoEmSegundos = 1500;
    focoBt.classList.add ('active')
})

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300;
    alterarContexto('descanso-curto')
    curtoBt.classList.add ('active')
})

longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900;
    alterarContexto('descanso-longo')
    longoBt.classList.add ('active')
})


function alterarContexto(contexto) {
    mostrarTempo()
    botoes.forEach (function (contexto) {

        contexto.classList.remove('active')
    })

    
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/imagens/${contexto}.png`)
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;
        case "descanso-curto":
            titulo.innerHTML = `
            Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>
            ` 
            break;
        case "descanso-longo":
            titulo.innerHTML = `
            Hora de voltar à superfície.<strong class="app__title-strong"> Faça uma pausa longa.</strong>
            `
        default:
            break;
    }
}

const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0) {
        //audioFinishTime.play();
        alert ('tempo finalizado');
        const focoAtivo = html.getAttribute('data-contexto') == 'foco'
        if (focoAtivo) { 
            const evento = new CustomEvent ('FocoFinalizado')
            document.dispatchEvent(evento)            
        }
        zerar();
        return    
    }
    tempoDecorridoEmSegundos -=1
    mostrarTempo();
} 

startPauseBt.addEventListener ('click', () => {
    iniciarOuPausar();
});




function iniciarOuPausar() {
    if (intervaloId) {
        startPauseBt.innerHTML = `<img class="app__card-primary-butto-icon" src="/imagens/play_arrow.png" alt="">
        <span>Começar</span>`;
        audioPause.play();
        zerar()
        return   
    }
    startPauseBt.innerHTML = `<img class="app__card-primary-butto-icon" src="/imagens/pause.png" alt="">
    <span>Pausar</span>`;
    intervaloId = setInterval (contagemRegressiva, 1000);    
    audioPlay.play();
}

function zerar() {
    clearInterval(intervaloId);
    intervaloId = null;
    
}


function mostrarTempo() {

    const tempo = new Date (tempoDecorridoEmSegundos *1000)
    const tempoFormatado= tempo.toLocaleTimeString ('pt-br', {minute: '2-digit' , second: '2-digit'})
    tempoNaTela.innerHTML = `
    ${tempoFormatado}
    `    
}

mostrarTempo()

