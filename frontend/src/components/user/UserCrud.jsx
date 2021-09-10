import React, { Component } from 'react'
import Main from '../template/Main'

const headerProps = {
    icon: 'users',
    title: 'User',
    subtitle: 'User register: Include, Listing, Alter and Delete'
}

export default class UserCrud extends Component {
    render() {
        return (
            <Main { ...headerProps }>
                User Register
            </Main>
        )
    }
}
