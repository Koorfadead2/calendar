let initialState={
    day: new Date().getDate(),
    month: new Date().getMonth(),
    year: new Date().getFullYear()
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

const getDaysInMonth = (month = new Date().getMonth(), year = new Date().getFullYear()) =>{
    const date = new Date(year, month, 1);
    const days = [];
    while (date.getMonth() === month){
        days.push(new Date(date));
        date.setDate(date.getDate() + 1);
    }
    return days;
}

export const getTodayDate = () =>{
    return async (dispatch) =>{
        
    }
}