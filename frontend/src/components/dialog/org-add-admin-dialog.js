import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, Input, ModalHeader, ModalBody, Label, Form, InputGroup, InputGroupAddon, FormGroup } from 'reactstrap';
import { gettext, siteRoot, mediaUrl } from '../../utils/constants';
import { seafileAPI } from '../../utils/seafile-api';


class AddOrgAdminDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPasswordVisible: false,
      email: '',
      name: '',
      password: '',
      passwdNew: '',
    };
  }

  handleSubmit = (e) => {
    let password = this.state.password;
    let email = this.state.email;
    let name = this.state.name;
    let password1 = this.state.password;
    let password2 = this.state.passwordNew;
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
      <Modal isOpen={true} centered={true}>
        <ModalHeader toggle={this.toggle}>{gettext('Add Admins')}</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label>{gettext('Enter')}</Label>
              <Input type="textarea" name="text" placeholder={gettext("Emails, separated by ','")}/>
            </FormGroup>
            <FormGroup>
              <Label className="tip">{gettext('Tip: the emails should be the users already added.')}</Label>
            </FormGroup>
            <Button>{gettext('Submit')}</Button>
          </Form>
        </ModalBody>
      </Modal>
    );
  }
}

export default AddOrgAdminDialog;
