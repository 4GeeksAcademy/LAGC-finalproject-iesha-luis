const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const cors = require("cors")({ origin: true });
const { initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const { getAuth } = require("firebase-admin/auth");
const { default: axios } = require("axios");
require("dotenv").config();
const admin = initializeApp({ projectId: "geeks-firebase-72e6d" });
const auth = getAuth(admin);
const firestore = getFirestore(admin);


// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

exports.helloWorld = onRequest((req, res) => {
  cors(req, res, () => {
    logger.info("Hello logs!", { structuredData: true });
    res.send("Hello from Firebase!");
  });
});

exports.getUsers = onRequest((req, res) => {
  cors(req, res, async () => {
    const users = await auth.listUsers();
    console.log(users);

    res.send(users);
  });
});

exports.signUpOrSigninUser = onRequest((req, res) => {
  cors(req, res, async () => {
    const { email } = req.body;

    console.log(email);

    const response = {
      msg: "",
      data: {},
      status: 200,
    };

    if (!email) {
      response.msg = "No email passed";
      response.status = 500;
    }

    if (email) {
      try {
        const documentSnapshot = await firestore
          .collection("user")
          .doc(email)
          .get();

        const data = documentSnapshot.data();

        // if user signing up they don't exist in database yet
        if (!data) {
          console.log("registering user...");
          const user = {
            email,
            created_at: new Date().toISOString(),
          };

          await firestore.collection("user").doc(email).set(user);

          response.data = user;
          response.msg = "Successfully signed up user";
        } else {
          response.data = data;
          response.msg = "Successfully signed in user";
        }
      } catch (e) {
        response.msg = "Error";
        response.status = 500;
      }
    }
    res.status(response.status).send(response);
  });
});

exports.getActivities = onRequest((req, res) => {
  cors(req, res, async () => {
    const {lat,lng} = req.body
    const response = {
      msg: "Succes retrieve activities",
      data: {},
      status: 200,
    };
    if (!lat || !lng){
      response.msg= "Coordinates were not passed"
      response.status= 500
    }
    if(response.status===200){

    try {

      const urlEncodedLatLng = encodeURIComponent(`${lat},${lng}`);
      
      const data= await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${urlEncodedLatLng}&radius=50000&key=${process.env.REACT_APP_GOOGLE_PLACES_API_KEY}`);
      console.log(data.data);
      console.log(encodeURIComponent(`${lat},${lng}`))
      response.data = data.data;
    } catch (error) {
      console.log(encodeURIComponent(`${lat},${lng}`))
      response.status = 500;
      response.msg = error.message;
    }
  }
    res.status(response.status).send(response);
  });



});


exports.getCoordinates = onRequest((req, res) => {
  cors(req, res, async () => {
    //const city = req.body.city
  const {city} = req.body
    const response = {
      msg: "Succes retrieve coordinates",
      data: {},
      status: 200,
    };
    if (!city){
      response.msg= "City was not pass"
      response.status= 500
    }
    if(response.status===200){
      try {
        
        const apiKey = `${process.env.REACT_APP_GOOGLE_PLACES_API_KEY}`;
        const data= await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${apiKey}`);
        console.log(data);
        response.data = data.data;
      } catch (error) {
        
        response.status = 500;
        response.msg = error.message;
      }
    }

    res.status(response.status).send(response);
  });
});