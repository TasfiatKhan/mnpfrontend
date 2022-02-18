import React, { useEffect, useState } from 'react';

const Notes = () => {

    let [notes, setNotes] = useState([])

    useEffect(() => {

    }, [])

    

    return (
        <div className='notes-list'>
            <p>NotesList</p>  
        </div>
  )
};

export default Notes;
