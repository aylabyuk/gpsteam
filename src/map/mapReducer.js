const initialState = {
    selectedSite: null
}

export const mapReducer = (state = initialState , action) => {
    switch (action.type) {
      case 'SET_SELECTED_SITE':
        return {
            ...state,
            selectedSite: action.payload
        }
      default:
            return state
    }
}