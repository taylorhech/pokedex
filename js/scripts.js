let pokemonList = [
    {name: 'Tyranitar', height: 1.62, types: ['Dark', 'Rock']},
    {name: 'Mamoswine', height: 3.02, types: ['Ice', 'Ground']},
    {name: 'Rayquaza', height: 5.28, types: ['Dragon', 'Flying']}
    ];

pokemonList.forEach(function(pokemon){
    document.write(pokemon.name + ' (height: ' + pokemon.height + ') ');
    if (pokemon.height >=3.5) {
        document.write(' - Wow, that\'s big!');
    }
    document.write('<br>')
})