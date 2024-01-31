let pokemonList = [
    {name: 'Tyranitar', height: 1.62, types: ['Dark', 'Rock']},
    {name: 'Mamoswine', height: 3.02, types: ['Ice', 'Ground']},
    {name: 'Rayquaza', height: 5.28, types: ['Dragon', 'Flying']}
    ];

// forEach loop
pokemonList.forEach(function(pokemon){
    document.write(pokemon.name + ' (height: ' + pokemon.height + ') ');
    if (pokemon.height >=3.5) {
        document.write(' - Wow, that\'s big!');
    }
    document.write('<br>')
})

// IIFE
let pokemonRepository = (function () {
    let pokemonList = [
        {name: 'Tyranitar', height: 1.62, types: ['Dark', 'Rock']},
        {name: 'Mamoswine', height: 3.02, types: ['Ice', 'Ground']},
        {name: 'Rayquaza', height: 5.28, types: ['Dragon', 'Flying']}
    ];

    function add(pokemon) {
        pokemonList.push(pokemon);
    }

    function getAll() {
        return pokemonList;
    }

    return {
        add: add,
        getAll: getAll
    };
})();

pokemonRepository.add({name: 'Ralts'});
document.write(pokemonRepository.getAll());