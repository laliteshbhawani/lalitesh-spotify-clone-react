import { useEffect} from 'react';
import './App.css'
import SpotifyWebApi from "spotify-web-api-js";
import Login from './components/Login'
import { getTokenFromUrl } from './utils/spotify';
import Player from './components/Player';
import { useDataLayerValue } from './components/DataLayer';

const spotify = new SpotifyWebApi();

function App() {
  const [{token}, dispatch] = useDataLayerValue();

  useEffect(() => {
    const hash = getTokenFromUrl()
    window.location.hash="";
    const _token = hash.access_token
    
    if(_token){ 
      dispatch({
        type: 'SET_TOKEN',
        token: _token,
      })
      spotify.setAccessToken(_token);
      spotify.getMe().then((user) => {
        //console.log(user)

        dispatch({
          type: 'SET_USER',
          user: user,
        })
      })
      spotify.getUserPlaylists().then((playlists) => {

        dispatch({
          type: 'SET_PLAYLIST',
          playlists: playlists
        })
      })

      spotify.getPlaylist('564TPKwEnpS4A5nhIC1SY7').then((response) => {
        dispatch({
          type: 'SET_DISCOVER_WEEKLY',
          discover_weekly: response
        })
      })
    }
  } ,[])
  return(
    <>
      {
      token ? <Player spotify={spotify}/> : <Login/>
      }
    </>
  )
}

export default App
