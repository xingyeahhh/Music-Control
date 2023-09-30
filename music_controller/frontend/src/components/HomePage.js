
// import React, { Component } from "react";
// import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
// import RoomJoinPage from "./RoomJoinPage";
// import CreateRoomPage from "./CreateRoomPage";
// import Room from "./Room";
// import { Grid, Button, ButtonGroup, Typography } from '@material-ui/core';

// export default class HomePage extends Component {
//   constructor(props) {
//     super(props);
//     this.state={roomCode:null,};
//     this.clearRoomCodeRoom=this.clearRoomCodeRoom.bind(this);
//   }

//   async componentDidMount(){
//         fetch('/api/user-in-room')
//         .then((response)=>response.json())
//         .then((data)=>{
//             this.setState({
//                 roomCode: data.code,
//             });
//         });
//   }

//   renderHomePage() {
//     return (
//       <Grid container spacing={3}>
//         <Grid item xs={12} align="center">
//           <Typography variant="h3" compact="h3">
//             House Party
//           </Typography>
//         </Grid>
//         <Grid item xs={12} align="center">
//           <ButtonGroup disableElevation variant="contained" color="primary">
//             <Button color="primary" to="/join" component={Link}>
//               Join a Room
//             </Button>
//             <Button color="secondary" to="/create" component={Link}>
//               Create a Room
//             </Button>
//           </ButtonGroup>
//         </Grid>
//       </Grid>
//     );
//   }

//   clearRoomCodeRoom(){
//     this.setstate({
//         roomCode:null,
//     });
//   }

//   render() {
//     return (
//       <Router>
//         <Routes>
//           <Route 
//           exact 
//           path="/" 
//           render={()=>{
//             return this.state.roomCode ? (
//             <Redirect to={'/room/${this.state.roomCode}'}/>
//             ):(
//                 this.renderHomePage()
//                 );
//             }}
//             />

//           <Route path="/join" element={<RoomJoinPage />} />
//           <Route path="/create" element={<CreateRoomPage />} />
//           <Route path="/room/:roomCode" 
//           render={(props) => {return 
//             <Room {...props} leaveRoomCallback={this.clearRoomCode}/>;
//         }}/>
//         </Routes>
//       </Router>
//     );
//   }
// }



// import React, { useEffect, useState } from "react";
// import { BrowserRouter as Router, Route, Link, Routes, Navigate } from "react-router-dom";
// import RoomJoinPage from "./RoomJoinPage";
// import CreateRoomPage from "./CreateRoomPage";
// import Room from "./Room";
// import { Grid, Button, ButtonGroup, Typography } from '@material-ui/core';

// const HomePage = () => {
//   const [roomCode, setRoomCode] = useState(null);

//   useEffect(() => {
//     fetch('/api/user-in-room')
//       .then((response) => response.json())
//       .then((data) => {
//         setRoomCode(data.code);
//       });
//   }, []);

//   const renderHomePage = () => {
//     return (
//       <Grid container spacing={3}>
//         <Grid item xs={12} align="center">
//           <Typography variant="h3" compact="h3">
//             House Party
//           </Typography>
//         </Grid>
//         <Grid item xs={12} align="center">
//           <ButtonGroup disableElevation variant="contained" color="primary">
//             <Button color="primary" to="/join" component={Link}>
//               Join a Room
//             </Button>
//             <Button color="secondary" to="/create" component={Link}>
//               Create a Room
//             </Button>
//           </ButtonGroup>
//         </Grid>
//       </Grid>
//     );
//   };

//   return (
//     <Router>
//       <Routes>
//         <Route
//           exact
//           path="/"
//           element={
//             roomCode ? (
//               <Navigate to={`/room/${roomCode}`} replace />
//             ) : (
//               renderHomePage()
//             )
//           }
//         />

//         <Route path="/join" element={<RoomJoinPage />} />
//         <Route path="/create" element={<CreateRoomPage />} />
//         <Route path="/room/:roomCode" element={<Room />} />
//       </Routes>
//     </Router>
//   );
// }

// export default HomePage;


import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate, Redirect,Navigate } from 'react-router-dom';
import RoomJoinPage from './RoomJoinPage';
import CreateRoomPage from './CreateRoomPage';
import Room from './Room';
import { Grid, Button, ButtonGroup, Typography } from '@material-ui/core';
import Info from './info';

export default function HomePage() {
  const [roomCode, setRoomCode] = useState(null);

  useEffect(() => {
    fetch('/api/user-in-room')
      .then((response) => response.json())
      .then((data) => {
        setRoomCode(data.code);
      });
  }, []);

  const clearRoomCode = () => {
    setRoomCode(null);
  };

  const renderHomePage = () => {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12} align="center">
          <Typography variant="h3" compact="h3">
            House Party
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <ButtonGroup disableElevation variant="contained" color="primary">
            <Button color="primary" to="/join" component={Link}>
              Join a Room
            </Button>
            <Button color="default" to="/info" component={Link}>
              info
            </Button>
            <Button color="secondary" to="/create" component={Link}>
              Create a Room
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    );
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            roomCode ? <Navigate to={`/room/${roomCode}`} /> : renderHomePage()
          }
        />

        <Route path="/join" element={<RoomJoinPage />} />
        <Route path="/info" element={<Info />} />
        <Route path="/create" element={<CreateRoomPage />} />
        <Route
          path="/room/:roomCode"
          element={<Room leaveRoomCallback={clearRoomCode} />}
          //clearRoomCode 函数被作为 leaveRoomCallback 属性传递。clearRoomCode 函数在 HomePage 组件中定义，并负责在用户离开房间时重置房间代码。
        />
      </Routes>
    </Router>
  );
}
