// IIFE
let pokemonRepository = (function () {
    let repository = [
        {name: 'Tyranitar', height: 1.62, types: ['Dark', 'Rock']},
        {name: 'Mamoswine', height: 3.02, types: ['Ice', 'Ground']},
        {name: 'Rayquaza', height: 5.28, types: ['Dragon', 'Flying']}
    ];

    //Returns array list of Pokemon
    function getAll() {
        return repository;
    }
    // Adds a Pokemon to the list
    function add(pokemon) {
        //Validation of proper data input
        if (
            typeof pokemon === 'object' &&
            'name' in pokemon &&
            'height' in pokemon &&
            'types' in pokemon
        ) {
            repository.push(pokemon);
        } else {
            console.log('Failed to add pokemon')
        }
    }
    //Creates button list of Pokemon
    function addListItem(pokemon){
        let pokemonList = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('button-class')
        listItem.appendChild(button);
        pokemonList.appendChild(listItem);
        button.addEventListener('click', () => showDetails(pokemon));
    }
    function showDetails(pokemon){
        console.log(pokemon); 
    }
    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem
    };
})();

pokemonRepository.add({name: 'Ralts', height: .45, types: ['Psychic', 'Fairy']});
console.log(pokemonRepository.getAll());



// forEach loop
pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
});



/* forEach loop to iterate over list + details
    document.write(pokemon.name + ' (height: ' + pokemon.height + ') ');
    if (pokemon.height >=3.5) {
        document.write(' - Wow, that\'s big!');
    }
    document.write('<br>') */