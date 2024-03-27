import React from "react"
import "./edit-design.scss"
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import Navheader from '../Nav-Header/Nav-Header';
import { TextField,Popper,Paper,ClickAwayListener,Grow,MenuItem, MenuList } from "@material-ui/core";
import AlertCircle from '../../images/alert-circle.svg';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import RadioGroup from '@material-ui/core/RadioGroup';
import { ButtonGroup, Checkbox } from "@material-ui/core";
import Plus from '../../images/plus-btn.svg';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Picture from "../../images/colorway-image.svg";
import Delete from "../../images/Delete1.svg";
import SmallDelete from "../../images/Delete.svg";
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import MoreVertIcon from '@material-ui/icons/MoreVert';

  
  
  const useStyles = makeStyles((theme) => ({
    
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
      borderRadius: "12px",
      padding: "40px",
    },
    MainContainer: {
        padding: "0px 0px 48px 0px",
        overflowY:"hidden !important",
    },   
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }, 
    
  }));

  const InputTextField = withStyles({
    root: {

      margin: "20px auto 20px auto !important",
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
    input: {
        '&::placeholder': {
            color: 'black !important',
        }
    }
})(TextField);

const BlackRadio = withStyles({
  root: {
    color: "#000",
    '&$checked': {
      color: "#000",
    },
  },
  checked: {},
})((props) => <Radio {...props} />);
  



const EditDesign = (props) =>
{
    const classes = useStyles();
    const mainRef = React.useRef(null)
    const [value, setValue] = React.useState('Yes');
    const [app, setApp] = React.useState('Wallpaper');
    const [showHidden, setShowHidden] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [drop, setDrop] = React.useState(false);

    const anchorRef = React.useRef(null);

    function handleListKeyDown(event) {
      if (event.key === 'Tab') {
        event.preventDefault();
        setDrop(false);
      }
    }


    const handleToggle = () => {
      setDrop((prevOpen) => !prevOpen);
    };
  
    const handleClose1 = (event) => {
      if (anchorRef.current && anchorRef.current.contains(event.target)) {
        return;
      }
  
      setDrop(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen2 = () => {
        setOpen2(true);
    };

    const handleClose2 = () => {
        setOpen2(false);
    };
    // const classes = styles()
    const handleChange = (event) => {
        setValue(event.target.value);
        setApp(event.target.value);
    };

    const handleHidden =(e) =>{
      setShowHidden(true);
    };

    const scroller = (props) =>
    {
      if(props === 'main')
      {
        mainRef.current.scrollIntoView(
          { block: 'end',  behavior: 'smooth' }
        );
      }
      
  
    }


  return (
    <>
    <div ref = {mainRef}>
      <Navheader />
    </div>
    <Grid className={classes.MainContainer} container spacing={0} direction="column" alignItems="center" justify="center">
        <Grid container className = {classes.root} spacing = {0} item md={11}>
            <div className="button-wrapper">
              <div>
                <Link to="/dashboard">
                <Button variant="contained" className = "edit-design-cancel" disableElevation>
                      Cancel
                  </Button>
                </Link>  
              </div>  
              <div>
                <Button
                  ref={anchorRef}
                  aria-controls={drop ? 'menu-list-grow' : undefined}
                  aria-haspopup="true"
                  onClick={handleToggle}
                >
                  <MoreVertIcon className="hamburger-icon " />
                </Button>
                <Popper open={drop} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                  {({ TransitionProps, placement }) => (
                    <Grow
                      {...TransitionProps}
                      style={{ transformOrigin: placement === 'bottom-start' ? 'left top' : 'left bottom',marginRight:"100px" }}
                    >
                      <Paper>
                        <ClickAwayListener onClickAway={handleClose1}>
                          <MenuList  autoFocusItem={drop} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                            <MenuItem onClick={handleOpen2}>
                              <div className="align-images">  
                                <img src={SmallDelete} alt=""></img>
                                 <p>Delete all designs</p>
                              </div>
                               
                              </MenuItem>

                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Popper>
              </div>
            </div>
            
            <h3 className="edit-design-titlee">Edit your Design</h3>

            <div className="edit-design-form">

            <InputTextField className="edit-design-name" label="Design Name" variant="outlined" fullWidth InputLabelProps={{
                classes: {
                    root: classes.label,
                }
            }} />


            <div className="select-app1">
            <h2>Select Applications</h2>
            <ButtonGroup color="primary" value={app} onChange={handleChange} aria-label="outlined primary button group">
              <Button>Wallpaper</Button>
              <Button>Curtains</Button>
              <Button>Curtain blinds</Button>
              <Button>Table runner</Button>
              <Button>Table cloth</Button>
              <Button className="down">Table placemats</Button>
            </ButtonGroup>
            </div>  

            <InputTextField className="edit-design-tag-design" label="Tag design" variant="outlined" fullWidth InputLabelProps={{
                classes: {
                    root: classes.label,
                }
            }} />
            <div className='text-muted-tags-edit'>
              <div>
              <img src={AlertCircle} className='edit-design-img' alt="" height='14px' width='14px' ></img> <span className='text-muted-edit-design'>Use comma to seperate</span>
              </div>
              <div>
                0/3
              </div>
                
            </div>

            <InputTextField className="edit-design-tag-theme" label="Tag theme" variant="outlined" fullWidth InputLabelProps={{
                classes: {
                    root: classes.label,
                }
            }} />

              <div className='text-muted-tags-edit'>
              <div>
              <img src={AlertCircle} className='edit-design-img' height='14px' width='14px' alt="" ></img> <span className='text-muted-edit-design'>Use comma to seperate</span>
              </div>
              <div>
                0/3
              </div>
                
            </div>

            <h2>Is this design customizable?</h2>
            <FormControl component="fieldset">
            <RadioGroup aria-label="user-notifications" name="notifications" value={value} onChange={handleChange} row className = "radio-container-edit">
                <FormControlLabel value="Yes" control={<BlackRadio size="small"/>} label="Yes" className = "radio-btn-edit" style = {{marginRight: "20px"}}/>
                <FormControlLabel value="No" control={<BlackRadio  size = "small"/>} label="No" className = "radio-btn-edit" style = {{marginRight: "20px"}}/>
            </RadioGroup>
           </FormControl>

            <InputTextField className="edit-design-colorway-name" label="Colorway Name" variant="outlined" fullWidth InputLabelProps={{
                classes: {
                    root: classes.label,
                }
            }} />

            <InputTextField className="edit-design-tag-colour" label="Tag Colour" variant="outlined" fullWidth InputLabelProps={{
                classes: {
                    root: classes.label,
                }
            }} />

            <div className='text-muted-tags-edit'>
              <div>
              <img src={AlertCircle} className='edit-design-img' height='14px' width='14px' alt='' ></img> <span className='text-muted-edit-design'>Use comma to seperate</span>
              </div>
              <div>
                0/3
              </div>
                
            </div>
            

            <InputTextField className="edit-design-link" label="Link" variant="outlined" fullWidth InputLabelProps={{
                classes: {
                    root: classes.label,
                }
            }} />

            <div className='text-muted-tags-link-wrapper'>
                <img src={AlertCircle} className='edit-design-img' height='14px' width='14px' alt="" ></img> <span className='text-muted-edit-design'>Attach google drive,drop box link of your design </span>
            </div>
            
            

            <div class="img-container-edit-design">
              <img className="colorway-picture" src={Picture} alt=""></img>
              <img className="delete-picture" src={Delete} alt="" onClick={handleOpen} />
            </div>

            {

            showHidden ?

              (
                <div className="colorway-hidden">
                <h2>Is this design customizable?</h2>
                <FormControl component="fieldset">
                <RadioGroup aria-label="user-notifications" name="notifications" value={value} onChange={handleChange} row className = "radio-container-edit">
                    <FormControlLabel value="Yes" control={<BlackRadio size="small"/>} label="Yes" className = "radio-btn-edit" style = {{marginRight: "20px"}}/>
                    <FormControlLabel value="No" control={<BlackRadio  size = "small"/>} label="No" className = "radio-btn-edit" style = {{marginRight: "20px"}}/>
                </RadioGroup>
               </FormControl>
    
                <InputTextField className="edit-design-colorway-name" label="Colorway Name" variant="outlined" fullWidth InputLabelProps={{
                    classes: {
                        root: classes.label,
                    }
                }} />
    
                <InputTextField className="edit-design-tag-colour" label="Tag Colour" variant="outlined" fullWidth InputLabelProps={{
                    classes: {
                        root: classes.label,
                    }
                }} />
    
                <div className='text-muted-tags-edit'>
                  <div>
                  <img src={AlertCircle} className='edit-design-img' height='14px' width='14px' alt='' ></img> <span className='text-muted-edit-design'>Use comma to seperate</span>
                  </div>
                  <div>
                    0/3
                  </div>
                    
                </div>
                
    
                <InputTextField className="edit-design-link" label="Link" variant="outlined" fullWidth InputLabelProps={{
                    classes: {
                        root: classes.label,
                    }
                }} />
    
                <div className='text-muted-tags-link-wrapper'>
                    <img src={AlertCircle} className='edit-design-img' height='14px' width='14px' alt="" ></img> <span className='text-muted-edit-design'>Attach google drive,drop box link of your design </span>
                </div>

                <div class="img-container-edit-design">
                <img className="colorway-picture" src={Picture} alt=""></img>
                <img className="delete-picture" src={Delete} alt="" onClick={handleOpen} />
                </div>
                </div> 


              )
              : (
                <Button onClick={handleHidden} className="add-new-colorway"><img alt="" src={Plus} />Add new colorway</Button>
              )

            } 

              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
              >
                <Fade in={open}>
                    <div className="del-modal">
                        <h2>Delete this design?</h2>
                        <p>
                        This can’t be undone and it will be removed from your profile. It will take 30 days incase anyone has selected a product for production.
                        </p>
                        <div className="button-del-wrap">
                          <Button onClick={handleClose} className="cancel-modal-btn">Cancel</Button>
                          <Button className="del-modal-btn">Delete</Button>
                        </div>
                    </div>
                </Fade>
            </Modal>

              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open2}
                onClose={handleClose2}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
              >
                <Fade in={open2}>
                    <div className="del-modal">
                        <h2>Delete all designs?</h2>
                        <p>
                        This can’t be undone and it will be removed from your profile. It will take 30 days incase anyone has selected a product for production.
                        </p>
                        <div className="button-del-wrap">
                          <Button onClick={handleClose2} className="cancel-modal-btn">Cancel</Button>
                          <Button className="del-modal-btn">Delete</Button>
                        </div>
                    </div>
                </Fade>
            </Modal>


          <FormControlLabel
            className="declaration"
            value="declaration"
            control={<Checkbox color="" />}
            label={<span style={{ fontStyle: "normal",
                fontWeight: "normal",
                fontSize: "12px",
                marginTop:"500px !important",
                display: "flex",
                alignItems: "flex-start",
                color: "#6F6F6F" }}>I declare that the artworks being edited are my own creations and are not in violation of any copyright laws. I also approve of its use by The Wallrus Co on this platform under the conditions of the artist agreement</span>}
            />


            <Button className="edit-design-final">Edit Now</Button>

            </div>


            <div className = "back-to-top-edit">

                <Fab color="secondary" size="small" aria-label="scroll back to top edit" variant = "round" className = "fabIcon" onClick = {() => scroller('main')}>
                  <KeyboardArrowUpIcon />
                </Fab>                  
            </div>

        </Grid>
    </Grid>
    </>
  );

}


export default EditDesign;
