import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";




export default function RoomJoinPage() {
    const [roomCode, setRoomCode] = useState('');
    const [error, setError] = useState('');
  
    const navigate = useNavigate();
  
    const handleTextFieldChange = (e) => {
      setRoomCode(e.target.value);
    };
  
    const roomButtonPressed = () => {
    if (roomCode.trim() !== '') {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: roomCode,
        }),
      };
  
      fetch('/api/join-room', requestOptions)
        .then((response) => {
          if (response.ok) {
            navigate(`/room/${roomCode}`);
          } else {
            setError('Room not found.');
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
        setError('Room code cannot be empty.');
      }
    };

    return(
        <Grid container spacing={1} alignments="center">
            <Grid item xs={12} align="center">
                <Typography variant="h4" component="h4">
                   Join a Room 
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <TextField
                error={error}
                label="Code"
                placeholder="Enter a Room Code"
                value={roomCode}
                helperText={error}
                variant="outlined"
                onChange={handleTextFieldChange}
                />
            </Grid>

            <Grid item xs={12} align="center">
                <Button variant="contained" color="primary" onClick={roomButtonPressed}>
                    Enter Room
                </Button>
            </Grid>

            <Grid item xs={12} align="center">
                <Button variant="contained" color="secondary" to="/" component={Link}>
                    Back
                </Button>
            </Grid>
            
        </Grid>
    );
}
