import React, { useState } from "react"
import "./profile-card.scss"
import { Grid, Card, CardMedia, Button } from "@material-ui/core";
import Add from '../../images/add-white.svg';




const ProfileCard = (props) => {
    const [liked, setLiked] = useState([
        null
    ])

    const { key, id, onClick, name, designs, followers, height, width, landingPage, userimg } = props


    return (
        <Grid item xs key={key}>
            <Card className="profile-card-root" style={height && width ? { maxHeight: height, maxWidth: width } : { maxWidth: "340px", maxHeight: "340px" }} onClick={onClick}>

                <CardMedia>
                    <div className="profile-card-details">
                        <div className="img-container-profile">
                            <img src={userimg} style={{ height: "140px", width: "140px", borderRadius: "50%" }} alt="design" className="" id={id} />
                        </div>
                        <h3>{name}</h3>
                        <p>{designs} designs | {followers} followers</p>
                        {
                            landingPage ? (
                                <Button className="view-design-btn">View Design</Button>
                            )
                                :
                                (
                                    <Button className="profile-follow"><img src={Add} /> Follow</Button>
                                )
                        }
                    </div>
                </CardMedia>
            </Card>

        </Grid>
    )
}



export default ProfileCard;