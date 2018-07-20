import constants from './../constants';
const { firebaseConfig, c } = constants;
import Firebase from 'firebase';

Firebase.initializeApp(firebaseConfig);
const entries = Firebase.database().ref('entries');

export function addEntry(_recipient, seat, _location, _donor) {
  return () => tickets.push({
    recipient: _recipient,
    seat: _seat,
    location: _location,
    donor: _donor
  });
}

export function watchFirebaseEntryRef() {
  return function(dispatch) {
    entries.on('child_added', data => {
      const newEntry = Object.assign({}, data.val(), {
        id: data.getKey(),
      });
      dispatch(receiveEntry(newEntry));
    });
  };
}

function receiveEntry(entryFromFirebase) {
  return {
    type: c.RECEIVE_ENTRY,
    entry: entryFromFirebase
  };
}
