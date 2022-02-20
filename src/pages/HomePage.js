import React, {useState, useEffect, useContext} from 'react'
import AuthContext from '../utils/AuthContext'
import Item from '../components/Item'
import classes from './HomePage.module.css'


const HomePage = () => {
    let [notes, setNotes] = useState([])
    let {authTokens, logoutUser} = useContext(AuthContext)

    useEffect(()=> {
        getNotes()
    }, [])


    let getNotes = async() =>{
        let response = await fetch('http://127.0.0.1:8000/api/notes/', {
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer ' + String(authTokens.access)
            }
        })
        let data = await response.json()

        if(response.status === 200){
            setNotes(data)
        }else if(response.statusText === 'Unauthorized'){
            logoutUser()
        }
        
    }

    return (
        <div className={classes.list}>
            <div className={classes.addbtn}>
                <button >Add note</button>
            </div>

            {notes.map((note, index) => (
                <Item key={index} note={note}/>
            ))}
        </div>
    )
}

export default HomePage