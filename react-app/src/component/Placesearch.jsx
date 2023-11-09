// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import NavBar from './NavBar';
// import '../App.css';

// export default function PlaceSearch() {
//   // State initialization
//   const [locationInput, setLocationInput] = useState(''); // User-inputted location
//   const [selectedCategories, setSelectedCategories] = useState([]);
//   const [placesResults, setPlacesResults] = useState([]);

//   // Hooks
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Load the Google Maps API when the component mounts
//     loadGoogleMapsAPI();
//   }, []);

//   // Function to load the Google Maps API
//   const loadGoogleMapsAPI = () => {
//     // Load the Google Maps API with your API key
//     const googleMapsApiKey = `${process.env.REACT_APP_GOOGLE_PLACES_API_KEY}`;
//     const script = document.createElement('script');
//     script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&libraries=places`;
//     script.async = true;
//     script.onload = searchPlaces; // Call searchPlaces once the API is loaded
//     document.head.appendChild(script);
//   };

//   // Function to handle category selection
//   const handleCategorySelect = (category) => {
//     if (selectedCategories.includes(category)) {
//       setSelectedCategories((prevCategories) => prevCategories.filter((c) => c !== category));
//     } else {
//       setSelectedCategories((prevCategories) => [...prevCategories, category]);
//     }
//   };

//   // Function to search places based on user input and selected categories
//   const searchPlaces = () => {
//     if (!window.google || !window.google.maps) {
//       // Maps API not available yet, retry in a moment
//       setTimeout(searchPlaces, 100);
//       return;
//     }

//     const geocoder = new window.google.maps.Geocoder();

//     // Use the user-inputted location for geocoding
//     geocoder.geocode({ address: locationInput }, (results, status) => {
//       if (status === window.google.maps.GeocoderStatus.OK && results[0].geometry) {
//         const userLocation = results[0].geometry.location;

//         const service = new window.google.maps.places.PlacesService(document.createElement('div'));

//         const request = {
//           location: userLocation,
//           radius: 5000, // Adjust the radius as needed
//           types: selectedCategories, // Use the selected categories for the search
//         };

//         service.nearbySearch(request, (placesResults, placesStatus) => {
//           if (placesStatus === window.google.maps.places.PlacesServiceStatus.OK) {
//             // Handle the retrieved places (placesResults) here
//             setPlacesResults(placesResults);
//           } else {
//             // Handle error or no results
//             console.error('Error searching for places:', placesStatus);
//           }
//         });
//       } else {
//         // Handle geocoding error
//         console.error('Geocoding error:', status);
//       }
//     });
//   };

//   // Function to navigate back to the Explore page
//   const goBack = () => {
//     let path = `/explore`;
//     navigate(path);
//   };

//   return (
//     <div className="place-search-page">
//       <NavBar />

//       <button className="go-back-button-on-list" onClick={goBack}>
//         &larr; Go back
//       </button>
//       <h1 className="list-title">Customize your Search</h1>
//       <div className="category-selection">
//         <button
//           className={selectedCategories.includes('bar') ? 'selected-category' : 'category-button'}
//           onClick={() => handleCategorySelect('bar')}
//         >
//           Bars
//         </button>
//         <button
//           className={selectedCategories.includes('cafe') ? 'selected-category' : 'category-button'}
//           onClick={() => handleCategorySelect('cafe')}
//         >
//           Cafes
//         </button>
//         <button
//           className={selectedCategories.includes('museum') ? 'selected-category' : 'category-button'}
//           onClick={() => handleCategorySelect('museum')}
//         >
//           Museums
//         </button>
//         <button
//           className={selectedCategories.includes('restaurant') ? 'selected-category' : 'category-button'}
//           onClick={() => handleCategorySelect('restaurant')}
//         >
//           Restaurants
//         </button>
//       </div>

//         {/* Location input */}
//         <input
//           id="location-input"
//           type="text"
//           placeholder="Enter your location"
//           value={locationInput}
//           onChange={(e) => setLocationInput(e.target.value)}
//           className="input"
//         />

//       <button className="search-button" onClick={searchPlaces}>
//         Search Places
//       </button>
//       <div className="selected-categories">
//         Selected Categories: {selectedCategories.join(', ')}
//       </div>

//       <div className="place-results-container">
//         {placesResults.map((place, index) => (
//           <div className="place-result" key={index}>
//             <h2>Name: {place.name}</h2>
//             {place.opening_hours && (
//               <p>Opening Hours: {place.opening_hours.isOpen() ? 'Open now' : 'Closed'}</p>
//             )}
//             {place.photos && place.photos.length > 0 && (
//               <img src={place.photos[0].getUrl()} alt="Place" />
//             )}
//             <p>Price Level: {place.price_level}</p>
//             <p>Rating: {place.rating}</p>
//             <p>User Rating Total: {place.user_ratings_total}</p>
//             <p>Vicinity: {place.vicinity}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import NavBar from './NavBar';
// import '../App.css';

