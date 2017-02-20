import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Button, Input, Message, Popup } from 'semantic-ui-react'
import { Field, reduxForm } from 'redux-form'  
import { registerUser } from '../actions/index'
import { validate } from './m/m.js'

const form = reduxForm({  
	form: 'register',
	validate
})

const renderField = field => (  
	<Popup
	trigger={<Input {...field.input} error={field.meta.touched && field.meta.error ? true : false} type={field.type} placeholder={field.placeholder} />}
	content={field.meta.touched && field.meta.error ? field.meta.error : ''}
	positioning='right center'
	style={{color:'red', width: 200}}
	open={field.meta.touched && field.meta.error && field.meta.active ? true : false}
	on='focus'
	/>
)

class SignUpInputs extends Component {
	handleFormSubmit(formProps) {
		this.props.registerUser(formProps)
	}

	renderAlert() {
		if(this.props.errorMessage) {
			return (
                <Message negative size='tiny'>
                    <p>{this.props.errorMessage}</p>
                </Message>
			)
		}
	}

	render() {
		const { handleSubmit } = this.props

		return (
            <div>
            {this.renderAlert()}
                <form id='regForm' onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <Field component={renderField} name="email" placeholder="Email" type='email'/>
                <Field component={renderField} name="name" placeholder="Full Name" type='text'/>
                <Field component={renderField} name="username" placeholder="Username" type='text'/>
                <Field component={renderField} name="password" placeholder="Password" type='password'/>
                    
                    <Button type='submit' color='blue'>
                        Sign up
                    </Button>

                    <p> By signing up, you agree to our 
                        <br/><b>Terms</b> & <b>Privacy Policy</b>.
                    </p>
                </form>
            </div>
		)
	}
}

function mapStateToProps(state) {  
	return {
		errorMessage: state.auth.error,
		message: state.auth.message
	}
}

export default connect(mapStateToProps, { registerUser })(form(SignUpInputs))  