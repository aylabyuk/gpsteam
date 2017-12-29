import React from 'react'
import { TextField } from 'material-ui'
import gql from 'graphql-tag';

export const renderTextField = ({
    input,
    label,
    placeholder,
    meta: { touched, error },
    ...custom
}) => (
    <TextField 
        margin='dense'
        fullWidth
        label={label}
        placeholder={placeholder}
        InputLabelProps={{ shrink: true }}
        InputProps={{ style: {fontSize: 25}} }
        error={touched && error ? true : false}
        helperText={touched && error ? error : ''}
        {...input}
        {...custom}/>
)

export function setLocalStorageTokens(token, refreshToken) {
    if (typeof(Storage) !== "undefined") {
        localStorage.setItem("token", token)
        localStorage.setItem("refreshToken", refreshToken)
    } else {
        window.alert('localstorage not supported, you cant login using this device.')
        // Sorry! No Web Storage support..
    }
}

export function tryLogin(data, mutate) {
    mutate({
        variables: {
            username: data.username, 
            password: data.password
        }
    }).then((d) => {
        // successfully logged in
        setLocalStorageTokens(d.data.login.token, d.data.login.refreshToken)
        window.location.reload();
    }).catch((msg) => {
        console.log(msg)
        window.alert(msg.graphQLErrors[0].message)
    })
}

export const loginQuery = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            token
            refreshToken
        }
    }
`