// export default function PlaceSearch() {
//   const [locationInput, setLocationInput] = useState('');
//   const [selectedCategories, setSelectedCategories] = useState([]);
//   const [placesResults, setPlacesResults] = useState([]);

//   const navigate = useNavigate();

//   const loadGoogleMapsAPI = () => {
//     // Ensure you have set your Google Places API key in the environment variables.
//     const googleMapsApiKey = process.env.REACT_APP_GOOGLE_PLACES_API_KEY;

//     if (!googleMapsApiKey) {
//       console.error('Google Places API key not found.');
//       return;
//     }

//     const script = document.createElement('script');
//     script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&libraries=places`;
//     script.async = true;
//     script.onload = searchPlaces;
//     document.head.appendChild(script);
//   };

//   useEffect(() => {
//     loadGoogleMapsAPI();
//   }, []);

//   const handleCategorySelect = (category) => {
//     if (selectedCategories.includes(category)) {
//       setSelectedCategories((prevCategories) => prevCategories.filter((c) => c !== category));
//     } else {
//       setSelectedCategories((prevCategories) => [...prevCategories, category]);
//     }
//   };

//   const searchPlaces = () => {
//     if (!window.google || !window.google.maps) {
//       setTimeout(searchPlaces, 100);
//       return;
//     }

//     const geocoder = new window.google.maps.Geocoder();
//     const inputLocation = locationInput.trim();

//     if (inputLocation.length === 0) {
//       console.error('Location input is empty.');
//       return;
//     }

//     geocoder.geocode({ address: inputLocation }, (results, status) => {
//       if (status === window.google.maps.GeocoderStatus.OK && results[0].geometry) {
//         const userLocation = results[0].geometry.location;
//         const service = new window.google.maps.places.PlacesService(document.createElement('div'));
//         const request = {
//           location: userLocation,
//           radius: 5000,
//           types: selectedCategories,
//         };

//         service.nearbySearch(request, (placesResults, placesStatus) => {
//           if (placesStatus === window.google.maps.places.PlacesServiceStatus.OK) {
//             setPlacesResults(placesResults);
//           } else {
//             console.error('Error searching for places:', placesStatus);
//           }
//         });
//       } else {
//         console.error('Geocoding error:', status);
//       }
//     });
//   };

//   const goBack = () => {
//     let path = `/explore`;
//     navigate(path);
//   };

//   return (
//     <div className="place-search-page">
//       <NavBar />
//       <button className="go-back-button-on-list" onClick={goBack}>
//         &larr; Go back
//       </button>
//       <h1 className="list-title">Customize your Search</h1>
//       <div className="category-selection">
//         <button
//           className={selectedCategories.includes('bar') ? 'selected-category' : 'category-button'}
//           onClick={() => handleCategorySelect('bar')}
//         >
//           Bars
//         </button>
//         <button
//           className={selectedCategories.includes('cafe') ? 'selected-category' : 'category-button'}
//           onClick={() => handleCategorySelect('cafe')}
//         >
//           Cafes
//         </button>
//         <button
//           className={selectedCategories.includes('museum') ? 'selected-category' : 'category-button'}
//           onClick={() => handleCategorySelect('museum')}
//         >
//           Museums
//         </button>
//         <button
//           className={selectedCategories.includes('restaurant') ? 'selected-category' : 'category-button'}
//           onClick={() => handleCategorySelect('restaurant')}
//         >
//           Restaurants
//         </button>
//       </div>

//       <input
//         id="location-input"
//         type="text"
//         placeholder="Enter your location"
//         value={locationInput}
//         onChange={(e) => setLocationInput(e.target.value)}
//         className="input"
//       />

//       <button className="search-button" onClick={searchPlaces}>
//         Search Places
//       </button>

//       <div className="selected-categories">
//         Selected Categories: {selectedCategories.join(', ')}
//       </div>

//       <div className="place-results-container">
//         {Array.isArray(placesResults) && placesResults.map((place, index) => (
//           <div className="place-result" key={index}>
//             <div className="place-info">
//               <h2 className='place-name'><b>Name: {place.name}</b></h2>
//               {place.photos && place.photos.length > 0 && (
//                 <img src={place.photos[0].getUrl()} alt="Place" />
//               )}
//               {place.opening_hours && (
//                 <p>Opening Hours: {place.opening_hours.isOpen() ? 'Open now' : 'Closed'}</p>
//               )}
//               <p>Price Level: {place.price_level}</p>
//               <p>Rating: {place.rating}</p>
//               <p>User Rating Total: {place.user_ratings_total}</p>
//               <p>Vicinity: {place.vicinity}</p>
//                {place.website && (
//       <p>Website: <a href={place.website} target="_blank" rel="noopener noreferrer">{place.website}</a></p>
//     )}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import '../App.css';

