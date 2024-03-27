import { useEffect, useState } from "react"
import "./user-following.scss"
import CircularProgress from '@material-ui/core/CircularProgress';
import { Button } from "@material-ui/core";
import { getDecoratorFollowing } from '../../../../../apis/apiCalls';
import Artistitem from "../../../artist/artistItem";
import { useHistory } from "react-router";

const UserFollowing = (props) => {

  const paginationCount = 10;
  const [loader, setloader] = useState(true);
  const [followingArtists, setfollowingArtists] = useState([])
  const history = useHistory();
  const [slice, setSlice] = useState(paginationCount);

  useEffect(() => {
    getDecoratorFollowing()
      .then((res) => {
        const list = res.filter((value) => value.status);
        setloader(false);
        setfollowingArtists(list);
      })
  }, []);

  const handleArtistClick = (artist) => {
    history.push(`/artist/${artist}`);
  };

  const removeFollower = (id) => {
    const list = [...followingArtists];
    const newList = list.filter((artist) => artist.Unique_id !== id);
    setfollowingArtists(newList);
  }

  const sliceHandler = () => {
    setSlice(prev => prev + paginationCount);
  }

  return (
    <div className="following-page-container">
      {
        loader
          ? (
            <div style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
              <CircularProgress size={50} style={{ color: '#000', margin: '40px 0 60px' }} />
            </div>
          ) : (
            followingArtists && followingArtists.length === 0
              ? (
                <div style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
                  No data to show
                </div>
              ) : (
                followingArtists.slice(0, slice).map((item, index) =>
                (
                  <Artistitem item={item} 
                  handleArtistClick={handleArtistClick}
                  shouldRemoveFollower
                  removeFollower={id => removeFollower(id)} />
                ))
              )
          )
      }
      {
        slice < followingArtists.length && (
          <div className="load-more-artists-container">
            <Button variant="outlined" className="load-more-artists-btn" onClick={sliceHandler}>
              Load more artists
            </Button>
          </div>
        )
      }
    </div>
  )
}


export default UserFollowing