let initialState={
    title:"",
    description:"",
    start_time:"",
    end_time:""
}

function noteReducer(state=initialState, action){
    switch(action.type)
    {
        case TOGGLE_FOLLOW_USER:{

        }
        default:
            return state;
    }
}

export const getNotes = () =>{
    return async (dispatch)
}