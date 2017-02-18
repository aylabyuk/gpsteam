import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actionCreators from './actions/index'
import MainComponent from './MainComponent'

import injectTapEventPlugin from 'react-tap-event-plugin';

function mapStateToProps(state) {
	return state
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(actionCreators, dispatch)
}

injectTapEventPlugin()

const App = connect(mapStateToProps, mapDispatchToProps)(MainComponent)

export default App