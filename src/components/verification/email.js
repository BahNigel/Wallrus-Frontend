import './email.scss';
import Logo from '../../images/logo.svg'
import TextField from '@material-ui/core/TextField';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    label: {
        color: 'rgb(0, 0, 0)'
    }
}));

const InputTextField = withStyles({
    root: {
        '& input + fieldset': {
            borderWidth: 1,
            borderRadius: `12px 12px 0 0`
        },
        '& input:focus + fieldset': {
            borderColor: 'black !important'
        },
        '& label.Mui-focused': {
            color: 'black',
        },
    },
})(TextField);

const EmailVerification = (props) => {

    const classes = useStyles();

    return (

        <div className="main-container-email-verification">
            <div className="loginHeaderEmailVerification">
                <img src={Logo} alt="Logo" />
            </div>
            <div className='centerEmailContent'>
                <div className="emailContent">
                    <h1 className='emailVerificationTitle'>Verify your Email</h1>
                    <p className='emailVerificationSubTitle'>An 6-digit verification code is sent on thewallruscompany@gmail.com</p>

                    <InputTextField className="email-verification-input" label="Code" variant="outlined" fullWidth InputLabelProps={{
                        classes: {
                            root: classes.label,
                        }
                    }} />

                    <Button variant="contained" className="verifyEmailBtn" >
                        Verify
                    </Button>
                    <p className='emailVerificationlastTitle'>Did not recieve? <span className='span-dark'> Resend code</span></p>
                </div>
            </div>
        </div>
    )

};

export default EmailVerification;