export default function PlaceSearch() {
  const [locationInput, setLocationInput] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [placesResults, setPlacesResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5); // Adjust the number of results per page
  const navigate = useNavigate();

  useEffect(() => {
    loadGoogleMapsAPI();
  }, []);

  const loadGoogleMapsAPI = () => {
    const googleMapsApiKey = process.env.REACT_APP_GOOGLE_PLACES_API_KEY;

    if (!googleMapsApiKey) {
      console.error('Google Places API key not found.');
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&libraries=places`;
    script.async = true;
    script.onload = searchPlaces;
    document.head.appendChild(script);
  };

  const handleCategorySelect = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories((prevCategories) => prevCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories((prevCategories) => [...prevCategories, category]);
    }
  };

  const searchPlaces = () => {
    if (!window.google || !window.google.maps) {
      setTimeout(searchPlaces, 100);
      return;
    }

    const geocoder = new window.google.maps.Geocoder();
    const inputLocation = locationInput.trim();

    if (inputLocation.length === 0) {
      console.error('Location input is empty.');
      return;
    }

    geocoder.geocode({ address: inputLocation }, (results, status) => {
      if (status === window.google.maps.GeocoderStatus.OK && results[0].geometry) {
        const userLocation = results[0].geometry.location;
        const service = new window.google.maps.places.PlacesService(document.createElement('div'));
        const request = {
          location: userLocation,
          radius: 5000,
          types: selectedCategories,
        };

        service.nearbySearch(request, (placesResults, placesStatus) => {
          if (placesStatus === window.google.maps.places.PlacesServiceStatus.OK) {
            setPlacesResults(placesResults);
            setCurrentPage(1); // Reset to the first page when new results are retrieved
          } else {
            console.error('Error searching for places:', placesStatus);
          }
        });
      } else {
        console.error('Geocoding error:', status);
      }
    });
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const totalPages = Math.ceil(placesResults.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentResults = placesResults.slice(startIndex, endIndex);

  const addToSavedList = (place) => {
    const savedLists = JSON.parse(localStorage.getItem('savedLists')) || [];
    const newItinerary = {
      location: 'Custom Location Name',
      places: [place],
    };
    savedLists.push(newItinerary);
    localStorage.setItem('savedLists', JSON.stringify(savedLists));
  };

  const goBack = () => {
    let path = `/explore`;
    navigate(path);
  };

  return (
    <div className="place-search-page">
      <NavBar />
      <button className="go-back-button-on-list" onClick={goBack}>
        &larr; Go back
      </button>
      <h1 className="list-title">Customize your Search</h1>
      <div className="category-selection">
        <button
          className={selectedCategories.includes('bar') ? 'selected-category' : 'category-button'}
          onClick={() => handleCategorySelect('bar')}
        >
          Bars
        </button>
        <button
          className={selectedCategories.includes('cafe') ? 'selected-category' : 'category-button'}
          onClick={() => handleCategorySelect('cafe')}
        >
          Cafes
        </button>
        <button
          className={selectedCategories.includes('museum') ? 'selected-category' : 'category-button'}
          onClick={() => handleCategorySelect('museum')}
        >
          Museums
        </button>
        <button
          className={selectedCategories.includes('restaurant') ? 'selected-category' : 'category-button'}
          onClick={() => handleCategorySelect('restaurant')}
        >
          Restaurants
        </button>
      </div>

      <input
        id="location-input"
        type="text"
        placeholder="Enter your location"
        value={locationInput}
        onChange={(e) => setLocationInput(e.target.value)}
        className="input"
      />

      <button className="search-button" onClick={searchPlaces}>
        Search Places
      </button>

      <div className="selected-categories">
        Selected Categories: {selectedCategories.join(', ')}
      </div>

      <div className="place-results-container">
        {Array.isArray(currentResults) && currentResults.map((place, index) => (
          <div className="place-result" key={index}>
            <div className="place-info">
              <h2 className="place-name"><b>Name: {place.name}</b></h2>
              {place.photos && place.photos.length > 0 && (
                <img src={place.photos[0].getUrl()} alt="Place" />
              )}
              {place.opening_hours && (
                <p>Opening Hours: {place.opening_hours.isOpen() ? 'Open now' : 'Closed'}</p>
              )}
              <p>Price Level: {place.price_level}</p>
              <p>Rating: {place.rating}</p>
              <p>User Rating Total: {place.user_ratings_total}</p>
              <p>Vicinity: {place.vicinity}</p>
              {place.website && (
                <p>Website: <a href={place.website} target="_blank" rel="noopener noreferrer">{place.website}</a></p>
              )}
            </div>
            <button className="add-to-list-button" onClick={() => addToSavedList(place)}>
              Add to List
            </button>
          </div>
        ))}
      </div>

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </button>
          <span>{`Page ${currentPage} of ${totalPages}`}</span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
