import React, { useState } from "react";
import "./upload-design.scss";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Chip } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import AlertCircle from "../../images/alert-circle.svg";
import Help from "../../images/help.svg";
// import Radio from '@material-ui/core/Radio';
import {
  useDispatch,
  // useSelector
} from "react-redux";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
  setColorwayName,
  setLink,
  setTagColour,
  // selectColorwayName,
  // selectTagColour,
  // selectLink,
  setCounter,
} from "../../redux/Slices/uploadDesign/uploadDesignSlice";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    borderRadius: "12px",
    padding: "40px",
  },
  MainContainer: {
    padding: "0px 0px 48px 0px",
    overflowY: "hidden !important",
  },

  autocompleteInput: {
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgb(59,59,59)",
      borderWidth: 1,
    },

    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  popupIndicator: {
    visibility: "hidden !important",
  },

  clearIndicator: {
    position: "relative",
    top: "-5px",
    right: "0px",
    width: "0px",
  },

  tag: {
    backgroundColor: "#1B1918",
    position: "relative",
    "& .MuiChip-label": {
      color: "#fff",
      textTransform: "uppercase !important",
    },
    "& .MuiChip-deleteIcon": {
      color: "#fff",
    },
  },
}));

const InputTextField = withStyles({
  root: {
    margin: "20px auto 20px auto !important",
    "& input + fieldset": {
      borderWidth: "1px !important",
      borderRadius: `12px 12px 0 0 !important`,
    },
    "& input:focus + fieldset": {
      borderColor: "black !important",
    },
    "& label.Mui-focused": {
      color: "black !important",
    },
  },
  input: {
    "&::placeholder": {
      color: "black !important",
    },
  },
})(TextField);

const BlackRadio = withStyles({
  root: {
    color: "#000",
    "&$checked": {
      color: "#000",
    },
  },
  checked: {},
})((props) => <Radio {...props} />);

const MultiSelect = (props) => {
  // const [tagColorArray, setTagColourArray] = useState([]);
  const dispatch = useDispatch();
  const { colorArray } = props;
  const classes = useStyles();
  const [disableTagsColor, setDisableTagsColor] = useState(false);
  const [totalColorTags, setTotalColorTags] = useState(0);
  const [colorLimitCheck, setColorLimit] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    dispatch(
      setCounter({
        counter: props.counter - 1,
      })
    );
    if (e.target.id === "colorway-name") {
      dispatch(
        setColorwayName({
          colorway_name: e.target.value,
        })
      );
    }

    if (e.target.id === "upload-design-link") {
      dispatch(
        setLink({
          link: e.target.value,
        })
      );
    }
  };

  const handleChangeForRadio = (event) => {
    setValue(event.target.value);
  };

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      <InputTextField
        className="upload-design-colorway-name"
        id="colorway-name"
        onChange={handleChange}
        label="Colorway Name"
        variant="outlined"
        fullWidth
        InputLabelProps={{
          classes: {
            root: classes.label,
          },
        }}
      />

      <Autocomplete
        multiple
        disabled={colorLimitCheck}
        getOptionDisabled={() => disableTagsColor}
        id="tags-outlined"
        options={colorArray.map((option) => option)}
        filterSelectedOptions
        onChange={(event, value) => {
          dispatch(
            setCounter({
              counter: props.counter - 1,
            })
          );
          setTotalColorTags(value.length);
          if (value.length < 3) {
            setDisableTagsColor(false);
            setColorLimit(false);
          } else {
            setDisableTagsColor(true);
            setColorLimit(true);
          }
          dispatch(
            setTagColour({
              tag_colour: value,
            })
          );
        }}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              variant="outlined"
              label={option}
              {...getTagProps({ index })}
              disabled={false}
            />
          ))
        }
        classes={{
          tag: classes.tag,
          inputRoot: classes.autocompleteInput,
          popupIndicator: classes.popupIndicator,
          clearIndicator: classes.clearIndicator,
        }}
        renderInput={(params) => (
          <InputTextField
            {...params}
            variant="outlined"
            label="Tag color"
            placeholder="Eg: Red,Blue..."
          />
        )}
      />

      <div className="text-muted-tags-upload">
        <div>
          <img
            src={AlertCircle}
            className="upload-design-img"
            height="14px"
            width="14px"
            alt=""
          ></img>{" "}
          <span className="text-muted-upload-design">
            Maximum of 3 tags allowed
          </span>
        </div>
        <div>{totalColorTags}/3</div>
      </div>

      <InputTextField
        className="upload-design-link"
        id="upload-design-link"
        onChange={handleChange}
        label="Link"
        variant="outlined"
        fullWidth
        InputLabelProps={{
          classes: {
            root: classes.label,
          },
        }}
      />

      <div className="text-muted-tags-link-wrapper">
        <img
          src={AlertCircle}
          className="upload-design-img"
          height="14px"
          width="14px"
          alt=""
        ></img>{" "}
        <span className="text-muted-upload-design">
          Attach google drive drop box link of your design image
        </span>
      </div>
    </div>
  );
};

export default MultiSelect;
