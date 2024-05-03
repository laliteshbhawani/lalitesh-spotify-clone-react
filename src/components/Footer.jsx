import './Footer.css'
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious"
import ShuffleIcon from "@mui/icons-material/Shuffle";
import RepeatIcon from "@mui/icons-material/Repeat";
import VolumeDownIcon from "@mui/icons-material/VolumeDown";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import { Grid, Slider } from '@mui/material';
import { useDataLayerValue } from './DataLayer';


const Footer = ({spotify}) => {
    const [{track, value, discover_weekly, track_no}, dispatch] = useDataLayerValue()

    const handleChange = (e) => {
      if(e % 5==0){
        console.log(e)
        spotify.setVolume(e)
      }
    }

    const handleClick = () => {
      if(value) {
        spotify.pause()
        dispatch({
          type:'SET_PLAYING',
          value: false
        })
      }
      else {
        spotify.play()
        dispatch({
          type:'SET_PLAYING',
          value: true
        })
      }
    }
    const nextTrack = (x) => {
      spotify
      .play({
        uris: [`spotify:track:${discover_weekly?.tracks.items[track_no+x].track.id}`],
      })
      .then(() => {
        spotify.getTrack(discover_weekly?.tracks.items[track_no+x].track.id).then((response2) => {
            console.log(response2)
            dispatch({
                type:'SET_TRACK',
                track: response2
            })
            dispatch({
                type:'SET_PLAYING',
                value: true
            })
            dispatch({
                type: 'SET_TRACK_NO',
                track_no: track_no+x
            })
          //console.log(response2)
        });
      });
    }
    return (
        <div className="footer">
            <div className="footer__left">
            {/* <audio controls>
  <source src="https://p.scdn.co/mp3-preview/5778331aff3415157ed51d5f95c0006fecdbaaaf?cid=595000d88afc4fc594000dfa3b6b290c" type="audio/mp3" />
  Your browser does not support the audio element.
</audio> */}

                <img
                className="footer__albumLogo"
                src={track?.album.images[0].url||"https://i.pinimg.com/originals/30/b6/78/30b67897d4d3f6cc2db086dc3b42c67d.jpg"}
                alt={track?.name}
                />
                {track ? (
                <div className="footer__songInfo">
                    <h4>{track?.name}</h4>
                    <p>{track?.album.artists.map((artist) => artist.name).join(", ")}</p>
                </div>
                ) : (
                <div className="footer__songInfo">
                    <h4>{track?.name||'No song is playing'}</h4>
                    <p>...</p>
                </div>
                )}
            </div>
            <div className="footer__center">
                <ShuffleIcon className='footer__green'/>
                <SkipPreviousIcon className='footer__icon' onClick={() => nextTrack(-1)}/>
                {(!value) ? <PlayCircleOutlineIcon fontSize='large' className='footer__icon' onClick={handleClick}/> :
                <PauseCircleOutlineIcon  fontSize='large' className='footer__icon' onClick={handleClick}/>}
                <SkipNextIcon className='footer__icon' onClick={() => nextTrack(1)}/>
                <RepeatIcon className='footer__green'/>
            </div>
            <div className="footer__right">
        <Grid container spacing={2}>
          <Grid item>
            <PlaylistPlayIcon />
          </Grid>
          <Grid item>
            <VolumeDownIcon />
          </Grid>
          <Grid item xs>
            <Slider aria-labelledby="continuous-slider" onChange={(e) => handleChange(e.target.value)}/>
          </Grid>
        </Grid>
      </div>
        </div>
    );
};

export default Footer;