import './ManageAccount.scss';
import { useState } from 'react';
import { Button, FormControlLabel, Checkbox } from "@material-ui/core"

const ManageAccount = (props) => {

  const [state, setState] = useState(false);

  const handleChange = (event) => {
    setState(!state);
  };

  return (
    <div className="manage-account">
      <h3>
        Delete your The Wallrus Company Account
      </h3>
      <p>You’ll no longer be able to upload new design, order design and your account and all design will be lost.</p>
      <FormControlLabel
        control={
          <Checkbox
            checked={state}
            onChange={handleChange}
            name="checkedB"
            color="black"
          />
        }
        style={{ fontSize: '2rem' }}
        label={<span style={{ fontSize: '16px', fontWeight: 'normal' }} >Yes, I want to permanently delete this Account and all design.</span>}
      />
      <Button variant="outlined" className="delete-account">Delete Account</Button>
    </div>
  )
};

export default ManageAccount;