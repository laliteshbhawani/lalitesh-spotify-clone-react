import { useDataLayerValue } from './DataLayer';
import './SearchPage.css'

const SearchPage = ({name, image, id, artist, spotify}) => {
    const [{}, dispatch] = useDataLayerValue();
    const handleClick = async (_id) => {
        console.log(_id)
        spotify
          .play({
            uris: [`spotify:track:${_id}`],
          })
          .then(() => {
            spotify.getMyCurrentPlayingTrack().then((response2) => {
                dispatch({
                    type:'SET_TRACK',
                    track: response2
                })
                dispatch({
                    type:'SET_PLAYING',
                    value: true
                })
            });
          });
            
    };

    return (
        <div>
            <div className='search_image' onClick={() => handleClick(id)}>
            <img src={image} alt="" />
            <div className='search_info'>
                {name}
                <p>{artist.map((artist) => artist.name).join(", ")} -{" "}</p>
            </div>
            </div>
        </div>
    );
};

export default SearchPage;