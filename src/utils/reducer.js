export const initialState = {
    user: null,
    playlists: [],
    discover_weekly: null,
    playing: false,
    token: null,
    track: null,
    value: false,
    track_no: null,
    search: [],
}

const reducer = (state, action) => {
    //console.log(action);

    switch(action.type) {
        case 'SET_USER':
            return {
                ...state,
                user: action.user
            }
        case 'SET_TOKEN':
            return {
                ...state,
                token: action.token
            }
        case 'SET_PLAYLIST':
            return {
                ...state,
                playlists: action.playlists
            }
        case 'SET_DISCOVER_WEEKLY':
            return {
                ...state,
                discover_weekly: action.discover_weekly
            }
        case 'SET_TRACK':
            return {
                ...state,
                track: action.track
            }
        case 'SET_PLAYING':
            return {
                ...state,
                value: action.value
            }       
        case 'SET_TRACK_NO':
            return {
                ...state,
                track_no: action.track_no
            }   
        case 'SET_SEARCH':
            return {
                ...state,
                search: action.search
            }         
        default:
            return state;
    }
}

export default reducer;