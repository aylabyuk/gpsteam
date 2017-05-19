import React, { Component } from 'react';
import { connect } from 'react-redux'

// components
import FieldWorkList from './FieldWorkList'
import FieldWorkForm from './FieldWorkForm'

// ui
import { Paper, Toolbar, ToolbarGroup, ToolbarTitle, FlatButton, GridList, Dialog } from 'material-ui'

const styles = {
  gridList: {
    marginTop: '5px',
    width: '100%',
    height: '100%',
    overflowY: 'auto',
    overflowX: 'hidden',
  },
  paper: {
    width: 'auto',
    height: '100%',
    padding: 5
  }
};

class _FieldWork extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openDialog: false,
            width: window.innerWidth,
            height: window.innerHeight
        };
        this.updateDimensions = this.updateDimensions.bind(this);
    }

    handleOpen = () => {
        this.setState({openDialog: true});
    };

    handleClose = () => {
        this.setState({openDialog: false});
    };

    updateDimensions() {
        this.setState({width: window.innerWidth, height: window.innerHeight});
    }

    componentWillMount() {
        this.updateDimensions();
    }

    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions);
    }
    
    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }

    render() {

        const actions = [
        <FlatButton
            label="Cancel"
            primary={true}
            onTouchTap={this.handleClose}
        />,
        <FlatButton
            label="Submit"
            primary={true}
            disabled={true}
            onTouchTap={this.handleClose}
        />,
        ];

        return (
            <Paper style={styles.paper}>
                <Toolbar>
                    <ToolbarGroup>
                        <ToolbarTitle text="Fieldworks" />
                    </ToolbarGroup>
                    <ToolbarGroup>
                        <FlatButton primary label='Create Fieldwork' onTouchTap={()=> this.handleOpen()} />
                    </ToolbarGroup>
                </Toolbar>

                <GridList
                    cellHeight={this.state.height - 80}
                    cols={1}
                    style={styles.gridList} 
                    id="style-5" >
                    <FieldWorkList />
                </GridList>

                <Dialog
                    title="Create Fieldwork"
                    modal={true}
                    actions={actions}
                    open={this.state.openDialog}
                    contentStyle={{maxWidth: '565px'}}>
                    
                    <FieldWorkForm />

                </Dialog>

            </Paper>
        );
    }
}

export default _FieldWork;