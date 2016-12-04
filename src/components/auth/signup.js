import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Field, reduxForm } from 'redux-form';

class Signup extends Component {
    handleFormSubmit({email, password}) {
      this.props.signupUser({email, password});
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
              <fieldset className="form-group">
                  <label>Confirmation Password :</label>
                  <Field name="confirmationPassword" component="input" type="password" placeholder="Confirmation" className="form-control" />
              </fieldset>

              <button action="submit" className="btn btn-primary">Sign In</button>
          </form>
      );
    }
}

Signup = reduxForm({
    form: 'signup',
    fields: ['email', 'password', 'confirmationPassword']
})(Signup);


export default connect(null, actions)(Signup);
