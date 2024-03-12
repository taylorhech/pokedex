// IIFE
let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    let modalContainer = document.querySelector('#modal-container')

    //Returns array list of Pokemon
    function getAll() {
        return pokemonList;
    }
    // Adds a Pokemon to the list
    function add(pokemon) {
        //Validation of proper data input
        if (
            typeof pokemon === 'object' &&
            'name' in pokemon &&
            'detailsUrl' in pokemon
        ) {
            pokemonList.push(pokemon);
        } else {
            console.log('Failed to add pokemon')
        }
    }
    //Creates button list of Pokemon
    function addListItem(pokemon){
        let pokemonList = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        pokemonList.appendChild(listItem);
        listItem.classList.add('list-group-item', 'col-12', 'col-sm-6', 'col-md-4', 'align-self-center');

        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('btn', 'btn-lg', 'btn-block', 'list-btn');
        listItem.appendChild(button);
        button.setAttribute('data-target', '#exampleModal');
        button.setAttribute('data-toggle', 'modal');
        
        button.addEventListener('click', function(event) {
            showDetails(pokemon);
    });
}
    //Promise function to fetch data from the API
    function loadList(){
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        })
    }
    //Function to load the detailed data for a given Pokemon
    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            //Adds the details to the item
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types.map((type) => type.type.name);
        }).catch(function (e) {
            console.error(e);
        });
    }

    //Function to show the details of a pokemon
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            showModal(pokemon);
        });
    }

    //Function to show the content in the modal
    function showModal(pokemon) {
        let modalTitle = $('.modal-title');
        let modalBody = $('.modal-body');
    
        //Clear all existing modal content
        modalTitle.empty();
        modalBody.empty();

        //Creating elements to display in modal
        let nameElement = $('<h1>' + pokemon.name + '</h1>');
        let imageElement = $('<img class="modal-img" style="width:50%">').attr('src', pokemon.imageUrl);
        let heightElement = $('<p>' + 'Height: ' + pokemon.height + '</p>');
        let typesElement = $('<p>' + 'Types: ' + pokemon.types.join(", ") + '</p>');

        modalTitle.append(nameElement);
        modalBody.append(imageElement);
        modalBody.append(heightElement);
        modalBody.append(typesElement);
    }


    //Function to hide the modal
    function hideModal() {
        modalContainer.classList.remove('is-visible');
    }
    modalContainer.addEventListener('click', (e) => {
        let target = e.target;
        if (target === modalContainer) {
            hideModal();
        }
    });

    //Event listener to allow the escape key to exit out of the modal
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
            hideModal();
        }
    });


    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails
    };
})();


pokemonRepository.loadList().then(function() {
    // forEach loop
    pokemonRepository.getAll().forEach(function(pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});




/* forEach loop to iterate over list + details
    document.write(pokemon.name + ' (height: ' + pokemon.height + ') ');
    if (pokemon.height >=3.5) {
        document.write(' - Wow, that\'s big!');
    }
    document.write('<br>') */
/*Adds a pokemon to the already created repository list
pokemonRepository.add({name: 'Ralts', height: .45, types: ['Psychic', 'Fairy']}); */
// console.log(pokemonRepository.getAll());