const initialState = {
    selectedSite: null,
    showCampaignSites: true,
    showContinuousSites: true,
    showFaultLines: false,
    enableCluster: true
}

export const mapReducer = (state = initialState , action) => {
    switch (action.type) {
        case 'SET_SELECTED_SITE':
            return {
                ...state,
                selectedSite: action.payload
            }
        case 'TOGGLE_SHOWCAMPAIGNSITES':
            return {
                ...state,
                showCampaignSites: !state.showCampaignSites
            }
        case 'TOGGLE_SHOWCONTINUOUSSITES':
            return {
                ...state,
                showContinuousSites: !state.showContinuousSites
            }
        case 'TOGGLE_SHOWFAULTLINES':
            return {
                ...state,
                showFaultLines: !state.showFaultLines
            }
        default:
                return state
    }
}