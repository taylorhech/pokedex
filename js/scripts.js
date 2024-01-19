let pokemonList = [
    {name: 'Tyranitar', height: 1.62, types: ['Dark', 'Rock']},
    {name: 'Mamoswine', height: 3.02, types: ['Ice', 'Ground']},
    {name: 'Rayquaza', height: 5.28, types: ['Dragon', 'Flying']}
    ];

for (let i=0; i<pokemonList.length; i++) {
    document.write(pokemonList[i].name + ' (height: ' + pokemonList[i].height + ') ');
    if (pokemonList[i].height >=3.5) {
        document.write(' - Wow, that\'s big!');
    }
    else {
        document.write('<br>')
    }
}