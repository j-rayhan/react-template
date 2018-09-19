import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';

import authAction from '../../../redux/auth/actions'

import {
    logo,
} from '../../../assets/images';
import './style.css';

const { login } = authAction

class Signin extends Component {
    state = {
        username_or_email: '',
        password: ''
    }

    handleSubmit = (e, formType) => {
        e.preventDefault();
        console.log(formType)

        let authData = {
            username_or_email: this.state.username_or_email,
            password: this.state.password
        }

        this.props.login(authData)
    }

    handleInputChange = (inputType, e) => {
        let change = {}
        change[inputType] = e.target.value
        this.setState(change)
    }

    render() {
        return (
            <div className="view">
                <form className="main-form" onSubmit={this.handleSubmit}>
                    <div className="container">
                        <div className="row">
                            <div className="col-6 offset-md-3">
                                <div className="logo"><img src={logo} alt="logo" /></div>
                                <div className="f-card">
                                    <p className="title">Please login</p>
                                    <p className="subtitle">Just a few details away from amazing FBA automation<br />
                                        using state of the tools from Accelerlist!</p>
                                    <div className="f-container">
                                        <label htmlFor="#">Use your username or email</label>
                                        <div className="f-row">
                                            <input
                                                type="text"
                                                placeholder="username or email"
                                                name="username_or_email"
                                                value={this.state.username_or_email}
                                                onChange={(e) => this.handleInputChange('username_or_email', e)}
                                            />
                                            <i className="far fa-user" />
                                        </div>
                                        <p className="f-text">*The username OR email you used to sign up for AccelerList.</p>
                                    </div>
                                    <div className="f-container">
                                        <label htmlFor="#">Password</label>
                                        <div className="f-row">
                                            <input type="password" placeholder="password" name="password" onChange={(e) => this.handleInputChange('password', e)} />
                                            <i className="fas fa-lock" />
                                        </div>
                                    </div>
                                    <div className="check">
                                        <label className="container-check">remember me
                                            <input type="checkbox" defaultChecked="checked" name="remember_me" />
                                            <span className="checkmark" />
                                        </label>
                                        <p className="check-text">
                                            *if this is a private computer.
                                        </p>
                                    </div>
                                    <button style={{ width: '100%' }} type="submit" className="button green">LOGIN</button>
                                    <div className="forgot">
                                        Forgot your password? <Link to="/forget_password">Change it here.</Link>
                                    </div>
                                    <Link to="/register" className="new-account">Don't have an account?</Link>
                                    <Link to="/register" className="button dark">REGISTER</Link>
                                </div>
                            </div>
                        </div>
                        <div className="copyright">
                            2018 Copyright <span>AccelerList</span>.
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}
export default connect(
    state => ({
        ...state.Auth.toJS()
    }),
    { login }
)(Signin)
