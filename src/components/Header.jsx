import { Avatar } from '@mui/material';
import './Header.css'
import SearchIcon from "@mui/icons-material/Search";
import { useDataLayerValue } from './DataLayer';
import { useEffect, useState } from 'react';

const Header = () => {
    const [{user, token}, dispatch] = useDataLayerValue();
    const [searchQuery, setSearchQurery] = useState("");

    useEffect(() => {
        const timer = setTimeout(() => {
            if(searchQuery){
                handleChange(searchQuery)
            }
        }, 200)

        return () => {
            clearTimeout(timer);
        }
    }, [searchQuery])

    const handleChange = async (query) => {
        const response = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=album`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        const result = data?.albums.items.filter(item => item?.album_type == 'single')
        console.log(result)
        dispatch({
            type:'SET_SEARCH',
            search: result
        })
    }



    return (
        <div className='header'>
            <div className="header__left">
                <SearchIcon/>
                <input placeholder="Search for Artists, Songs, or Podcasts "
                type="text"
                onChange={(e) => setSearchQurery(e.target.value)}/>
            </div>
            <div className="header__right">
                <Avatar src={user?.images[0]?.url}/>
                <h4>{user?.display_name}</h4>
            </div>
        </div>
    );
};

export default Header;