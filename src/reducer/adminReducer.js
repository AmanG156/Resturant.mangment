const initialState = {
    list: [],
    categoryList: [],
    time: []
}
export const chefListReducer = (state= initialState , action) => {
    switch (action.type) {
        case "CHEFLIST":
            const {payload} = action
            return {
                list:[
                    {
                        payload:payload
                    }
                ]
                
            }
        default: return state;
    }
}

export const categoryListReducer = (state= initialState , action) => {
    switch (action.type) {
        case "CATEGORYLIST":
            const {payload} = action
            return {
                categoryList: payload
                    
                
                // categoryList:[
                //     {
                //         payload:payload
                //     }
                // ]
                
            }
        default: return state;
    }
}

export const timerReducer = (state= initialState , action) => {
    switch (action.type) {
        case "TIMER":
            const {payload} = action
            return {
                time: payload    
            }
        default: return state;
    }
}

// export default chefListReducer;