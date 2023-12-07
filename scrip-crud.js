const btnAddTarefa = document.querySelector ('.app__button--add-task');
const formAddTarefa = document.querySelector('.app__form-add-task');
const textAreaTarefa = document.querySelector('.app__form-textarea');
const ulTarefas = document.querySelector ('.app__section-task-list')
const paragrafoDescricaoTarefa = document.querySelector('.app__section-active-task-description')
const btnRemoverConcluidas = document.querySelector('#btn-remover-concluidas')
const btnRemoverTodas = document.querySelector('#btn-remover-todas')

let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
let tarefaSelecionada = null
let liTarefaSelecionada = null

function atualizarTarefas() {
    localStorage.setItem('tarefas', JSON.stringify(tarefas))
    
}

function criarElementoTarefa(tarefa) {

    const li = document.createElement('li')
    li.classList.add('app__section-task-list-item')
    

    const svg = document.createElement('svg')
    svg.innerHTML = `
    <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
        <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z"
        fill="#01080E"></path>
    </svg>

    `
    

    const paragrafo = document.createElement('p')
    paragrafo.textContent = tarefa.descricao
    paragrafo.classList.add('app__section-task-list-item-description')


    const botao = document.createElement ('button')
    botao.classList.add('app_button-edit')

    botao.onclick = () => {
        const novaDescrição = prompt('Qual é o novo nome da tarefa?')
        if (novaDescrição) {
            paragrafo.textContent = novaDescrição
            tarefa.descricao = novaDescrição
            atualizarTarefas()    
        }
        
    }

    const imagemBotao = document.createElement('img')
    imagemBotao.setAttribute('src', '/imagens/edit.png')
   

    botao.append(imagemBotao)
    li.append(svg)
    li.append(paragrafo)
    li.append(botao)

    if (tarefa.completa) {
        li.classList.add('app__section-task-list-item-complete')
        botao.setAttribute('disabled', true)        
    }
    else {
        li.onclick = () => {
        
            document.querySelectorAll('.app__section-task-list-item-active')
            .forEach(elemento => {
                elemento.classList.remove('app__section-task-list-item-active')
            })
    
            if (tarefaSelecionada == tarefa) {
    
                paragrafoDescricaoTarefa.textContent = " "
                tarefaSelecionada = null
                liTarefaSelecionada = null
                return   
            }
    
            tarefaSelecionada = tarefa
            liTarefaSelecionada = li
            paragrafoDescricaoTarefa.textContent = tarefa.descricao
            
            li.classList.add('app__section-task-list-item-active')
        }  
    }

    return li
}



btnAddTarefa.addEventListener ('click', () => {

    formAddTarefa.classList.toggle('hidden')
    
})

    formAddTarefa.addEventListener ('submit',  (evento) => {
        evento.preventDefault();
        const tarefa = {
            descricao: textAreaTarefa.value
        }

        tarefas.push(tarefa);
        const elementoTarefa = criarElementoTarefa(tarefa)
        ulTarefas.append (elementoTarefa)
        atualizarTarefas()
        textAreaTarefa.value = ''
        formAddTarefa.classList.add('hidden')
    });



    tarefas.forEach(tarefa => {
        const elementoTarefa = criarElementoTarefa(tarefa);
        ulTarefas.append(elementoTarefa)

    });

   
    const botaoCancelar = document.getElementsByClassName('app__form-footer__button app__form-footer__button--cancel')[0]
   

    /* botaoCancelar.onclick = () => {
        textAreaTarefa.value = " "
        formAddTarefa.classList.add ('hidden')
    } */

    botaoCancelar.addEventListener ('click' , () => {
        textAreaTarefa.value = " "
        formAddTarefa.classList.add ('hidden')
        
    })

    document.addEventListener ('FocoFinalizado', () => {
        if (tarefaSelecionada && liTarefaSelecionada) {

            liTarefaSelecionada.classList.remove('app__section-task-list-item-active')
            liTarefaSelecionada.classList.add('app__section-task-list-item-complete')
            liTarefaSelecionada.querySelector('button').setAttribute('disabled', true)
            tarefaSelecionada.completa = true
            atualizarTarefas()      
        }
    })

    const removerTarefas = (somenteCompletas) => {
        const seletor = somenteCompletas ? '.app__section-task-list-item-complete' : '.app__section-task-list-item'
        document.querySelectorAll(seletor).forEach(elemento => {
            elemento.remove()
        })

        tarefas =  somenteCompletas ?  tarefas.filter(tarefa => !tarefa.completa) : []
        atualizarTarefas()

    }

    btnRemoverConcluidas.onclick = () => removerTarefas(true)
    btnRemoverTodas.onclick = () => removerTarefas(false)


   

