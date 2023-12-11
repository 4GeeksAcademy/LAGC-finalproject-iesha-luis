// import React, { useEffect, useContext, useState } from 'react';
// import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
// import { auth } from '../index';
// import { Context } from '../Context';

// const provider = new GoogleAuthProvider();

// function Landingpage() {
//   const { setUser } = useContext(Context);
//   const [isNavOpen, setIsNavOpen] = useState(false);
//   const [generatedCountry, setGeneratedCountry] = useState('');

//   const countryNames = [
//     "Italy",
//     "Japan",
//     "Spain",
//     "France",
//     "Greece", "USA", "Canada", "Africa", "Brazil", "China", "Ireland", "Denmark", "Turkey", "Thailand", "Mexico", "Vietnam"
//   ];

//   function generateRandomCountry() {
//     const randomIndex = Math.floor(Math.random() * countryNames.length);
//     return countryNames[randomIndex];
//   }

//   useEffect(() => {
//     // Set up interval to regenerate the country name every 5 seconds
//     const intervalId = setInterval(() => {
//       setGeneratedCountry(generateRandomCountry());
//     }, 2000);

//     // Initial generation
//     setGeneratedCountry(generateRandomCountry());

//     // Clean up the interval when the component unmounts
//     return () => clearInterval(intervalId);
//   }, []);

//   return (
//     <div className="landingpage">
//       <div className="title">Voyage<span className='hawk'>Hawk</span></div>
//       <div className="hamburger-icon" onClick={() => setIsNavOpen(!isNavOpen)}>
//         <div className="bar"></div>
//         <div className="bar"></div>
//         <div className="bar"></div>
//       </div>
//       <ul className={`nav-list ${isNavOpen ? 'active' : ''}`}>
//         <li><a href="/">Home</a></li>
//         <li><a href="/Explore">Explore</a></li>
//         <li><a href="/List">Build an Itinerary</a></li>
//         <li><a href="/Geolocation">Explore Hotels</a></li>
//         <li><a href="/Placesearch">Things to do</a></li>
//         <li><a href="/Saved-lists">Favorites</a></li>
//         <li><div className='signout' onClick={() => auth.signOut()}>Sign out</div></li>
//       </ul>
//       <div className='blue-block'>
//         <nav className="nav">
//           <div className="nav-tabs">
//             {/* Move the title here */}
//           </div>
//         </nav>

//         <div className="slogans">
//           <p className='slogan'>
//             Explore <span className="generated-country">{generatedCountry}</span>
//           </p>
//           <p className='sloganss'><em>Discover limitless horizons with Voyage Hawk.
//             Seamlessly plan immersive itineraries, from iconic landmarks to hidden treasures,
//             and set off on a voyage where your journey awaits.</em></p>
//           <div className='signin-login-buttons'>
//             <button className='login-button'> <a href="/">Login</a></button>
//             <button className='signin' onClick={(e) => {
//               signInWithPopup(auth, provider)
//                 .then(async (result) => {
//                   const credential = GoogleAuthProvider.credentialFromResult(result);
//                   const token = credential.accessToken;
//                   const user = result.user;
//                   console.log('token: ', token);
//                   console.log('user: ', user);

//                   const res = await fetch(`${process.env.REACT_APP_FIREBASE_FUNCTIONS_HOST}/geeks-firebase-72e6d/us-central1/signUpOrSigninUser`, {
//                     method: 'post',
//                     body: JSON.stringify({ email: user.email }),
//                     headers: {
//                       'Content-Type': 'application/json'
//                     }
//                   });

//                   const dbUser = await res.json();
//                   console.log('data: ', dbUser);
//                 }).catch((error) => {
//                   console.error(error);
//                   const errorCode = error.code;
//                   const errorMessage = error.message;
//                   const email = error.customData.email;
//                   const credential = GoogleAuthProvider.credentialFromError(error);
//                 });
//             }}>Sign Up</button>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }

// export default Landingpage;









// import React, { useEffect, useContext, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
// import { auth } from '../index';
// import { Context } from '../Context';

// const provider = new GoogleAuthProvider();

// function Landingpage() {
//   const { setUser } = useContext(Context);
//   const [isNavOpen, setIsNavOpen] = useState(false);
//   const [generatedCountry, setGeneratedCountry] = useState('');

//   const countryNames = [
//     "Italy", "Japan", "Spain", "France", "Greece", "USA", "Canada", "Africa", "Brazil", "China",
//     "Ireland", "Denmark", "Turkey", "Thailand", "Mexico", "Vietnam"
//   ];

//   function generateRandomCountry() {
//     const randomIndex = Math.floor(Math.random() * countryNames.length);
//     return countryNames[randomIndex];
//   }

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       setGeneratedCountry(generateRandomCountry());
//     }, 2000);

