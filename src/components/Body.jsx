import './Body.css'
import { useDataLayerValue } from './DataLayer';
import Header from './Header';
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SongRow from './SongRow';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SearchResults from './SearchResults';

const Body = ({spotify}) => {
    const [{discover_weekly, search}] = useDataLayerValue();
    
    return (
        <div className='body'>
            <Header spotify={spotify}/>
            {(search.length!=0) ? <SearchResults spotify={spotify}/> :
            <div>
            <div className="body__info">
                <img src={discover_weekly?.images[0]?.url} alt="" />
                <div className="body__infoText">
                    <strong>PLAYLIST</strong>
                    <h2>{discover_weekly?.name}</h2>
                    <p>{discover_weekly?.description}</p>
                    <p>{discover_weekly?.tracks?.items.length} Songs🎷</p>
                </div>
            </div>
            <div className="body__songs">
                <div className="body__icons">
                   <PlayCircleFilledIcon className='body__shuffle'/>
                   <FavoriteIcon fontSize='large'/>
                   <MoreHorizIcon />
                </div>
                <div className='list__info'>
                    <div className='track_no'>#</div>
                    <div className='title'>Title</div>
                    <div className='album'>Album</div>
                    <div className='time'><AccessTimeIcon/></div>
                </div>
                <hr className=''/>
                {discover_weekly?.tracks?.items?.map((song, index) => (
                    <SongRow key={index} track_no={index} track={song.track} spotify={spotify}/>
                ))}
            </div></div>}
        </div>
    );
};

export default Body;