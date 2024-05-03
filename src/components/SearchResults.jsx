import { useDataLayerValue } from "./DataLayer";
import SearchPage from "./SearchPage";
import './SearchResults.css'

const SearchResults = ({spotify}) => {
    const [{search}] = useDataLayerValue();
    console.log(search[0])
    return (
        <div className="search_results">
            {search.map((song, index) => <SearchPage key={index} name={song.name} image={song.images[0].url} id={song.id} artist={song.artists} spotify={spotify}/>
            )}
        </div>        
    );
};

export default SearchResults;