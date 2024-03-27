import React, {useEffect} from "react"
import { useDispatch, useSelector } from "react-redux";
import { NotificationSettings } from "../../apis/apiCalls"
import "./ToggleButton.scss"
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import RadioGroup from '@material-ui/core/RadioGroup';
import {makeStyles, withStyles} from "@material-ui/core/styles"
import { setPurchaseNotification, setDesignsViewNotification, setPaymentsNotification, setFavouriteNotification, setNewFollowerNotification } from "../../redux/Slices/NotificationSettingSlice/NotificationSettingSlice"
import { selectPurchaseFrequency, selectPaymentsFrequency, selectFavouriteFrequency, selectDesignView, selectFollowersFrequency } from "../../redux/Slices/NotificationSettingSlice/NotificationSettingSlice"



const BlackRadio = withStyles({
    root: {
      color: "#000",
      '&$checked': {
        color: "#000",
      },
    },
    checked: {},
  })((props) => <Radio {...props} />);

const ToggleButtons = (props) =>
{
    const {followerNotification,paymentNotification,designViewNotification,favouriteNotification,purchaseNotification} = props
    
    // const [notification, setNotification] = React.useState('');    
    const purchaseFrequency = useSelector(selectPurchaseFrequency)
    const followerFrequency = useSelector(selectFollowersFrequency)
    const designViewFrequency = useSelector(selectDesignView)
    const favouriteFrequency = useSelector(selectFavouriteFrequency)
    const paymentFrequency = useSelector(selectPaymentsFrequency)

    console.log(purchaseFrequency);
    
    const value = (value) => {
      if(value === 'followerNotification')
      {
        return followerFrequency
      }
      if(value === 'paymentNotification')
      {
        return paymentFrequency
      }
      if(value === 'designViewNotification')
      {
        return designViewFrequency
      }
      if(value === 'favouriteNotification')
      {
        return favouriteFrequency
      }
      if(value === 'purchaseNotification')
      {
        return purchaseFrequency
      }
    }

    const handleChange = (event) => {
        // setNotification(event.target.value)
        props.onChange(event.target)
    };

    
    return(
        <FormControl component="fieldset">
            {/* <FormLabel component="legend">Gender</FormLabel> */}
            <RadioGroup aria-label="user-notifications" name={followerNotification ? 'followerNotification' : paymentNotification ? 'paymentNotification' : designViewNotification ? 'designViewNotification' : favouriteNotification ? 'favouriteNotification' : purchaseNotification ? 'purchaseNotification' : ''} value={followerNotification ? value('followerNotification') : paymentNotification ? value('paymentNotification') : designViewNotification ? value('designViewNotification') : favouriteNotification ? value('favouriteNotification') : purchaseNotification ? value('purchaseNotification') : '' } onChange={handleChange} row className = "radio-container">
                <FormControlLabel value="Immediately" control={<BlackRadio size="small"/>} label="Immediately" className = "radio-btn" style = {{marginRight: "40px"}}/>
                <FormControlLabel value="Daily" control={<BlackRadio  size = "small"/>} label="Daily" className = "radio-btn" style = {{marginRight: "40px"}}/>
                <FormControlLabel value="Weekly" control={<BlackRadio size = "small"/>} label="Weekly" className = "radio-btn" style = {{marginRight: "40px"}}/>
                <FormControlLabel value="Monthly" control={<BlackRadio  size = "small"/>} label="Monthly" className = "radio-btn" style = {{marginRight: "40px"}}/>
            </RadioGroup>
        </FormControl>
    )
}


export default ToggleButtons