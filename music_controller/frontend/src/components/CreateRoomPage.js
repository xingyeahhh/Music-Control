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
import Alert from '@material-ui/lab/Alert';



// export default class CreateRoomPage extends Component {
//   static defaultProps = {
//     votesToSkip: 2,
//     guestCanPause: true,
//     update: false,
//     roomCode: null,
//     updateCallback: () => {},
//   };

//   constructor(props) {
//     super(props);
//     this.state = {
//       guestCanPause: this.props.guestCanPause,
//       votesToSkip: this.props.votesToSkip,

//       errorMsg:"",
//       successMsg:"",

//     };
//     this.handleRoomButtonPressed = this.handleRoomButtonPressed.bind(this);
//     this.handleVotesChange = this.handleVotesChange.bind(this);
//     this.handleGuestCanPauseChange = this.handleGuestCanPauseChange.bind(this);
//     this.handleUpdateButtonPressed=this.handleUpdateButtonPressed.bind(this);
//   }

//   handleVotesChange(e) {
//     this.setState({
//       votesToSkip: e.target.value,
//     });
//   }

//   handleGuestCanPauseChange(e) {
//     this.setState({
//       guestCanPause: e.target.value == "true" ? true : false,
//     });
//   }

//   handleRoomButtonPressed() {
//     //const navigate = useNavigate();//<-- access navigate function
//     //console.log(this.state);//this will let back see your state data
//     const requestOptions = {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         votes_to_skip: this.state.votesToSkip,
//         guest_can_pause: this.state.guestCanPause,
//       }),
//     };
//     fetch("/api/create-room", requestOptions)
//       .then((response) => response.json())
//       .then((data) => this.props.history.push("/room/" + data.code));
//   }

//   handleUpdateButtonPressed() {
//     const requestOptions = {
//       method: "PATCH",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         votes_to_skip: this.state.votesToSkip,
//         guest_can_pause: this.state.guestCanPause,
//         code: this.props.roomCode,
//       }),
//     };
//     fetch("/api/update-room", requestOptions).then((response) => {
//       if (response.ok) {
//         this.setState({
//           successMsg: "Room updated sucessfully!",
//         });
//       } else {
//         this.setState({
//           errorMsg: "Error updating room...",
//         });
//       }
//       this.props.updateCallback();
//     });   
//   }

//   renderCreateButtons() {
//     return (
//       <Grid container spacing={1}>
//         <Grid item xs={12} align="center">
//           <Button
//             color="primary"
//             variant="contained"
//             onClick={this.handleRoomButtonPressed}
//           >
//             Create A Room
//           </Button>
//         </Grid>
//         <Grid item xs={12} align="center">
//           <Button color="secondary" variant="contained" to="/" component={Link}>
//             Back
//           </Button>
//         </Grid>
//       </Grid>
//     );
//   }

//   renderUpdateButtons() {
//     return (
//       <Grid item xs={12} align="center">
//         <Button
//           color="primary"
//           variant="contained"
//           onClick={this.handleUpdateButtonPressed}
//         >
//           Update Room
//         </Button>
//       </Grid>
//     );
//   }

//   render() {
//     const title = this.props.update ? "Update Room" : "Create a Room";
//     return (
//       <Grid container spacing={1}>

// <Grid item xs={12} align="center">
//           <Collapse in={this.state.errorMsg !="" || this.state.successMsg !=""}>
//           {this.state.successMsg!=""?(
//           <Alert severity="success" onClose={()=>{
//             this.setState({successMsg:""});
//         }}>
//             {this.state.successMsg}</Alert>
//           ):(
//           <Alert severity="error" onClose={()=>{
//             this.setState({errorMsg:""});
//         }}>
//             {this.state.errorMsg}</Alert>
//           )
        
//         }
//           </Collapse>
//         </Grid>


//         <Grid item xs={12} align="center">
//           <Typography component="h4" variant="h4">
//             {title}
//           </Typography>
//         </Grid>
//         <Grid item xs={12} align="center">
//           <FormControl component="fieldset">
//             <FormHelperText>
//               <div align="center">Guest Control of Playback State</div>
//             </FormHelperText>
//             <RadioGroup
//               row
//               defaultValue={this.props.guestCanPause.toString()}
//               onChange={this.handleGuestCanPauseChange}
//             >
//               <FormControlLabel
//                 value="true"
//                 control={<Radio color="primary" />}
//                 label="Play/Pause"
//                 labelPlacement="bottom"
//               />
//               <FormControlLabel
//                 value="false"
//                 control={<Radio color="secondary" />}
//                 label=" No Control"
//                 labelPlacement="bottom"
//               />
//             </RadioGroup>
//           </FormControl>
//         </Grid>
//         <Grid item xs={12} align="center">
//           <FormControl>
//             <TextField
//               required={true}
//               type="number"
//               onChange={this.handleVotesChange}
//               defaultValue={this.state.votesToSkip}
//               inputProps={{
//                 min: 1,
//               }}
//             />
//             <FormHelperText>
//               <div align="center">Votes Required To Skip Song</div>
//             </FormHelperText>
//           </FormControl>
//         </Grid>

//         {this.props.update
//           ? this.renderUpdateButtons()
//           : this.renderCreateVuttons()}
//       </Grid>
//     );
//   }
// }






// export default function CreateRoomPage() {
//     const [guestCanPause, setGuestCanPause] = useState(true);
//     const [votesToSkip, setVotesToSkip] = useState(2);
  
