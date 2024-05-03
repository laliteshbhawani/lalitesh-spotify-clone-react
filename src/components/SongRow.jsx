import { useDataLayerValue } from './DataLayer';
import './SongRow.css'

const SongRow = ({track, track_no, spotify}) => {
    const [{}, dispatch] = useDataLayerValue();

    const calculateDuration = (time) => {
        const total_sec = parseInt(time/1000);
        const sec = total_sec%60;
        const min = parseInt(total_sec/60);
        return `${min}:${sec}`
    }

const handleClick = async (id, track_no) => {
    spotify
      .play({
        uris: [`spotify:track:${id}`],
      })
      .then(() => {
        spotify.getTrack(id).then((response2) => {
            dispatch({
                type:'SET_PLAYING',
                value: true
            })
            dispatch({
                type:'SET_TRACK',
                track: response2
            })
            dispatch({
                type: 'SET_TRACK_NO',
                track_no: track_no
            })
        });
      });
      
};

    return (
        <div className='songRow' onClick={() => handleClick(track?.id, track_no)}>
            <div className='serial_no'>{track_no+1}</div>
            <img className="songRow__album" src={track.album.images[0].url} alt="" />
            <div className='songRow__info'>
                <h1>{track.name}</h1>
                <div className='details'>
                    <p className='artist'>
                        {track.artists.map((artist) => artist.name).join(", ")} -{" "}
                    </p>
                    <p className='album_name'>
                        {track.album.name}
                    </p>
                    <p>
                        {calculateDuration(track.duration_ms)}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SongRow;