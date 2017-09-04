import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actionCreators from './actions/index'
import MainComponent from './MainComponent'

// tap event handler for react
// https://github.com/zilverline/react-tap-event-plugin
import injectTapEventPlugin from 'react-tap-event-plugin';


function mapStateToProps(state) {
	return state
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(actionCreators, dispatch)
}

// materia-ui requires the injectTapEventPlugin function to run before the rendering og its components
injectTapEventPlugin()

const App = connect(mapStateToProps, mapDispatchToProps)(MainComponent)

export default App