//     const navigate = useNavigate(); // 获取导航函数
//     const { roomCode } = useParams();
  
//     const handleGuestCanPauseChange = (e) => {
//       setGuestCanPause(e.target.value === 'true');
//     };
  
//     const handleVotesChange = (e) => {
//       setVotesToSkip(parseInt(e.target.value));
//     };
  
//     const handleRoomButtonPressed = () => {
//       const requestOptions = {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           votes_to_skip: votesToSkip,
//           guest_can_pause: guestCanPause
//         }),
//       };
//       fetch('/api/create-room', requestOptions)
//         .then((response) => response.json())
//         .then((data) => navigate('/room/' + data.code)); // 使用导航函数进行页面跳转
//     };


   
//         return (
//         <Grid container spacing={1}>
//             <Grid item xs={12} align="center">
//                 <Typography component="h4" variant="h4">
//                     Create A Room
//                 </Typography>
//             </Grid>
//             <Grid item xs={12} align="center">
//                <FormControl component="fieldset">
//                 <FormHelperText>
//                     <div align='center'>Guest Control of Playback State</div>
//                 </FormHelperText>
//                 <RadioGroup row defaultValue="true" onChange={handleGuestCanPauseChange}>
//                     <FormControlLabel 
//                     value="true" 
//                     control={<Radio color="primary" />} 
//                     label="Play/Pause"
//                     labelPlacement="bottom"
//                     />
//                     <FormControlLabel 
//                     value="false" 
//                     control={<Radio color="secondary" />} 
//                     label=" No Control"
//                     labelPlacement="bottom"
//                     />
//                 </RadioGroup>
//                </FormControl>
//             </Grid>
//             <Grid item xs={12} align="center">
//                 <FormControl>
//                     <TextField
//                     required={true}
//                     type="number"
//                     onChange={handleVotesChange}
//                     defaultValue={2}
//                     inputProps={{
//                         min:1,
//                     }}
//                     />
//                     <FormHelperText>
//                         <div align="center">
//                             Votes Required To Skip Song
//                         </div>
//                     </FormHelperText>      
//                 </FormControl>
//             </Grid>
//             <Grid item xs={12} align="center">
//                 <Button color="primary" variant="contained" onClick={handleRoomButtonPressed}>
//                     Create A Room
//                     </Button>
//             </Grid>
//             <Grid item xs={12} align="center">
//                 <Button color="secondary" variant="contained" to="/" component={Link}>
//                     Back
//                     </Button>
//             </Grid>
//         </Grid>
//         );
    
// }


// export default function CreateRoomPage({ votesToSkip: initialVotesToSkip=2, guestCanPause: initialGuestCanPause=true, update = false, roomCode = null, updateCallback = () => {} }) {
//     const [votesToSkip, setVotesToSkip] = useState(initialVotesToSkip);
//     const [guestCanPause, setGuestCanPause] = useState(initialGuestCanPause);
//     // const [errorMsg, setErrorMsg] = useState('');
//     // const [successMsg, setSuccessMsg] = useState('');
//     const navigate = useNavigate();
  
//     const handleVotesChange = (e) => {
//       setVotesToSkip(e.target.value);
//     };
  
//     const handleGuestCanPauseChange = (e) => {
//       setGuestCanPause(e.target.value === "true");
//     };
  
//     const handleRoomButtonPressed = () => {
//       const requestOptions = {
//         method: "POST",
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           votes_to_skip: votesToSkip,
//           guest_can_pause: guestCanPause
//         }),
//       };
//       fetch('/api/create-room', requestOptions)
//         .then((response) => response.json())
//         .then((data) => navigate('/room/' + data.code));
//     };
  
//     const title = update ? "Update Room" : "Create a Room";

    
  
//     return (
//         <Grid container spacing={1}>
//         <Grid item xs={12} align="center">
//           <Typography component="h4" variant="h4">
//             {title}
//           </Typography>
//         </Grid>
//         <Grid item xs={12} align="center">
//           <FormControl component="fieldset">
//             <FormHelperText>
//               <div align='center'>Guest Control of Playback State</div>
//             </FormHelperText>
//             <RadioGroup row defaultValue="true" onChange={handleGuestCanPauseChange}>
//               <FormControlLabel
//                 value="true"
//                 control={<Radio color="primary" />}
//                 label="Play/Pause"
//                 labelPlacement="bottom"
//               />
//               <FormControlLabel
//                 value="false"
//                 control={<Radio color="secondary" />}
//                 label=" No Control"
//                 labelPlacement="bottom"
//               />
//             </RadioGroup>
//           </FormControl>
//         </Grid>
//         <Grid item xs={12} align="center">
//           <FormControl>
//             <TextField
//               required={true}
//               type="number"
//               onChange={handleVotesChange}
//               value={votesToSkip}
//               inputProps={{
//                 min: 1,
//               }}
//             />
//             <FormHelperText>
//               <div align="center">
//                 Votes Required To Skip Song
//               </div>
//             </FormHelperText>
//           </FormControl>
//         </Grid>
//         <Grid item xs={12} align="center">
//           <Button color="primary" variant="contained" onClick={handleRoomButtonPressed}>
//             Create A Room
//           </Button>
//         </Grid>
//         <Grid item xs={12} align="center">
//           <Button color="secondary" variant="contained" to="/" component={Link}>
//             Back
//           </Button>
//         </Grid>
//       </Grid>
//     );
//   }








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
