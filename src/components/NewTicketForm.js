import React from "react";
import PropTypes from "prop-types";
import ReusableForm from "./ReusableForm";
import { useFirestore } from 'react-redux-firebase';

function NewTicketForm(props){

  const firestore = useFirestore();

  function addTicketToFirestore(event) {
    event.preventDefault();
    props.onNewTicketCreation();
    return firestore.collection('tickets').add(
      {
        names: event.target.names.value,
        location: event.target.location.value, 
        issue: event.target.issue.value,
        timeOpen: firestore.FieldValue.serverTimestamp()
      }
    );
  }

  return (
    <React.Fragment>
      <ReusableForm 
        formSubmissionHandler={addTicketToFirestore}
        buttonText="Help!" />
    </React.Fragment>
  );
}

NewTicketForm.propTypes = {
  onNewTicketCreation: PropTypes.func
};

export default NewTicketForm;

// Is this still shared state, or are we now updating local state? If it's shared where are we accessing the firestoreReducer/state slice?
// Why do we need redux if we are using a database now? Are we replacing the store?
// Why do we still need reducers/what are they doing? Do we need reducers and a store and a database?
// Do we need actions at all? We only use toggleForm now; could we use a hook to update that state instead?