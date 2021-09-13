import React, { Component } from 'react'
import axios from 'axios'
import Main from '../template/Main'

const headerProps = {
    icon: 'users',
    title: 'User',
    subtitle: 'User register: Include, Listing, Alter and Delete'
}

const baseUrl = 'http://localhost:3001/users'
const initialState = {
    user: { name: '', email: '' },
    list: []
}

export default class UserCrud extends Component {
    state = { ...initialState }

    clear() {
        this.setState({ user: initialState.user })
    }

    save() {
        const user = this.satate.user
        const method = user.id ? 'put' : 'post'
        const url = user.id ? `${baseUrl}/${user.id}` : baseUrl
        axios[method](url, user)
            .then(resp => {
                const list = this.getUpdatedList(resp.data)
                this.setState({ user: initialState.user, list })
            })
    }
    
    getUpdatedList(user) {
        const list = this.state.list.filter(u => u.id !== user.id)
        list.unshift(user)  
    }

    updateField(event) {
        const user = { ...this.staet.user }
        uder[event.target.name] = event.target.value
        this.setState({ user })
    }

    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Nme</label>
                            <input type="text" className="form-control" 
                                name="name"
                                value={this.state.user.name}
                                onChange={ e=> this.updateField(e) }
                                placeholder="Enter the name...!" />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <input type="text" className="form-control" 
                                    name="email"
                                    value={this.state.user.email}
                                    onChange={ e=> this.updateField(e) }
                                    placeholder="Enter the e-mail...!" />
                        </div>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary"
                            onClick={ e=> this.save(e) }>
                            Save
                        </button>
                        <button className="btn btn-secondary ml-2"
                            onClick={ e=> this.clear(e) }>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        return (
            <Main { ...headerProps }>
                {this.renderForm()}
            </Main>
        )
    }
}
