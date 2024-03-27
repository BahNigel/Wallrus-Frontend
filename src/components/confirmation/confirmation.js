import './confirmation.scss';
import Logo from '../../images/logo.svg';
import UnderReviewBackground from '../../images/under-review-background.svg';
import UnderReview from '../../images/under-review.svg';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';



const ExploreHomePage = withStyles({
    root: {
        fontSize: '18px !important',
        borderColor: '#000000',
        padding: '5px 15px !important',
        color: '#ffffff',
    },
})(Button);



const Confirmation = (props) => {


    return (
        <div className="main-container-confirmation">
            <div className="loginHeaderConfirmation">
                <img src={Logo} alt="Logo" />
            </div>
            <div className="confirmationContent">
                <div className="underReviewIcons">
                    <img src={UnderReviewBackground} alt="UnderReview" className="underReviewBackground" />
                    <img src={UnderReview} alt="UnderReview" className="underReview" />
                </div>
                <h1 className="confirmation-title">Your profile is under review</h1>
                <p className="confirmation-subtitle">Yay! We are happy that you have expressed interest to join our professionals-only platform. Our on-boarding team will review your details and get back to you within 2 working days.</p>
                <Link to="/"><ExploreHomePage variant="contained" className="exploreBtn">Explore homepage</ExploreHomePage></Link>
            </div>
        </div>
    )
};

export default Confirmation;