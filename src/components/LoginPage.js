import React, {useContext} from 'react'
import AuthContext from '../utils/AuthContext'
import classes from './LoginPage.module.css';

const LoginPage = () => {
    let {loginUser} = useContext(AuthContext)


    return (
        <div className={classes.login}>
            <form className={classes.form} onSubmit={loginUser}>
                <div className={classes.username}>
                    <input type="text" name="username" placeholder="Enter Username" />
                </div>
                
                <div className={classes.password}>
                    <input type="password" name="password" placeholder="Enter Password" />
                </div>
                
                <div className={classes.login_btn}>
                    <input type="submit" value="Login"/>
                </div>
                
            </form>
        </div>
    )
}

export default LoginPage