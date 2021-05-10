import React from "react";
import {
  AppBar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CssBaseline,
} from "@material-ui/core";

import CameraIcon from "@material-ui/icons/PhotoCamera";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useStyles } from "App";

type PropsType = {
  candidateName: string;
  key: number;
  handleOnVote:()=>void;
}

export default function CandidateCard({candidateName, key, handleOnVote}:PropsType) {
  const classes = useStyles();

  return (
    <Grid item key={key} xs={12} sm={6} md={4}>
      <Card className={classes.card}>
        <CardMedia
          className={classes.cardMedia}
          image="https://source.unsplash.com/random"
          title="Image title"
        />
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h5" component="h2">
            {candidateName}
          </Typography>
          <Typography>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe qui, dignissimos eligendi nemo laudantium excepturi incidunt sunt magni. Maiores ipsam doloribus hic sit molestias, officiis dolor nostrum cumque accusantium sed.
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary" onClick={handleOnVote}>
            Vote
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
