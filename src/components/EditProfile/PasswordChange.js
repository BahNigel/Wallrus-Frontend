import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { withStyles, makeStyles } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import "./PasswordChange.scss"
import { selectEmail_AboutYou, setEmail_AboutYou } from "../../redux/Slices/userSignUpSlice/userSignUpSlice"
import {
    setOldPassword,
    setNewPassword,
    setConfirmNewPassword,
    selectOldPassword,
    selectNewPassword,
    selectConfirmNewPassword
} from "../../redux/Slices/changePasswordSlice/changePasswordSlice";



const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#000000"
        }
    }
})
const useStyles = makeStyles(theme => ({
    label: {
        color: "#000"
    }
}))
const InputTextField = withStyles({
    root: {
        '& input + fieldset': {
            borderWidth: 1,
            borderRadius: `12px 12px 0 0`,
        },
        '& input:focus + fieldset': {
            borderColor: 'black !important'
        },
        '& label.Mui-focused': {
            color: 'black',
        }
    },
})(TextField);

const ChangePass = (props) => {
    const [userVal, setUserVal] = useState('');
    const [newPass, setNewPass] = useState()
    const [confirmPass, setConfirmPass] = useState()
    const [error, setError] = useState({
        emailError: false,
        oldPassword: false,
        newPassword: false,
        confirmNewPass: false
    })
    const Email = useSelector(selectEmail_AboutYou)
    const dispatch = useDispatch()
    const classes = useStyles()
    const emailRegex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    const { emailError, oldPassword, newPassword, confirmNewPass } = error

    const oldPasswordValue = useSelector(selectOldPassword);
    const newPasswordValue = useSelector(selectNewPassword);
    const confirmPasswordValue = useSelector(selectConfirmNewPassword);



    const handleChange = (e, msg) => {
        if (msg === 'email') {
            (e.target.value === '' || emailRegex.test(e.target.value) === false) ? setError({ ...error, emailError: true }) : setError({ ...error, emailError: false })
            dispatch(setEmail_AboutYou(
                {
                    email_aboutyou: e.target.value
                }
            ))
        }

        if (msg === 'old-pass') {
            (e.target.value === '' || e.target.value.length < 8) ? setError({ ...error, oldPassword: true }) : setError({ ...error, oldPassword: false })
            dispatch(setOldPassword(
                {
                    oldPassword: e.target.value
                }
            ))
        }

        if (msg === 'new-pass') {
            (e.target.value === '' || !strongRegex.test(e.target.value)) ? setError({ ...error, newPassword: true }) : setError({ ...error, newPassword: false })
            setNewPass(e.target.value);
            dispatch(setNewPassword(
                {
                    newPassword: e.target.value
                }
            ))
        }
        if (msg === 'confirm-pass') {
            setConfirmPass(e.target.value)
            dispatch(setConfirmNewPassword(
                {
                    confirmNewPassword: e.target.value
                }
            ))
        }

    }



    if (props.handleValidity) {
        ((!oldPassword && !newPassword && !confirmNewPass) && oldPasswordValue !== '' && newPasswordValue !== '' && confirmPasswordValue !== '' && newPasswordValue === confirmPasswordValue) ? props.handleValidity(false) : props.handleValidity(true)
    }

    return (


        <div className="change-credentials">

        

            <InputTextField

                className="old-pass"
                error={oldPassword ? true : false}
                helperText={oldPassword && "Please enter your valid old password"}
                label="Old password"
                variant="outlined"
                InputLabelProps={{ classes: { root: classes.label } }}
                fullWidth
                type="password"
                onChange={e => handleChange(e, 'old-pass')}
            />
            <InputTextField

                className="new-pass"
                error={newPassword ? true : false}
                helperText={newPassword && "Password must contain atleast 1 lowercase alphabet, 1 uppercase alphabet, 8 characters or longer, 1 numeric character and atleast 1 special character"}
                label="New password"
                variant="outlined"
                InputLabelProps={{ classes: { root: classes.label } }}
                fullWidth
                type="password"
                onChange={e => handleChange(e, 'new-pass')}
            />
            <InputTextField

                className="confirm-pass"
                label="Re-enter new password"
                error={(confirmPass === newPass) ? false : true}
                helperText={(confirmPass !== newPass) ? "Passwords do not match" : ''}
                variant="outlined"
                InputLabelProps={{ classes: { root: classes.label } }}
                fullWidth
                type="password"
                onChange={e => handleChange(e, 'confirm-pass')}

            />

        </div>
    )
}

export default ChangePass;