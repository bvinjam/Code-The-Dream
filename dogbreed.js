const apiKey = 'live_lVrdg7nIPjze4zHhnQegoYk5z5arqGTsLMj7Hk5AbzZsGZJzYh0rhfdj5DCrQQ30';
const imageUrl = 'https://api.thedogapi.com/v1/images/search';
const breedUrl = 'https://api.thedogapi.com/v1/breeds';

async function fetchDogImage() {
    try {
    const response = await fetch(`${imageUrl}?api_key=${apiKey}`);
    const data = await response.json();
    const dogImageUrl = data[0].url;

    const dogContent = document.getElementById('dog-content');
        dogContent.innerHTML = `
            <h2>Random Dog Image</h2>
            <img src="${dogImageUrl}" alt="A random dog" style="max-width: 100%; height: auto;" />
        `;
    } catch (error) {
        console.error('Error', error);
        alert('Failed.');
    }
}

//Dog Breeds
async function fetchDogBreeds() {
    try {
    const response = await fetch(`${breedUrl}?api_key=${apiKey}`);
    const data = await response.json();
        
    const breedContent = document.getElementById('breed-content');
    breedContent.innerHTML = '';
        
    data.forEach(breed => {
        const breedCard = document.createElement('div');
        breedCard.className = 'card';
        breedCard.innerHTML = `
            <h2>${breed.name}</h2>
            <p><strong>Breed:</strong> ${breed.breed_group || 'N/A'}</p>
             <p><strong>Origin:</strong> ${breed.origin || 'N/A'}</p>
            <p><strong>Temperament:</strong> ${breed.temperament || 'N/A'}</p>
            <p><strong>Life Span:</strong> ${breed.life_span || 'N/A'}</p>
             <img src="${breed.image ? breed.image.url : ''}" alt="${breed.name}" style="max-width: 100%; height: auto;"/>
            `;
        breedContent.appendChild(breedCard);
        });
    } catch (error) {
        console.error('Error getting dog breeds:', error);
        alert('Failed to get dog breeds.');
    }
}

//Event listener
document.getElementById('fetch-dog').addEventListener('click', fetchDogImage);
document.getElementById('fetch-breeds').addEventListener('click', fetchDogBreeds);
