import './Sidebar.css'
import SidebarOptions from './SidebarOptions';
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import { useDataLayerValue } from './DataLayer';

const Sidebar = ({spotify}) => {
    const [{playlists}, dispatch] = useDataLayerValue();
    const handleClick = () => {

        spotify.getPlaylist('564TPKwEnpS4A5nhIC1SY7').then((respose) => {
            dispatch({
                type:'SET_DISCOVER_WEEKLY',
                discover_weekly: respose
            })
            dispatch({
                type: 'SET_SEARCH',
                search: []
            })
        })
    }

    return (
        <div className='sidebar'>
            <img
            className="sidebar__logo"
            src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
            alt="logo"
            onClick={handleClick}/>
            <SidebarOptions title="Home" Icon={HomeIcon}/>
            <SidebarOptions title="Search" Icon={SearchIcon}/>
            <SidebarOptions title="Your Library" Icon={LibraryMusicIcon}/>
            <br />
            <strong className="sidebar__title">PLAYLISTS</strong>
            <hr />
            {playlists?.items?.map((playlist, index) => (
            <SidebarOptions key={index} title={playlist.name} id={playlist?.id} spotify={spotify}/>
            ))}
        </div>
    );
};

export default Sidebar