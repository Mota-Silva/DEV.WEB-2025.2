let diaSemana = Math.floor(Math.random() * 10) + 1; // Gera um número aleatório entre 1 e 7
let nomeDoDia;

switch (diaSemana) {
    case 1:
        nomeDoDia = 'Segunda-feira';
        break;
    case 2:
        nomeDoDia = 'Terça-feira';
        break;
    case 3:
        nomeDoDia = 'Quarta-feira';
        break;
    case 4:
        nomeDoDia = 'Quinta-feira';
        break;
    case 5:
        nomeDoDia = 'Sexta-feira';
        break;
    case 6:
        nomeDoDia = 'Sábado';
        break;
    case 7:
        nomeDoDia = 'Domingo';
        break;
    default:
        nomeDoDia = 'Dia inválido';
        break;    
 }

console.log('Hoje é ' + nomeDoDia);
