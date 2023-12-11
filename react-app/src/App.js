// App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ContextProvider from './Context';
import Landingpage from './component/Landingpage';
import Explore from './component/Explore';
import List from './component/List';
import Saved from './component/Saved';
import Details from './component/Details';
// import Map from './component/Map';
import PlaceSearch from './component/Placesearch';
import ExploreDetail from './component/Exploredetail';
// import CityToLatLngConverter from './component/Geolocation';
// import Auth from './component/Auth';


export default function App() {
  return (
    <BrowserRouter>
      <ContextProvider>
        <Routes>
          {/* Add the Auth route */}
        
          <Route path="/" element={<Landingpage />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/exploredetail" element={<ExploreDetail />} />
          <Route path="/list" element={<List />} />
          <Route path="/saved-lists" element={<Saved />} />
          <Route path="/list/:index" element={<List />} />
          <Route path="/itinerary/:listIndex" element={<Details />} />
          <Route path="/placesearch" element={<PlaceSearch />} />

        </Routes>
      </ContextProvider>
    </BrowserRouter>
  );
}
