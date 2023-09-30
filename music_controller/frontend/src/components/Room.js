

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Grid, Button, Typography } from '@material-ui/core';
import CreateRoomPage from './CreateRoomPage';
import MusicPlayer from './MusicPlayer';
import { Collapse } from "@material-ui/core";

export default function Room({ leaveRoomCallback }) {
  const { roomCode } = useParams();
  const navigate = useNavigate();

  const [voteToSkip, setVoteToSkip] = useState(2);
  const [guestCanPause, setGuestCanPause] = useState(false);
  const [isHost, setIsHost] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  //spotify part!!
  const [spotifyAuthenticated, setSpotifyAuthenticated] = useState(false);

  const [song, setSong] = useState({});




  const getRoomDetails = () => {
    fetch(`/api/get-room?code=${roomCode}`)
      .then((response) => {
        if (!response.ok) {
          leaveRoomCallback();
          navigate('/');
        }
        return response.json();
      })
      .then((data) => {
        setVoteToSkip(data.votes_to_skip);
        setGuestCanPause(data.guest_can_pause);
        setIsHost(data.is_host);

        //spotify part
        if (data.is_host) {
          authenticateSpotify();
        }
      });
  };

  useEffect(() => {
    getRoomDetails();
  }, []);

  //spotify part
  const authenticateSpotify = () => {
    fetch('/spotify/is-authenticated')
      .then((response) => response.json())
      .then((data) => {
        setSpotifyAuthenticated(data.status);
        if (!data.status) {
          fetch('/spotify/get-auth-url')
            .then((response) => response.json())
            .then((data) => {
              window.location.replace(data.url);
            });
        }
      });
  };


  const getCurrentSong = () => {
    fetch('/spotify/current-song')
      .then((response) => {
        if (!response.ok) {
          return {};
        } else {
          return response.json();
        }
      })
      .then((data) => {
        setSong(data); // Update the song state with the fetched data
        console.log(data);
      });
  };

  //挂载
  useEffect(() => {
    const interval = setInterval(getCurrentSong, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  
  const updateShowSettings = (value) => {
    setShowSettings(value);
  };

  const renderSettings = () => {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <CreateRoomPage
            update={true}
            votesToSkip={voteToSkip}
            guestCanPause={guestCanPause}
            roomCode={roomCode}
            updateCallback={getRoomDetails}
          />
        </Grid>
        <Grid item xs={12} align="center">
          <Button variant="contained" color="secondary" onClick={() => updateShowSettings(false)}>
            Close
          </Button>
        </Grid>
      </Grid>
    );
  };

  const renderSettingsButton = () => {
    return (
      <Grid item xs={12} align="center">
        <Button variant="contained" color="primary" onClick={() => updateShowSettings(true)}>
          Settings
        </Button>
      </Grid>
    );
  };

    const leaveButtonPressed = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    };

    fetch('/api/leave-room', requestOptions)
      .then((_response) => {
        leaveRoomCallback();
        navigate('/');
      });
  };
  
  if (showSettings) {
    return renderSettings();
  }

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography variant="h4" component="h4">
          Code: {roomCode}
        </Typography>
      </Grid>
{/* <MusicPlayer {...song} /> */}
<MusicPlayer
  time={song.time}
  duration={song.duration}
  image_url={song.image_url}
  title={song.title}
  artist={song.artist}
  is_playing={song.is_playing}
  votes={song.votes}
  votes_required={song.votes_required}
/>

      {/* <Grid item xs={12} align="center">
        <Typography variant="h6" component="h6">
          Votes: {voteToSkip}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography variant="h6" component="h6">
          Guest Can Pause: {guestCanPause.toString()}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography variant="h6" component="h6">
          Host: {isHost.toString()}
        </Typography>
      </Grid> */}

      {isHost ? renderSettingsButton() : null}
     
      <Grid item xs={12} align="center">
        <Button variant="contained" color="secondary" onClick={leaveButtonPressed}>
          Leave Room
        </Button>
      </Grid>
    </Grid>
  );
}




