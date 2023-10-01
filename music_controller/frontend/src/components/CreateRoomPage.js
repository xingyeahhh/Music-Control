import React, { Component,useState, useEffect } from "react";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"
import FormHelperText from "@material-ui/core/FormHelperText"
import FormControl from "@material-ui/core/FormControl"
import { Link, useNavigate, useParams} from "react-router-dom"
import Radio from "@material-ui/core/Radio"
import RadioGroup from "@material-ui/core/RadioGroup"
import FormControlLabel from "@material-ui/core/FormControlLabel"

import { Collapse } from "@material-ui/core";
// import Alert from '@material-ui/lab/Alert';



  export default function CreateRoomPage({ votesToSkip: initialVotesToSkip=2, guestCanPause: initialGuestCanPause=true, update = false, roomCode = null, updateCallback = () => {} }) {
    const [votesToSkip, setVotesToSkip] = useState(initialVotesToSkip);
    const [guestCanPause, setGuestCanPause] = useState(initialGuestCanPause);
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const navigate = useNavigate();
  
    const handleVotesChange = (e) => {
      setVotesToSkip(e.target.value);
    };
  
    const handleGuestCanPauseChange = (e) => {
      setGuestCanPause(e.target.value === "true");
    };
  
    const handleRoomButtonPressed = () => {
      const requestOptions = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          votes_to_skip: votesToSkip,
          guest_can_pause: guestCanPause
        }),
      };
      fetch('/api/create-room', requestOptions)
        .then((response) => response.json())
        .then((data) => navigate('/room/' + data.code));
    };
  
    

    const handleUpdateButtonPressed=()=>{
        const requestOptions = {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              votes_to_skip: votesToSkip,
              guest_can_pause: guestCanPause,
              code: roomCode,
            }),
          };
          fetch("/api/update-room", requestOptions).then((response) => {
            if (response.ok) {
                setSuccessMsg(
                "Room updated sucessfully!",
              );
            } else {
                setErrorMsg( 
                "Error updating room...",
              );
            }
            updateCallback();
          }); 
    };

    

    const renderCreateButtons=()=> {
        return (
          <Grid container spacing={1}>
            <Grid item xs={12} align="center">
              <Button
                color="primary"
                variant="contained"
                onClick={handleRoomButtonPressed}
              >
                Create A Room
              </Button>
            </Grid>
            <Grid item xs={12} align="center">
              <Button color="secondary" variant="contained" to="/" component={Link}>
                Back
              </Button>
            </Grid>
          </Grid>
        );
      };
    
      const renderUpdateButtons=()=> {
        return (
          <Grid item xs={12} align="center">
            <Button
              color="primary"
              variant="contained"
              onClick={handleUpdateButtonPressed}
            >
              Update Room
            </Button>
          </Grid>
        );
      };

    const title = update ? "Update Room" : "Create a Room";
  
    return (
      <Grid container spacing={1}>
        {/* <Grid item xs={12} align="center">
          <Collapse in={errorMsg !="" || successMsg !=""}>
          {successMsg !="" ? (
          <Alert severity="success" onClose={()=>{
            setSuccessMsg("");
        }}>
            {successMsg}</Alert>
          ):(
          <Alert severity="error" onClose={()=>{
            setErrorMsg("");
        }}>
            {errorMsg}</Alert>
          )
        
        }
          </Collapse>
        </Grid> */}

        <Grid item xs={12} align="center">
          <Collapse in={errorMsg !== "" || successMsg !== ""}>
            {successMsg !== "" ? (
              <div
                style={{
                  backgroundColor: '#a1dc32',
                  color: "white",
                  padding: "7px 15px",
                  cursor: "pointer",
                  fontSize: "10px",
                  display: "inline-block", // 将色块设置为行内块元素
                  width: "fit-content", // 根据内容自动调整宽度
                  margin: "0 auto", // 居中对齐
                  fontWeight: "bold",
                }}
                onClick={() => setSuccessMsg("")}
              >
                {successMsg}
              </div>
            ) : (
              <div
                style={{
                  backgroundColor: "#8bd02b",
                  color: "white",
                  padding: "7px 20px",
                  cursor: "pointer",
                  fontSize: "10px",
                  display: "inline-block", // 将色块设置为行内块元素
                  width: "fit-content", // 根据内容自动调整宽度
                  margin: "0 auto", // 居中对齐
                  fontWeight: "bold",
                }}
                onClick={() => setErrorMsg("")}
              >
                {errorMsg}
              </div>
            )}
          </Collapse>
        </Grid>

        <Grid item xs={12} align="center">
          <Typography component="h4" variant="h4">
            {title}
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <FormControl component="fieldset">
            <FormHelperText>
              <div align="center">Guest Control of Playback State</div>
            </FormHelperText>
            <RadioGroup
              row
              defaultValue={guestCanPause.toString()}
              onChange={handleGuestCanPauseChange}
            >
              <FormControlLabel
                value="true"
                control={<Radio color="primary" />}
                label="Play/Pause"
                labelPlacement="bottom"
              />
              <FormControlLabel
                value="false"
                control={<Radio color="secondary" />}
                label=" No Control"
                labelPlacement="bottom"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} align="center">
          <FormControl>
            <TextField
              required={true}
              type="number"
              onChange={handleVotesChange}
              value={votesToSkip}
              inputProps={{
                min: 1,
              }}
            />
            <FormHelperText>
              <div align="center">Votes Required To Skip Song</div>
            </FormHelperText>
          </FormControl>
        </Grid>
        {update ? renderUpdateButtons() : renderCreateButtons()}
      </Grid>
    );
  }
