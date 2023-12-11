

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

export default function Saved() {
  const [savedLists, setSavedLists] = useState(
    JSON.parse(localStorage.getItem('savedLists')) || []
  );
  const [customTitles, setCustomTitles] = useState(() => {
    const storedTitles = JSON.parse(localStorage.getItem('customTitles')) || {};
    return savedLists.map((list, index) => storedTitles[index] || '');
  });
  const navigate = useNavigate();

  const handleDeletePlace = (listIndex, placeIndex) => {
    const newItinerary = [...savedLists];
    newItinerary[listIndex].places.splice(placeIndex, 1);
    setSavedLists(newItinerary);
    localStorage.setItem('savedLists', JSON.stringify(newItinerary));
  };

  const handleCustomTitleChange = (index, newTitle) => {
    setCustomTitles((prevTitles) => {
      const newTitles = [...prevTitles];
      newTitles[index] = newTitle;
      localStorage.setItem('customTitles', JSON.stringify(newTitles));
      return newTitles;
    });
  };

  const groupPlacesByArea = (places) => {
    const areaGroups = {};

    places.forEach((place) => {
      const area = place.area; // Replace with the actual property that holds the area information
      if (!areaGroups[area]) {
        areaGroups[area] = [];
      }
      areaGroups[area].push(place);
    });

    return areaGroups;
  };

  const groupedPlaces = groupPlacesByArea(
    savedLists.flatMap((list, listIndex) =>
      list.places.map((place, placeIndex) => ({ ...place, listIndex, placeIndex }))
    )
  );

  const goBack = () => {
    let path = `/explore`; // Adjust the path as needed
    navigate(path);
  };

  // Save changes to custom titles when the component unmounts
  useEffect(() => {
    return () => {
      localStorage.setItem('customTitles', JSON.stringify(customTitles));
    };
  }, [customTitles]);

  return (
    <div className='whole-container'>
        <div className="Go-back-button-on-saved" onClick={goBack}>
          &larr; Go back
        </div>
    <div className="container">
      <div className="w3-col m4 l3">
        <h1 className="title">Saved Itineraries</h1>
        {Object.keys(groupedPlaces).length > 0 ? (
          Object.keys(groupedPlaces).map((area, index) => (
            <div key={index}>
              <h3 className="list-title-on-saved">
                {customTitles[groupedPlaces[area][0].listIndex] || area}
              </h3>
              {groupedPlaces[area].map((place, placeIndex) => (
                <div key={placeIndex} className="list-container">
                  <p className="list-item">
                    {place.name}
                    <button
                      className="delete-place-button"
                      onClick={() =>
                        handleDeletePlace(place.listIndex, place.placeIndex)
                      }
                    >
                      Delete
                    </button>
                  </p>
                </div>
              ))}
              <input
                type="text"
                placeholder="Enter custom title"
                value={customTitles[groupedPlaces[area][0].listIndex] || ''}
                onChange={(e) =>
                  handleCustomTitleChange(
                    groupedPlaces[area][0].listIndex,
                    e.target.value
                  )
                }
              />
            </div>
          ))
        ) : (
          <div className="empty-itinerary">
            <h2>My Itinerary</h2>
            <p>No items in the itinerary yet.</p>
          </div>
        )}
      </div>
    </div>
    </div>
  );
}
