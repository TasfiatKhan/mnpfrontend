import React, { useState, useEffect, useContext } from 'react'
import AuthContext from '../utils/AuthContext'
import { Link } from 'react-router-dom'
import classes from './NotePage.module.css'
import Card from '../utils/Card'

const NotePage = ({ match, history }) => {

    let noteId = match.params.id
    let [note, setNote] = useState(null)
    let [tagNames, setTagNames] = useState(null)
    let {authTokens, logoutUser} = useContext(AuthContext)

    useEffect(() => {
        getNote()
    }, [noteId])


    let getNote = async () => {
        if (noteId === 'new') return

        let response = await fetch(`http://127.0.0.1:8000/api/notes/${noteId}/`, {
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer ' + String(authTokens.access)
            }
        })
        let data = await response.json()

        let tags = data.tag.map((tag, index) => {
            return ' ' + tag.tag_name;
        })
        setNote(data)
        setTagNames(tags)

    }

    let deleteNote = async () => {
        fetch(`http://127.0.0.1:8000/api/notes/${noteId}/`, {
            method: 'DELETE',
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
            }
        })
        history.push('/')
    }
    


    let updateNote = async () => {
        fetch(`http://127.0.0.1:8000/api/notes/${noteId}/`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
            },
            body: JSON.stringify(note)
        })
    }
{/* 
    let createNote = async () => {
        fetch(`http://127.0.0.1:8000/api/notes/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(noteBody)
        })
    }


    let updateNote = async () => {
        fetch(`http://127.0.0.1:8000/api/notes/${noteId}/`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(noteBody)
        })
    }


    let deleteNote = async () => {
        fetch(`http://127.0.0.1:8000/api/notes/${noteId}/`, {
            method: 'DELETE',
            'headers': {
                'Content-Type': 'application/json'
            }
        })
        history.push('/')
    }
*/ } 
    let handleSubmit = () => {
        
        if (noteId !== 'new' && note.body === '') {
            deleteNote()
        } else if (noteId !== 'new') {
            updateNote()
        } //else if (noteId === 'new' && noteBody.body !== null) {
            //createNote()
        //}
        history.push('/')
    }


    let handleChange = (value) => {
        setNote(note => ({ ...note, 'body': value }))
    }

    return (
        <Card>           
            <div className={classes.note} >
                <div className={classes.tags}>
                    <h3>
                        {'Tags: ' + tagNames }
                    </h3>
                </div>

                <div className={classes.text}>
                    <textarea onChange={(e) => { handleChange(e.target.value) }} value={note?.body}></textarea>
                </div>

                {noteId !== 'new' ? (
                    <div>
                        <button onClick={deleteNote}>Delete</button>
                    </div>                       
                    ) : (null//<button onClick={handleSubmit}>Done</button>
                )}
                                       
                <div className={classes.save}>
                    <button onClick={handleSubmit}>Save</button>
                </div>                                      
            </div>
        </Card>

    )
}

export default NotePage


