import './account-type.scss';
import React from 'react';
import Radio from '@material-ui/core/Radio';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectAccountType, setAccountType } from '../../redux/Slices/userSignUpSlice/userSignUpSlice';

export default function AccountType(props) {
    const [selectedValue, setSelectedValue] = React.useState('a');
    const dispatch = useDispatch();
    const accountType = useSelector(selectAccountType);
    const handleChange = (event) => {
        setSelectedValue(event.target.value);
        dispatch(
            setAccountType(
                {
                    account_type: event.target.value
                }
            )
        )


    }





    return (
        <div className='accountType'>
            <div className='account-type-header'>
                <div>
                    <h1 className='account-type-title'>Select Account Type</h1>
                    <p className='account-type-sub-title'>To get started, tell us about your business</p>
                </div>
                <div className="memberStatusAccountType">
                    <span>Already a member?</span>
                    <Link to="/login" className="linkAccountType">Log In</Link>
                </div>
            </div>


            <div className="radioContainer">
                <div className='radio-cards'>
                    <Radio
                        checked={accountType === 'Artist'}
                        onChange={handleChange}
                        value="Artist"
                        color="primary"
                        name="radio-button-demo"
                        inputProps={{ 'aria-label': 'A' }}

                    />
                    <span className='radio-title'>I'm an Artist</span>
                    <p className='radio-sub-title'>I would like to partner with this platform and monetize my designs for various decor solutions</p>
                </div>
                <div className='radio-cards'>
                    <Radio
                        checked={accountType === 'Interior Decorator'}
                        onChange={handleChange}
                        value="Interior Decorator"
                        color="primary"
                        name="radio-button-demo"
                        inputProps={{ 'aria-label': 'B' }}
                    />
                    <span className='radio-title'>I'm an Interior Decorator</span>
                    <p className='radio-sub-title'>I would like to use this platform to source various decor solutions for my projects</p>
                </div>
                <div className='radio-cards'>
                    <Radio
                        checked={accountType === 'Organization'}
                        onChange={handleChange}
                        value="Organization"
                        color='primary'
                        name="radio-button-demo"
                        inputProps={{ 'aria-label': 'D' }}
                    />
                    <span className='radio-title'>I’m an Organization</span>
                    <p className='radio-sub-title'>We are an Architecture/Interior Design organization with multiple users who will use this platform to source decor applications</p>
                </div>

            </div>
        </div>


    )
}