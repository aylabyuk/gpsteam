import React, { Component } from 'react';
import ChipInput from 'material-ui-chip-input'

import { Field } from 'redux-form'

const renderChip = ({input, hintText, floatingLabelText, dataSource}) => (
    <ChipInput
        {...input}
        dataSource = {dataSource}
        value = { input.value || []}
        onRequestAdd={(addedChip) => {
            let values = input.value || [];
            values = values.slice();
            values.push(addedChip);
            input.onChange(values);
        }}
        onRequestDelete={(deletedChip) => {
            let values = input.value || [];
            values = values.filter(v => v !== deletedChip);
            input.onChange(values);
        }}
        onBlur={() => input.onBlur()}
        hintText={hintText}
        floatingLabelText={floatingLabelText}
        fullWidth
        maxSearchResults={20}
        listStyle={{ maxHeight: 200, overflow: 'auto' }}
    />
);

class SitesChips extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chips: []
        }
    }

    render() {
        return (
            <Field name="sites" 
                component={renderChip} 
                floatingLabelText='site/s' 
                dataSource={this.props.allSite.map((s) => { return s.name })}/>
        );
    }
}


export default SitesChips