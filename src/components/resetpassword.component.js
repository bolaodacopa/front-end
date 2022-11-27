import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../services/auth.service";
import { withRouter } from '../common/with-router';

const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const vpassword = (value, props, components) => {
    if (value.length < 6 || value.length > 40) {
        return (
            <div className="alert alert-danger" role="alert">
                The password must be between 6 and 40 characters.
            </div>
        );
    }
};

const vconfirmpassword = (value, props, components) => {
    if (components['password'][0].value !== components['confirmpassword'][0].value) {
        return (
            <div className="alert alert-danger" role="alert">
                Passwords are not equal.
            </div>
        );
    }
};

class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);

        this.state = {
            currentUser: undefined,
            token: undefined,
            password: "",
            confirmpassword: "",
            successful: false,
            message: "",
            loading: false
        };
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    onChangeConfirmPassword(e) {
        this.setState({
            confirmpassword: e.target.value
        });
    }

    handleRegister(e) {
        e.preventDefault();

        this.setState({
            message: "",
            successful: false
        });

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            this.setState({
                loading: true
            });

            AuthService.resetpassword(
                this.state.token,
                this.state.password
            ).then(
                response => {
                    this.setState({
                        message: response.data.message,
                        successful: true,
                        loading: false
                    });
                },
                error => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.response.data.error ||
                        error.message ||
                        error.toString();

                    this.setState({
                        successful: false,
                        message: resMessage,
                        loading: false
                    });
                }
            );
        }
    }

    componentDidMount() {
        const search = this.props.router.location.search;
        const token = new URLSearchParams(search).get("token");
        const user = AuthService.getCurrentUser();

        this.setState({
            token: token,
            currentUser: user
        });

        if (user) {
            this.setState({
                message: 'Participante logado.',
                successful: true
            });
        }
    }

    render() {
        return (
            <div className="col-md-12">
                <div className="card card-container">
                    <Form
                        onSubmit={this.handleRegister}
                        ref={c => {
                            this.form = c;
                        }}
                    >
                        {!this.state.successful && this.state.token && (
                            <div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <Input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.onChangePassword}
                                        validations={[required, vpassword]}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="confirmpassword">Confirme Password</label>
                                    <Input
                                        type="password"
                                        className="form-control"
                                        name="confirmpassword"
                                        value={this.state.confirmpassword}
                                        onChange={this.onChangeConfirmPassword}
                                        validations={[required, vconfirmpassword]}
                                    />
                                </div>

                                <div className="form-group">
                                    <button className="btn btn-primary btn-block" disabled={this.state.loading}>
                                        {this.state.loading && (
                                            <span className="spinner-border spinner-border-sm"></span>
                                        )}
                                        Redefinir Senha
                                    </button>
                                </div>
                            </div>
                        )}

                        {this.state.message && (
                            <div className="form-group">
                                <div
                                    className={
                                        this.state.successful
                                            ? "alert alert-success"
                                            : "alert alert-danger"
                                    }
                                    role="alert"
                                >
                                    {this.state.message}
                                </div>
                            </div>
                        )}

                        {!this.state.currentUser && !this.state.token && (
                            <div className="form-group">
                                <div
                                    className="alert alert-danger"
                                    role="alert"
                                >
                                    Solicite uma redefinição de senha.
                                </div>
                            </div>
                        )}
                        <CheckButton
                            style={{ display: "none" }}
                            ref={c => {
                                this.checkBtn = c;
                            }}
                        />
                    </Form>
                </div>
            </div>
        );
    }
}

export default withRouter(ResetPassword);