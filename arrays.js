let frutas = ["Maçã", "Banana", "Laranja",];

let nomes = new Array("Ana", "Bruno", "Carlos");

nomes.push("Maya");

nomes.pop();

for (let i = 0; i < nomes.length; i++) {
    console.log(nomes[i]);
}

nomes.forEach(nome => console.log(nome));

nomes.map(nome => console.log(nome));

nomes.filter(n => console.log(n == 'Carlos'));
