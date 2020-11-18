import React, {Component} from 'react';
import {View, Text} from 'react-native';

const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
const phoneRegex = /^((?:[+?0?0?966]+)(?:\s?\d{2})(?:\s?\d{7}))$/;

class Validate {
  constructor() {
    this.emailRegex = emailRegex;
    this.phoneRegex = phoneRegex;
  }
  isEmpty(...data) {
    for (let i = 0; i < data.length; i++) {
      if (!data[i]) return true;
    }
    return false;
  }
  isEmail(email) {
    return this.emailRegex.test(email);
  }
  isPhone(phone) {
    return this.phoneRegex.test(phone);
  }
  isConfirmPassword(password, confirmedPassword) {
    return password === confirmedPassword;
  }
  isName(username) {
    return username.length >= 2;
  }
  isPassword(password) {
    return password.length >= 6;
  }
}
export default new Validate();
