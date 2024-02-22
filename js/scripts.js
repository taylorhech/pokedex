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
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('button-class')
        listItem.appendChild(button);
        pokemonList.appendChild(listItem);
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
            item.types = details.types;
        }).catch(function (e) {
            console.error(e);
        });
    }

    //Function to show the content in the modal
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function ()  {
        //Clear all existing modal content
        modalContainer.innerHTML = '';

        let modal = document.createElement('div');
        modal.classList.add('modal');

        //Add the new modal content
        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'Close';
        closeButtonElement.addEventListener('click', hideModal);

        let titleElement = document.createElement('h1');
        titleElement.innerText = pokemon.name;

        let contentElement = document.createElement('p');
        contentElement.innerText = 'Height: ' + pokemon.height; //

        let imageElement = document.createElement('img');
        imageElement.src = pokemon.imageUrl;
        imageElement.alt = pokemon.name;

        modal.appendChild(closeButtonElement);
        modal.appendChild(titleElement);
        modal.appendChild(contentElement);
        modal.appendChild(imageElement);
        modalContainer.appendChild(modal);

        modalContainer.classList.add('is-visible');
    });
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


    //Function that's executed when user clicks on a Pokemon- gets the Pokemon's details from the server
    // function showDetails(pokemon) {
    //     loadDetails(pokemon).then(function () {
    //         showModal(pokemon.name, 'Height: ' + pokemon.height, pokemon.imgageUrl)
    //     });
    // }

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