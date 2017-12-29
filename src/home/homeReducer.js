const initialState = {
    isSideBarOpen: false
}

export const homeReducer = (state = initialState , action) => {
    switch (action.type) {
      case 'TOGGLE_SIDEBAR':
        return {
            ...state,
            isSideBarOpen: !state.isSideBarOpen
        }
      default:
            return state
    }
}