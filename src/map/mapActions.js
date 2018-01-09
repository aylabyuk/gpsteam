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

export const toggleDrawer = () => ({
    type: 'TOGGLE_DRAWER'
})


export const setZoom = (zoom) => ({
    type: 'SET_ZOOM',
    payload: zoom
})

export const setPosition = (position) => ({
    type: 'SET_POSITION',
    payload: position
})