//     setGeneratedCountry(generateRandomCountry());

//     return () => clearInterval(intervalId);
//   }, []);

//   return (
//     <div className="landingpage">
//       <div className="title">Voyage<span className='hawk'>Hawk</span></div>
//       <div className="hamburger-icon" onClick={() => setIsNavOpen(!isNavOpen)}>
//         <div className="bar"></div>
//         <div className="bar"></div>
//         <div className="bar"></div>
//       </div>
//       <ul className={`nav-list ${isNavOpen ? 'active' : ''}`}>
//         <li><a href="/">Home</a></li>
//         <li><a href="/Explore">Explore</a></li>
//         <li><a href="/List">Build an Itinerary</a></li>
//         {/* <li><a href="/Geolocation">Explore Hotels</a></li> */}
//         <li><a href="/Placesearch">Things to do</a></li>
//         <li><a href="/Saved-lists">Favorites</a></li>
//         <li><div className='signout' onClick={() => auth.signOut()}>Sign out</div></li>
//       </ul>
//       <div className='blue-block'>
//         <nav className="nav">
//           <div className="nav-tabs">
//             {/* Move the title here */}
//           </div>
//         </nav>

//         <div className="slogans">
//           <p className='slogan'>
//             Explore <span className="generated-country">{generatedCountry}</span>
//           </p>
//           <p className='sloganss'><em>Discover limitless horizons with Voyage Hawk.
//             Seamlessly plan immersive itineraries, from iconic landmarks to hidden treasures,
//             and set off on a voyage where your journey awaits.</em></p>
//           <div className='signin-login-buttons'>
//             <button className='login-button'> <a href="/">Login</a></button>
//             <Link to="/auth">
//               <button className='signin' onClick={(e) => {
//                 signInWithPopup(auth, provider)
//                   .then(async (result) => {
//                     const credential = GoogleAuthProvider.credentialFromResult(result);
//                     const token = credential.accessToken;
//                     const user = result.user;
//                     console.log('token: ', token);
//                     console.log('user: ', user);

//                     // Add your authentication logic here

//                   }).catch((error) => {
//                     console.error(error);
//                     // Handle error
//                   });
//               }}>Sign Up</button>
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Landingpage;






import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../index';
import { Context } from '../Context';
import NavBar from './NavBar';

const provider = new GoogleAuthProvider();

function Landingpage() {
  const { setUser } = useContext(Context);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [generatedCountry, setGeneratedCountry] = useState('');

  const countryNames = [
    "Italy", "Japan", "Spain", "France", "Greece", "USA", "Canada", "Africa", "Brazil", "China",
    "Ireland", "Denmark", "Turkey", "Thailand", "Mexico", "Vietnam"
  ];

  function generateRandomCountry() {
    const randomIndex = Math.floor(Math.random() * countryNames.length);
    return countryNames[randomIndex];
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setGeneratedCountry(generateRandomCountry());
    }, 2000);

    setGeneratedCountry(generateRandomCountry());

    return () => clearInterval(intervalId);
  }, []);

  const handleSignInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      console.log('token:', token);
      console.log('user:', user);

      // Update user state
      setUser(user);

      // Additional authentication logic if needed
    } catch (error) {
      console.error(error);

      // Check if the error is due to popup blocking
      if (error.code === 'auth/popup-blocked') {
        console.log('Popup blocked by the browser. Please allow pop-ups and try again.');
      } else {
        // Handle other errors
        console.error('Authentication error:', error.message);
      }
    }
  };

  return (
    <div className="landingpage">
      {/* <div className="main-title">Voyage<span className='hawk'>Hawk</span></div>
      <div className="hamburger-icon2" onClick={() => setIsNavOpen(!isNavOpen)}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div> */}
      <NavBar/>
      <ul className={`nav-list ${isNavOpen ? 'active' : ''}`}>
        <li><a href="/">Home</a></li>
        <li><a href="/Explore">Explore</a></li>
        <li><a href="/List">Build an Itinerary</a></li>
        <li><a href="/Placesearch">Things to do</a></li>
        <li><a href="/Saved-lists">Favorites</a></li>
    
      </ul>
      <div className='blue-block'>
        <nav className="nav">
          <div className="nav-tabs">
            {/* Move the title here */}
          </div>
        </nav>

        <div className="slogans">
          <p className='slogan'>
            Explore <span className="generated-country">{generatedCountry}</span>
          </p>
          <p className='sloganss'>
            <em>
              Discover limitless horizons with Voyage Hawk. Seamlessly plan immersive itineraries,
              from iconic landmarks to hidden treasures, and set off on a voyage where your journey awaits.
            </em>
          </p>
          {/* <div className='signin-login-buttons'> */}
           
            <button className='login-button'>
              <Link to="/Explore">Get Started</Link>
            </button>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
}

export default Landingpage;
