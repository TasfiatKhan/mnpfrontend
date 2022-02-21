import React, { useState, useEffect, useContext } from 'react'
import AuthContext from '../utils/AuthContext'
import classes from './NotePage.module.css'
import Card from '../utils/Card'
import Select from 'react-select'


const NotePage = ({ match, history }) => {

    let noteId = match.params.id
    let [note, setNote] = useState(null)
    let [tagNames, setTagNames] = useState(null)
    let [allTags, setAllTags] = useState([])
    let [selectTags, setSelectTags] = useState([])
    let {authTokens} = useContext(AuthContext)

    useEffect(() => {
        getNote()
    }, [noteId])

    useEffect(() => {
        getTags()
    }, [])

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
        console.log(data)
        let tags = data.tag.map((tag, index) => {
            return ' ' + tag.tag_name;
        })
        setNote(data)
        setTagNames(tags)

    }

    let getTags = async () => {

        let response = await fetch(`http://127.0.0.1:8000/api/tags/`, {
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer ' + String(authTokens.access)
            }
        })
        let data = await response.json()
 
        setAllTags(
            data.map((tag) => (
                {
                    value: tag.id,
                    label: tag.tag_name,
                }
            )),
            )
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





    




    let createNote = async () => {

        console.log(note)

        fetch(`http://127.0.0.1:8000/api/notes/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
            },
            body: JSON.stringify(note)
        })
        
    }


    let handleSubmit = () => {
        
        if (noteId !== 'new' && note.body === '') {
            deleteNote()
        } else if (noteId !== 'new') {
            updateNote()
        } else if (noteId === 'new' && note.body !== null) {
            createNote()
        }
        history.push('/')
    }

//        let tags = data.tag.map((tag, index) => {
  //  return ' ' + tag.tag_name;
//})


    let selectHandle = (e) => {
        setSelectTags((e) => {
            e.map((tag) => {
                return Array [tag.id = e.value]
            })
            

        })

        setNote(note => ({ ...note, 'tag':selectTags }))
    }

    let handleChange = (value) => {
        setNote(note => ({ ...note, 'body': value }))
    }

    return (
        <Card>           
            <div className={classes.note} >
                <div className={classes.tags}>
                    {noteId !== 'new' ? (
                        <h3>
                            {'Tags: ' + tagNames }
                        </h3>
                    ):( 
                        <Select                         
                        options={allTags} 
                        isSearchable
                        isMulti 
                        onChange={selectHandle}
                        placeholder="Select tags"
                        />
                    )}


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


