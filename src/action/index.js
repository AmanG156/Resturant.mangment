export const getChefList = (payload) => {
    return {
        type: "CHEFLIST",
        payload,
    }
}

export const getCategoryLists = (payload) => {
    return {
        type: "CATEGORYLIST",
        payload,
    }
}

export const Timer = (payload) => {
    console.log(payload,"payload")
    return {
        type: "TIMER",
        payload,
    }
}