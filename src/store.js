import { createStore, combineReducers, compose } from 'redux';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer} from 'redux-firestore';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';


// configurar firestore

const firebaseConfig = {
    apiKey: "AIzaSyAOk_4gsa4p0CMWqCRBA8W-c7l3k04qIQ8",
    authDomain: "bibliostore-e6e3f.firebaseapp.com",
    databaseURL: "https://bibliostore-e6e3f.firebaseio.com",
    projectId: "bibliostore-e6e3f",
    storageBucket: "bibliostore-e6e3f.appspot.com",
    messagingSenderId: "368081090864",
    appId: "1:368081090864:web:24e97400eaef1f8af230f5"
};
// Inicializar firebase 

firebase.initializeApp(firebaseConfig);

// Configuracion de react redux

const rrfConfig = {
    userProfile: 'user',
    useFirestoreForProfile: true
};
// Crear el enlace con compoe de redux y firestore

const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase,rrfConfig),
    reduxFirestore(firebase)
)(createStore);

// Reducers

const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer
});
const initialState = {};
//crear el store

const store = createStoreWithFirebase(rootReducer,initialState, compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && 
    window.__REDUX_DEVTOOLS_EXTENSION__()
));
export default store;
