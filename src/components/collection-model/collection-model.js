import React, { useState, useEffect } from "react";
import "./collection-model.scss";
import Input from "../input/input";
import {
  Button,
  Radio,
  FormControlLabel,
  FormControl,
  RadioGroup,
  CircularProgress,
  Typography,
} from "@material-ui/core";
import { Skeleton } from "@mui/material";
import { Box } from "@mui/system";
import Search from "../../images/Search.svg";
import {
  addProductToCollection,
  getDecoratorCollection,
  addProductToNewCollection,
  updateCollection,
  deleteCollection,
} from "../../apis/apiCalls";
import { useHistory } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Fade from "@material-ui/core/Fade";

let baseCollections = [];
const CollectionModel = (props) => {
  const [loader, setLoader] = useState(false);
  const [collectionSet, setCollectionSet] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState("");
  const [collection, setCollection] = useState("");
  const [tag, setTag] = useState("");
  const [description, setDescription] = useState("");
  const [btnLoader, setBtnLoader] = useState(false);
  const [error, setError] = useState({ selectedColl: false, coll: false });
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [state, setState] = React.useState({
    open: false,
    Transition: Fade,
  });

  const history = useHistory();

  const fetchCollections = async () => {
    try {
      const collections = await getDecoratorCollection();
      setCollectionSet(collections);
      baseCollections = collections;
      setLoader(false);
    } catch (err) {
      // alert("Something went wrong!");
      setState({ ...state, open: true });
      setMessage("Something went wrong!");
      setErrorMessage("error");
    }
  };

  useEffect(() => {
    if (props.setEdit) setStatus("edit");
    else if (props.setDelete) setStatus("delete");
    else {
      setStatus("add");
      fetchCollections();
    }

    return () => {
      resetInputs();
    };
  }, []);

  // Create and update collection UI handlers
  const onCollectionChange = (e) => {
    setCollection(e.target.value);
  };
  const onTagChangeHandler = (e) => {
    setTag(e.target.value);
  };
  const onDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  // Searching and selecting collection UI handlers
  const onSearchChangeHandler = (e) => {
    const searchQuery = e.target.value.toLowerCase();
    if (searchQuery === "") {
      setCollectionSet(baseCollections);
    } else if (searchQuery !== "") {
      const newCollections = [...collectionSet].map((el) => {
        return { ...el, lowerName: el.name.toLowerCase() };
      });
      const filteredCollection = newCollections.filter((el) =>
        el.lowerName.includes(searchQuery)
      );
      setCollectionSet(filteredCollection);
    }
  };

  const onSelectCollection = (e) => {
    setSelectedCollection(e.target.value);
  };

  // Validation
  const validateAddCollection = () => {
    const selectedCollError = selectedCollection === "";
    setError({ ...error, selectedColl: selectedCollError });
    return selectedCollError;
  };

  const validateCreateCollection = () => {
    const collError = collection === "";
    setError({ ...error, coll: collError });
    return collError;
  };

  // Adding and Creating collection API handlers
  const onAddCollection = async () => {
    if (!validateAddCollection()) {
      try {
        setBtnLoader(true);
        const formData = new FormData();
        formData.append("product_pk", props.product_pk);
        formData.append("collection_pk", selectedCollection);
        if (tag !== "") formData.append("tag_name", tag);
        await addProductToCollection(formData);
        setBtnLoader(false);
        fetchCollections();
        resetInputs();
      } catch (err) {
        // alert("Something went wrong");
        setState({ ...state, open: true });
        setMessage("Something went wrong!");
        setErrorMessage("error");
      }
    }
  };

  const onCreateCollection = async () => {
    if (!validateCreateCollection()) {
      try {
        setBtnLoader(true);
        const formData = new FormData();
        formData.append("product_pk", props.product_pk);
        formData.append("collection_name", collection);
        if (description !== "") formData.append("description", description);
        await addProductToNewCollection(formData);
        setBtnLoader(false);
        setStatus("add");
        fetchCollections();
        resetInputs();
      } catch (err) {
        // alert("Something went wrong");
        setState({ ...state, open: true });
        setMessage("Something went wrong!");
        setErrorMessage("error");
      }
    }
  };

  const onUpdateCollection = async () => {
    if (!validateCreateCollection()) {
      try {
        setBtnLoader(true);
        const formData = new FormData();
        formData.append("collection_pk", props.collection_pk);
        formData.append("collection_name", collection);
        if (description !== "") formData.append("description", description);
        await updateCollection(formData);
        setBtnLoader(false);
        resetInputs();
      } catch (err) {
        setBtnLoader(false);
      }
    }
  };

  const deleteCollectionHandler = async () => {
    try {
      setBtnLoader(true);
      const formData = new FormData();
      formData.append("collection_pk", props.collection_pk);
      await deleteCollection(formData);
      setBtnLoader(false);
      props.toggleModel(false);
      history.goBack();
    } catch (err) {
      setBtnLoader(false);
    }
  };

  const resetInputs = () => {
    setCollection("");
    setSelectedCollection("");
    setDescription("");
    setTag("");
  };

  const modifyDate = (lastUpdated) => {
    console.log(lastUpdated, typeof lastUpdated);
    const newLastUpdated = new Date(lastUpdated).getTime();
    const daysAgo = (Date.now() - newLastUpdated) / (1000 * 3600 * 24);

    if (daysAgo < 1) {
      return "today";
    } else if (daysAgo >= 1 && daysAgo < 2) {
      return "yesterday";
    } else if (daysAgo >= 2 && daysAgo <= 30) {
      return `${Math.floor(daysAgo)} days ago`;
    } else if (daysAgo > 30 && daysAgo < 365) {
      const months = Math.floor(daysAgo) / 30;
      return months > 1
        ? `${Math.floor(months)} months ago`
        : `${Math.floor(months)} month ago`;
    } else if (daysAgo > 365) {
      const years = Math.floor(daysAgo) / 365;
      return years > 1
        ? `${Math.floor(years)} years ago`
        : `${Math.floor(years)} year ago`;
    }
  };

  const arrowBack = (
    <svg
      onClick={() => setStatus("add")}
      width="10"
      height="16"
      viewBox="0 0 10 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.5 15L1.5 8L8.5 1"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );

  const cancelLogo = (
    <svg
      onClick={() => props.toggleModel(false)}
      className="collection-model--cancel-logo"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18 6L6 18"
        stroke="#1B1918"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M6 6L18 18"
        stroke="#1B1918"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );

  // buttons
  let buttons = (
    <>
      <Button
        variant="contained"
        className="btn-filled"
        onClick={onAddCollection}
      >
        {btnLoader ? (
          <CircularProgress size={30} style={{ color: "#fff" }} />
        ) : (
          "Save"
        )}
      </Button>
      <Button
        variant="outlined"
        className="collection-new-btn"
        onClick={() => setStatus("create")}
      >
        Create a new {window.innerWidth > 568 && "collection"}
      </Button>
    </>
  );

  if (status !== "add") {
    buttons =
      status === "create" ? (
        <Button
          variant="contained"
          className="btn-filled"
          onClick={onCreateCollection}
        >
          {btnLoader ? (
            <CircularProgress size={30} style={{ color: "#fff" }} />
          ) : (
            "Create collection"
          )}
        </Button>
      ) : (
        <Button
          variant="contained"
          className="btn-filled"
          onClick={onUpdateCollection}
        >
          {btnLoader ? (
            <CircularProgress size={30} style={{ color: "#fff" }} />
          ) : (
            "Update"
          )}
        </Button>
      );
  }

  console.log(selectedCollection);
  // inputs
  let inputFields = (
    <>
      <h4 className="collection-model--heading">Add design to collection</h4>
      <Input
        id="tag"
        type="text"
        placeholder="Add tag (optional)"
        onChange={onTagChangeHandler}
        value={tag}
      />
      <div className="collection-model--search-container">
        <img
          className="collection-model--search-logo"
          src={Search}
          alt="Search logo"
        />
        <input
          id="search"
          className="collection-model--search-input"
          type="text"
          placeholder="Search"
          onChange={onSearchChangeHandler}
        />
      </div>
      <FormControl component="fieldset">
        <RadioGroup
          aria-label="gender"
          name="radio-buttons-group"
          className="collection-model--radio-btns"
          onChange={onSelectCollection}
          value={selectedCollection}
        >
          {collectionSet.map((collection) => (
            <FormControlLabel
              className={
                collection.pk === selectedCollection
                  ? "collection-model--radio collection-model--radio-active"
                  : "collection-model--radio"
              }
              value={`${collection.pk}`}
              control={<Radio />}
              label={
                <Box className="collection-model--selector">
                  <img
                    className="collection-model--image"
                    src={
                      collection.products.length > 0
                        ? `${process.env.REACT_APP_ROOT_URL}${collection.products[0]?.image}`
                        : null
                    }
                    alt="collection-img"
                  />
                  <Box display="grid">
                    <p className="collection-model--name">{collection.name}</p>
                    <p className="collection-model--designs">{`${collection.number_of_designs} designs`}</p>
                    <p className="collection-model--updatedon">
                      {`Last updated ${modifyDate(collection.updated_on)}`}
                    </p>
                  </Box>
                </Box>
              }
            />
          ))}
        </RadioGroup>
        {error.selectedColl && (
          <Typography color="error">
            Select collection or create a new
          </Typography>
        )}
      </FormControl>
    </>
  );

  if (status !== "add") {
    inputFields = (
      <>
        {status === "create" ? (
          <h4 className="collection-model--heading">
            {arrowBack} Create new collection
          </h4>
        ) : (
          <h4 className="collection-model--heading">Edit collection</h4>
        )}
        <Input
          id="collection"
          type="text"
          placeholder="Collection name"
          onChange={onCollectionChange}
          error={error.coll}
          helperText={error.coll ? "This field is required" : null}
          value={collection}
        />
        <Input
          id="description"
          className="collection-model--description"
          type="text"
          multiline={true}
          rows={8}
          placeholder="Description(optional)"
          onChange={onDescriptionChange}
          value={description}
        />
      </>
    );
  }

  const modelClass = ["collection-model"];
  const backdropClass = ["collection-model--backdrop"];
  const deleteModelClass = ["collection-delete-model"];
  if (!props.show) {
    modelClass.push("hide");
    backdropClass.push("hide");
    deleteModelClass.push("hide");
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setState({
      ...state,
      open: false,
    });
  };

  return (
    <React.Fragment>
      <Snackbar
        anchorOrigin={{
          horizontal: "right",
          vertical: "top",
        }}
        TransitionComponent={state.Transition}
        open={state.open}
        autoHideDuration={2000}
        onClose={handleClose}
        key={state.Transition.name}
      >
        <Alert
          onClose={handleClose}
          severity={errorMessage}
          // sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
      <>
        <div
          className={backdropClass.join(" ")}
          onClick={() => props.toggleModel(false)}
        />
        <div className={modelClass.join(" ")}>
          {loader ? (
            <>
              <Skeleton
                className="collection-model--loader"
                fullWidth
                height={30}
              />
              <Skeleton
                className="collection-model--loader"
                fullWidth
                height={80}
              />
              <Skeleton
                className="collection-model--loader"
                fullWidth
                height={400}
              />
            </>
          ) : status === "delete" ? (
            <div className={deleteModelClass.join(" ")}>
              <h3 className="collection-delete-model--heading">
                Delete this collection?
              </h3>
              <p className="collection-delete-model--text">
                This can’t be undone and it will be removed from your profile.
              </p>
              <div className="collection-delete-model--btn-container">
                <Button
                  variant="outlined"
                  style={{ width: "auto" }}
                  onClick={() => props.toggleModel(false)}
                >
                  Cancel
                </Button>
                <Button
                  color="error"
                  variant="filled"
                  style={{ width: "auto" }}
                  className="btn-filled btn-filled-error"
                  onClick={deleteCollectionHandler}
                >
                  {btnLoader ? (
                    <CircularProgress size={30} style={{ color: "#fff" }} />
                  ) : (
                    "Delete"
                  )}
                </Button>
              </div>
            </div>
          ) : (
            <>
              {cancelLogo}
              {inputFields}
              <div className="collection-model--btn-container">{buttons}</div>
            </>
          )}
        </div>
      </>
    </React.Fragment>
  );
};

export default CollectionModel;
