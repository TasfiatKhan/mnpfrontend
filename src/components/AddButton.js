import React from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as AddIcon } from '../utils/add.svg'
import classes from './AddButton.module.css'

const AddButton = () => {
    return (
        <Link to="/notes/new" className={classes.floatingbtn}>
            <AddIcon />
        </Link>
    )
}

export default AddButton