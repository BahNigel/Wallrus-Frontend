import './phone-number.scss';
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

const PhoneNumberVerification = (props) => {

    const classes = useStyles();

    return (

        <div className="main-container-phone-number-verification">
            <div className="loginHeaderPhoneNumberVerification">
                <img src={Logo} alt="Logo" />
            </div>
            <div className='centerPhoneNumberContent'>
                <div className="phoneNumberContent">
                    <h1 className='phoneNumberVerificationTitle'>Verify your phone number</h1>
                    <p className='phoneNumberVerificationSubTitle'>An OTP is sent on +91 9001234567 via message</p>

                    <InputTextField className="phone-number-verification-input" label="OTP" variant="outlined" fullWidth InputLabelProps={{
                        classes: {
                            root: classes.label,
                        }
                    }} />

                    <Button variant="contained" className="verifyPhoneNumberBtn" >
                        Verify
                    </Button>
                    <p className='phoneNumberVerificationlastTitle'>Did not recieve? <span className='span-dark'> Resend code</span></p>
                </div>
            </div>
        </div>
    )

};

export default PhoneNumberVerification;