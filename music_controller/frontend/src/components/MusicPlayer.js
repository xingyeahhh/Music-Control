
import React,{ useState, useEffect } from "react";
import{Grid,Typography,Card,IconButton,LinearProgress} from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import SkipNextIcon  from "@material-ui/icons/SkipNext";
import { useParams, useNavigate } from "react-router-dom";
import { Collapse } from "@material-ui/core";
export default function MusicPlayer(props) {

    const { time, duration, image_url, title, artist, is_playing,votes,votes_required } = props;
    const [songProgress, setSongProgress] = useState((time / duration) * 100);
    const navigate = useNavigate();
    const [isCollapsed, setIsCollapsed] = useState(true); // 初始状态是折叠的
  
    // 更新进度条
    const updateProgress = () => {
      const newProgress = (time / duration) * 100;
      setSongProgress(newProgress);
    };
  
    // 每次路由参数更新都会触发进度条更新
    useEffect(() => {
      updateProgress();
    }, [time, duration]);
  
      // Function to pause the song
  const pauseSong = () => {
    console.log('Pause button clicked');
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' }
    };
    fetch('/spotify/pause', requestOptions)
    .then((response) => {
      console.log('Pause response:', response);
      // Handle response as needed
    })
    .catch((error) => {
      console.error('Pause error:', error);
    });
};

  // Function to play the song
  const playSong = () => {
    console.log('Play button clicked');
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
    };
    fetch('/spotify/play', requestOptions)
    .then((response) => {
      console.log('Play response:', response);
      // Handle response as needed
    })
    .catch((error) => {
      console.error('Play error:', error);
    });
};


  // Function to skip the song
  const skipSong = () => {
    console.log('Skip button clicked');
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    };
    fetch('/spotify/skip', requestOptions)
    .then((response) => {
      console.log('Skip response:', response);
      // Handle response as needed
    })
    .catch((error) => {
      console.error('Skip error:', error);
    });
};

const handleCollapseClick = () => {
    setIsCollapsed(!isCollapsed);
  };

    return (
        <>
        <Grid item xs={12} align="center">
        {/* 使用 Collapse 组件控制展开/折叠状态 */}
        <Collapse in={!isCollapsed} onClick={handleCollapseClick}>
          <div
            style={{
              backgroundColor: "black",
              color: "white",
              padding: "7px 25px",
              cursor: "pointer",
              fontSize: "10px",
              display: "inline-block", // 将色块设置为行内块元素
              width: "fit-content", // 根据内容自动调整宽度
              margin: "0 auto", // 居中对齐
              fontWeight: "bold",
            }}
          >
            {"To use the play and pause functionality, you need to have a Spotify Premium subscription!"}
          </div>
        </Collapse>
      </Grid> 

    
      <Card>
        <Grid container alignItems="center">
          <Grid item align="center" xs={4}>
            <img src={image_url} height="100%" width="100%" alt="Album" />
          </Grid>
          <Grid item align="center" xs={8}>
            <Typography component="h5" variant="h5">
              {title}
            </Typography>
            <Typography color="textSecondary" component="h5" variant="subtitle1">
              {artist}
            </Typography>
            <div>
              <IconButton onClick={() => {
                is_playing ? pauseSong() : playSong()
                setIsCollapsed(false); // 点击后展开
                }}>
                {is_playing ? <PauseIcon /> : <PlayArrowIcon />}
              </IconButton>
              <IconButton onClick={()=>{skipSong()
              setIsCollapsed(false); // 点击后展开
            }}>
                
                {votes}/{" "}{votes_required}
                <SkipNextIcon/>
              </IconButton>
            </div>
          </Grid>
        </Grid>
        <LinearProgress variant="determinate" value={songProgress} />
      </Card>
      </>
    );
  }
