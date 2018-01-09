export const setSelectedSite = (site) => ({
    type: 'SET_SELECTED_SITE',
    payload: site
})

export const toggleShowCampaignSites = () => ({
    type: 'TOGGLE_SHOWCAMPAIGNSITES'
})

export const toggleShowContinuousSites = () => ({
    type: 'TOGGLE_SHOWCONTINUOUSSITES'
})

export const toggleShowFaultLines = () => ({
    type: 'TOGGLE_SHOWFAULTLINES'
})