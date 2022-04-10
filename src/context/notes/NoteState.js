import NoteContext from './noteContext';
import { useState } from 'react';
const NoteState = (props) => {
    const host = "http://localhost:5000";
    const notesInitial = []

    const [notes, setNotes] = useState(notesInitial)
    //Get All Notes
    const getNotes = async () =>{
        //API Call
        const response = await fetch(`${host}/api/notes/fetchallnotes` , {
            method : 'GET',
            headers: {
                'Content-type' : 'application/json',
                //'auth-token': localStorage.getItem('token')
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIwMDA2YzA1YTcxYmQwNDA4MjUwZTQyIn0sImlhdCI6MTY0NDMyNTA1Nn0.liqRejkmEwuR2TCrjIonRq3IL07z9ghealJIJUs8x64'
            }
        });
        const json = await response.json();
        //console.log(json);
        setNotes(json)
    }
    //Add A Note
    const addNote = async (title, description, tag) => {
        //API Call
        const response = await fetch(`${host}/api/notes/addnotes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body : JSON.stringify({title, description, tag})
        });
        const note = await response.json()
        setNotes(notes.concat(note));
    }
    //Delete A Note
    const deleteNote = async (id)=>{
        //API Calls
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method : 'DELETE',
            headers : {
                'Content-Type' : 'application/json',
                'auth-token' : localStorage.getItem('token')
            }
        });
        const json = response.json();
        console.log(json);
        const newNotes = notes.filter((note)=>{return note._id!==id});
        setNotes(newNotes);
    }
    //Edit A Node
    const editNote = async (id, title, description, tag) => {
        //API Call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json',
                'auth-token' : localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag})
        });
        //eslint-disable-next-line
        const json = response.json();
        //Logic to edit in client
        for (let index = 0; index < notes.length; index++) {
           // const element = notes[index];
            if(notes[index]._id === id){
                notes[index].title = title;
                notes[index].description = description;
                notes[index].tag = tag;
            }
            
        }
    }
    
    return (
        <NoteContext.Provider value={{notes, addNote, deleteNote, editNote, getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState
