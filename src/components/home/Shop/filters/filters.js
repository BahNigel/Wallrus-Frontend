import "./filters.scss";
import { useState, useEffect, useRef } from "react";
import ArrowUp from "../../../../images/arrow-up.svg";
import ArrowDown from "../../../../images/arrow-down2.svg";
import SearchFilter from "../../../../images/search-filter.svg";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { Button } from "@material-ui/core";
import CloseIcon from "../../../../images/close-black.svg";

import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
// import {filterList} from "../../../../apis/apiCalls"
// import {CircularProgress} from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const Filters = (props) => {
  const classes = useStyles();
  const checkGroup = useRef();
  const {
    filtersList,
    handleFilterCount,
    filters,
    setFilters,
    clear,
    setType,
    filterType,
    closeModal,
  } = props;
  const [toggleList, setToggleList] = useState(true);

  // useEffect(() => {
  //   if (clear) {
  //     var group = checkGroup.current.children;
  //     console.log(group);
  //   }
  // }, [clear]);
  const handleCheck = (e, value) => {
    if (e.target.checked) {
      handleFilterCount(true);
      setFilters([...filters, value]);
      setType("filter");
    } else {
      handleFilterCount(true);
      handleFilterCount(false);
      setFilters(filters.filter((e) => e !== value));
    }
  };

  if (filterType === "normal") {
    return (
      <div className="filters-div">
        <div className="color-filters">
          {filtersList.map((item, index) => {
            return (
              <div>
                <ListItem
                  key={index}
                  id={index}
                  className="filter-list-item"
                  button
                  onClick={() => setToggleList(!toggleList)}
                >
                  {toggleList ? (
                    <img src={ArrowUp} alt="" />
                  ) : (
                    <img src={ArrowDown} alt="" />
                  )}
                  <ListItemText
                    primary={item.label}
                    style={{ marginLeft: "10px" }}
                  />
                </ListItem>
                <Collapse
                  id={index}
                  in={toggleList}
                  timeout="auto"
                  unmountOnExit
                  on
                >
                  <List cArrowDownComponent="div" disablePadding>
                    <ListItem button className={classes.nested}>
                      <FormControl component="fieldset">
                        <FormGroup
                          aria-label="position"
                          column
                          ref={checkGroup}
                        >
                          {item.tags.map((item, index) => {
                            return (
                              <FormControlLabel
                                key={index}
                                value={item.name}
                                onChange={(e) => handleCheck(e, item.name)}
                                control={<Checkbox color="default" />}
                                checked={
                                  filters?.includes(item.name) ? true : false
                                }
                                label={item.name}
                                labelPlacement="end"
                              />
                            );
                          })}
                        </FormGroup>
                      </FormControl>
                    </ListItem>
                  </List>
                </Collapse>
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    return (
      <div
        className="filters-div"
        style={{ padding: "0 16px", minWidth: "320px" }}
      >
        <p
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          Filters
          <img
            src={CloseIcon}
            alt="close"
            className="drawer-close-icon"
            onClick={closeModal}
          />
        </p>
        <div
          className="color-filters"
          style={{ borderBottom: "1px solid #F7F7F7" }}
          onClick={() => setToggleList(!toggleList)}
        >
          <p
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            Colour
            {toggleList ? (
              <img src={ArrowUp} alt="" />
            ) : (
              <img src={ArrowDown} alt="" />
            )}
          </p>

          {filtersList.map((item, index) => {
            return (
              <div>
                <Collapse
                  id={index}
                  in={toggleList}
                  timeout="auto"
                  unmountOnExit
                >
                  <List cArrowDownomponent="div" disablePadding>
                    <ListItem button>
                      <FormControl component="fieldset">
                        <FormGroup
                          aria-label="position"
                          column
                          ref={checkGroup}
                        >
                          {item.tags.map((item, index) => {
                            return (
                              <FormControlLabel
                                key={index}
                                value={item.name}
                                onChange={(e) => handleCheck(e, item.name)}
                                control={<Checkbox color="black" />}
                                checked={
                                  filters?.includes(item.name) ? true : false
                                }
                                label={item.name}
                                labelPlacement="end"
                              />
                            );
                          })}
                        </FormGroup>
                      </FormControl>
                    </ListItem>
                  </List>
                </Collapse>
              </div>
            );
          })}
        </div>
        <Button
          style={{
            backgroundColor: "#1b1b1b",
            color: "#fff",
            margin: "16px 0",
          }}
          variant="outlined"
          onClick={closeModal}
        >
          Show results
        </Button>
      </div>
    );
  }
};

export default Filters;
