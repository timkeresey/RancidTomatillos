import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Login from './Login';
import { BrowserRouter } from 'react-router-dom';

describe('Login', () => {
  it('should render a login form', () => {
    const fakeAddUser = jest.fn();
    render (<BrowserRouter><Login addUser={fakeAddUser}/></BrowserRouter>);
    expect(screen.getByText('Login Here')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your password')).toBeInTheDocument();
    expect(screen.getByText('login')).toBeInTheDocument();
  })

  it('should display an alert if the user enters incorrect login info', () => {
    global.alert = jest.fn();
    const fakeAddUser = jest.fn();
    render (<BrowserRouter><Login addUser={fakeAddUser}/></BrowserRouter>);
    userEvent.click(screen.getByText('login'));
    expect(screen.getByRole('login-form')).not.toHaveFormValues({
      email: 'rick@turing.io',
      password: 'asdf123'
    });
    expect(global.alert).toHaveBeenCalledTimes(1);
  })

  it('should update email input value on change', () => {
    render (<BrowserRouter><Login /></BrowserRouter>);
    fireEvent.change(screen.queryByPlaceholderText('Enter your email'), {target: {value: 'rick@turing.io'}});
    expect(screen.queryByPlaceholderText('Enter your email').value).toBe('rick@turing.io');
  })

  it('should update password input value on change', () => {
    render (<BrowserRouter><Login /></BrowserRouter>);
    fireEvent.change(screen.queryByPlaceholderText('Enter your password'), {target: {value: 'asdf123'}});
    expect(screen.queryByPlaceholderText('Enter your password').value).toBe('asdf123');
  })
})

//it should send you back to the homepage if you login correctly

// it('should render with a logout link if a user is logged in', () => {
//   render(
//     <BrowserRouter>
//     <App
//       loggedIn={true}
//     /></BrowserRouter>
//   );
//   expect(screen.getByText('Logout')).toBeInTheDocument();
// })
