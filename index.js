// Search Term
let currentSearchTerm = '';

// Function to fetch data from the API and populate the list
const fetchData = ( searchTerm ) => {

    fetch('https://jsonplaceholder.typicode.com/photos')
        .then( response => response.json() )
        .then( data => {
            const resultsList = document.getElementById('results');
            resultsList.innerHTML = ''; // Clear previous results

            // Filter the data based on the search input
            const filteredData = data.filter( item => item.title.toLowerCase().includes( searchTerm ) );

            // Populate the list with filtered data
            filteredData.forEach( item => {
                const listItem = document.createElement('li');
                listItem.innerText = item.title;
                resultsList.appendChild( listItem );
            } );
        } )
        .catch( error => console.error( 'Error fetching data:', error ) );
}

// Listen for keydown events on the document
document.addEventListener('keydown',  ( event ) => {
    // Check if the pressed key is a letter or a space
    if ((event.key.length === 1 && event.key.match(/[a-z ]/i)) || event.key === "Backspace") {
        // Update the current search term by adding the pressed key or removing the last character
        currentSearchTerm = event.key === "Backspace" ? currentSearchTerm.slice(0, -1) : currentSearchTerm + event.key;

        // Perform the search
        fetchData( currentSearchTerm.toLowerCase() );
    }
});

// Initial fetch to populate the list with all items
fetchData('');