import { useDataLayerValue } from './DataLayer';
import './SidebarOptions.css'

const SidebarOptions = ({ title, id, Icon, spotify }) => {
  //console.log(id)
  const [{}, dispatch] = useDataLayerValue();

  const handleClick = (id) => {
    console.log(id)
    spotify.getPlaylist(id).then((response) => {

      dispatch({
        type: 'SET_SEARCH',
        search: []
      })
      dispatch({
        type: 'SET_DISCOVER_WEEKLY',
        discover_weekly: response
      })
    })
  }
    return (
        <div className="sidebarOption" onClick={() => handleClick(id)}>
        {Icon && <Icon className="sidebarOption__icon" />}
        {Icon ? <h4>{title}</h4> : <p>{title}</p>}
      </div>
    );
};

export default SidebarOptions;