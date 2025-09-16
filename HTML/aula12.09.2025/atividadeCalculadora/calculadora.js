function adicionar(valor) {
    document.getElementById('visor').value += valor;
}

// Função para limpar o visor
function limpar() {
    document.getElementById('visor').value = '';
}

// Função para apagar o último caractere
function apagar() {
    var visor = document.getElementById('visor');
    visor.value = visor.value.slice(0, -1);
}

function calcularPorcentagem() {
    var visor = document.getElementById('visor');
    try {
        var resultado = eval(visor.value) / 100;
        visor.value = resultado;
    } catch (error) {
        visor.value = 'Erro';
    }
}
   
// Função para calcular o resultado
function calcular() {
    var visor = document.getElementById('visor');
    try {
        var resultado = eval(visor.value);
        visor.value = resultado;
    } catch (error) {
        visor.value = 'Erro';
    }

    
    
}