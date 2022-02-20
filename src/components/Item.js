import React from 'react'
import { Link } from 'react-router-dom'
import Card from '../utils/Card'

let getTime = (note) => {
    return new Date(note.updated).toLocaleDateString()
}

let getTags = (note) => {

    let tags = note.tag.map((tag, index) => {
        return ' ' + tag.tag_name;
    })
    
    return tags
}


let getContent = (note) => {

    let content = note.body.replaceAll('\n', ' ')
    

    if (content.length > 200) {
        return content.slice(0, 200) + '...'
    } else {
        return content
    }
}



const Item = ({ note }) => {
    return (
        <Link to={`/notes/${note.id}`} style={{ textDecoration: 'none' }}> 
            <Card>
                <div className="notes-list-item" >
                    <h2>{'Tags: '+  getTags(note)}</h2>
                    <h4>{getContent(note)}</h4>
                    <p><span>{'Updated: '+ getTime(note)} </span></p>
                </div>
            </Card>
        </Link>
    )
}

export default Item