import React from 'react';  
import { Redirect } from 'react-router-dom'

export function requireStaff(Component) {

  class ReqStaffComponent extends React.Component {
    render() {
        if(!this.props.me.isStaff) {
            return(<Redirect to='/' />)
        }

        return (
            <div>
            {this.props.me.isStaff === true
                ? <Component {...this.props} />
                : null
            }
            </div>
        )

    }
  }

  return ReqStaffComponent
}