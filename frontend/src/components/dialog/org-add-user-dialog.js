import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, Input, ModalHeader, ModalBody, Label, Form, InputGroup, InputGroupAddon, FormGroup } from 'reactstrap';
import { gettext, siteRoot, mediaUrl } from '../../utils/constants';
import { seafileAPI } from '../../utils/seafile-api';


class AddOrgUserDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPasswordVisible: false,
      email: '',
      name: '',
      password: '',
      passwdnew: '',
    };
  }

  handleSubmit = (e) => {
    let email = this.state.email;
    let name = this.state.name;
    let password1 = this.state.password;
    let password2 = this.state.passwdnew;
    this.props.handleSubmit(email, name, password1, password2);
    e.preventDefault();
  } 

  handleKeyPress = (e) => {
    if (e.key == 'Enter') {
      this.handleSubmit(e);
    }
  };

  togglePasswordVisible = () => {
    this.setState({
      isPasswordVisible: !this.state.isPasswordVisible
    });
  }

  generatePassword = () => {
    let val = Math.random().toString(36).substr(5);
    this.setState({
      password: val,
      passwdnew: val
    });
  }

  inputEmail = (e) => {
    let email = e.target.value.trim();
    this.setState({email: email});
  }

  inputName = (e) => {
    let name = e.target.value.trim();
    this.setState({name: name});
  }


  inputPassword = (e) => {
    let passwd = e.target.value.trim();
    this.setState({password: passwd});
  }

  inputPasswordNew = (e) => {
    let passwd = e.target.value.trim();
    this.setState({passwdnew: passwd});
  }

  validateParamsInput = () => {
    let { password, passwdnew} = this.state;
    // validate password
    if (password.length === 0) {
      this.setState({errorInfo: 'Please enter password'});
      return false;
    }
    if (password.length < 8) {
      this.setState({errorInfo: 'Password is too short'});
      return false;
    }
    if (password !== passwdnew) {
      this.setState({errorInfo: 'Passwords don\'t match'});
      return false;
    }
  }

  toggle = () => {
    this.props.toggle();
  };

  render() {
    return (
      <Modal isOpen={true}>
        <ModalHeader toggle={this.toggle}>{gettext('Add User')}</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label>{gettext('Email')}</Label>
              <Input value={this.state.email || ''} onChange={this.inputEmail} />
            </FormGroup>
            <FormGroup>
              <Label>{gettext('Name(optional)')}</Label>
              <Input value={this.state.name || ''} onChange={this.inputName} />
            </FormGroup>
            <FormGroup>
              <Label>{gettext('Password')}</Label>
              <InputGroup className="passwd">
                <Input type={this.state.isPasswordVisible ? 'text' : 'password'} value={this.state.password || ''} onChange={this.inputPassword}/>
                <InputGroupAddon addonType="append">
                  <Button onClick={this.togglePasswordVisible}><i className={`link-operation-icon fas ${this.state.isPasswordVisible ? 'fa-eye': 'fa-eye-slash'}`}></i></Button>
                  <Button onClick={this.generatePassword}><i className="link-operation-icon fas fa-magic"></i></Button>
                </InputGroupAddon>
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <Label>{gettext('Confirm Password')}</Label>
              <Input className="passwd" type={this.state.isPasswordVisible ? 'text' : 'password'} value={this.state.passwdnew || ''} onChange={this.inputPasswordNew} />
            </FormGroup>
            <Button onClick={this.handleSubmit}>{gettext('Submit')}</Button>
          </Form>
        </ModalBody>
      </Modal>
    );
  }
}

export default AddOrgUserDialog;
