let numerosGerados = []; // Array para armazenar os números já sorteados
let limiteNumero = 100; // Limite superior do número secreto
let numeroSecreto = gerarNumeroAleatorio(); // Número secreto inicial
let totalTentativas = 1; // Contador de tentativas

// Função para gerar um número aleatório único dentro do limite
function gerarNumeroAleatorio(){
    let numeroAleatorio = parseInt(Math.random() * limiteNumero + 1); // Gera um número aleatório entre 1 e limiteNumero
    let quantidadeNumeros = numerosGerados.length; // Obtém a quantidade de números gerados

    // Se todos os números já foram sorteados, reinicia o array
    if (quantidadeNumeros == limiteNumero) {
        numerosGerados = [];
    }

    // Se o número já foi sorteado antes, chama a função novamente
    if(numerosGerados.includes(numeroAleatorio)) {
        return gerarNumeroAleatorio();
    } else {
        numerosGerados.push(numeroAleatorio); // Adiciona o número ao array
        console.log(numerosGerados); // Exibe os números já sorteados no console
        return numeroAleatorio;
    }
}

// Função para atualizar o texto de um elemento HTML
function atualizarTexto(seletor, texto){
    let elemento = document.querySelector(seletor); // Seleciona o elemento pelo seletor
    elemento.innerHTML = texto; // Atualiza o conteúdo do elemento
}

// Função para exibir a mensagem inicial no jogo
function exibirMensagemInicial(){
    atualizarTexto("h1", "🤔 Número Secreto 🤔");
    atualizarTexto("p", "Escolha um número entre 1 e 100");
}

exibirMensagemInicial(); // Exibe a mensagem inicial ao carregar a página

// Função para verificar se o número escolhido pelo usuário está correto
function verificarChute() {
    let chuteUsuario = document.querySelector('input').value; // Obtém o valor do input

    if(chuteUsuario == numeroSecreto) { // Se o chute for correto
        atualizarTexto("h1", "Você acertou 🏆");
        let palavraTentativa = totalTentativas == 1 ? "tentativa" : "tentativas";
        let mensagemTentativa = `Você descobriu o número secreto com ${totalTentativas} ${palavraTentativa}!`;
        atualizarTexto("p", mensagemTentativa);
        tocarAudio("sound/acertou_miseravel.mp3"); // Toca áudio de acerto
        document.getElementById('reiniciar').removeAttribute('disabled'); // Habilita o botão de reiniciar
        document.getElementById('chute').disabled = true; // Desabilita o campo de entrada
    } else { // Se o chute estiver errado
        let dica = numeroSecreto > chuteUsuario ? "maior" : "menor";
        atualizarTexto("p", `O Número Secreto é ${dica} que ${chuteUsuario}`);
        limparCampo();
        tocarAudio("sound/faustao_errou.mp3"); // Toca áudio de erro
        totalTentativas++; // Incrementa o número de tentativas
    }
}   

// Função para reiniciar o jogo
function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio(); // Gera um novo número secreto
    limparCampo();
    totalTentativas = 1; // Reseta o contador de tentativas
    exibirMensagemInicial();
    document.getElementById('chute').removeAttribute('disabled'); // Reabilita o input do usuário
    document.getElementById('reiniciar').disabled = true; // Desabilita o botão de reinício
}

// Função para limpar o campo de entrada do usuário
function limparCampo(){
    let campoChute = document.querySelector('input');
    campoChute.value = ''; // Limpa o valor do input
}

// Função para tocar um áudio ao acertar ou errar
function tocarAudio(caminho){
    let audio = new Audio(caminho); // Cria um novo objeto de áudio
    audio.play(); // Reproduz o som
}
