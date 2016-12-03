import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../../actions';
import { connect } from 'react-redux';
 
class SignIn extends Component {
    handleFormSubmit({ email, password }) {
        this.props.signinUser({email, password});
    }

    renderAlert() {
        if(this.props.errorMessage) {
            return (
                <div className="alert alert-danger">
                    <strong> Ooops : </strong> {this.props.errorMessage}
                </div>
            )
        }
    }

    render() {
        const { handleSubmit, fields: { email, password }} = this.props;

        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <fieldset className="form-group">
                    <label>Email :</label>
                    <Field name="email" component="input" type="text" placeholder="Email" className="form-control" />                    
                </fieldset>
                <fieldset className="form-group">
                    <label>Password :</label>
                    <Field name="password" component="input" type="password" placeholder="Password" className="form-control" />                    
                </fieldset>
                {this.renderAlert()}
                <button action="submit" className="btn btn-primary">Sign In</button>                
            </form>
        );
    }
}

//Application de reduxForm dans un premier temps
SignIn = reduxForm({
    form: 'signin',
    fields: ['email', 'password']
})(SignIn);

function mapStateToProps(state) {
    return {
        errorMessage: state.auth.error
    }
}

//Connection à notre store dans un second temps, l'ordre importe
SignIn = connect(mapStateToProps , actions)(SignIn);

export default SignIn;