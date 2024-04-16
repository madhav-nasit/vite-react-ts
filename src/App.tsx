import {
  faCalendar,
  faEnvelope,
  faLock,
  faMapLocationDot,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { Button, CheckBox, Input, NavBar, RadioButton, Select } from './components';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { GENDER, HOBBIES, STATES } from './constants';
import {
  validateConfirmPassword,
  validateDob,
  validateEmail,
  validateEmpty,
  validateName,
  validatePassword,
} from './utils/formValidation';
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { showSuccessToast } from './utils/toast';

interface Users {
  id: string;
  fname: string;
  lname: string;
  email: string;
  dob: string | undefined;
  state: string;
  gender: string;
  hobbies: string[];
  password: string;
  confirmPassword: string;
}

function App() {
  const [isTouched, setIsTouched] = useState(false);
  const [users, setUsers] = useState<Users[]>([]);
  const [editId, setEditId] = useState<string | undefined>();
  // Input states
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState<string | undefined>();
  const [state, setState] = useState('');
  const [gender, setGender] = useState(GENDER[0]);
  const [hobbies, setHobbies] = useState<string[]>([]);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Error states
  const [fnameError, setFnameError] = useState('');
  const [lnameError, setLnameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [dobError, setDobError] = useState('');
  const [stateError, setStateError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  useEffect(() => {
    if (isTouched) {
      validateForm();
    }
  }, [fname, lname, email, dob, state, password, confirmPassword]);

  useEffect(() => {
    console.log('users', users);
  }, [users]);

  const resetForm = () => {
    setIsTouched(false);
    setFname('');
    setLname('');
    setEmail('');
    setDob(undefined);
    setState('');
    setGender(GENDER[0]);
    setHobbies([]);
    setPassword('');
    setConfirmPassword('');
    setFnameError('');
    setLnameError('');
    setEmailError('');
    setDobError('');
    setStateError('');
    setPasswordError('');
    setConfirmPasswordError('');
    setEditId(undefined);
  };

  const validateForm = () => {
    const fnameErrorMsg = validateName(fname, 'First Name');
    setFnameError(fnameErrorMsg);
    const lnameErrorMsg = validateName(lname, 'Last Name');
    setLnameError(lnameErrorMsg);
    const emailErrorMsg = validateEmail(email);
    setEmailError(emailErrorMsg);
    const dobErrorMsg = validateDob(dob);
    setDobError(dobErrorMsg);
    const stateErrorMsg = validateEmpty(state, 'State');
    setStateError(stateErrorMsg);
    const passwordErrorMsg = validatePassword(password);
    setPasswordError(passwordErrorMsg);
    const confirmpassErrorMsg = validateConfirmPassword(confirmPassword, password);
    setConfirmPasswordError(confirmpassErrorMsg);

    return (
      (fnameErrorMsg ||
        lnameErrorMsg ||
        emailErrorMsg ||
        dobErrorMsg ||
        passwordErrorMsg ||
        confirmpassErrorMsg) == ''
    );
  };

  const generateUniqueId = () => {
    return Math.random().toString(36).substr(2, 9);
  };

  const onFormSubmit = () => {
    try {
      setIsTouched(true);
      const isFormValid = validateForm();
      if (isFormValid) {
        resetForm();
        const updatedUser = {
          id: editId ? editId : generateUniqueId(),
          fname,
          lname,
          email,
          dob,
          state,
          gender,
          hobbies,
          password,
          confirmPassword,
        };
        if (!!editId) {
          showSuccessToast('User details edited successfully.');
          setUsers((prevUsers) => {
            // Find the index of the user with the given ID
            const index = prevUsers.findIndex((user) => user.id === editId);
            if (index !== -1) {
              // Create a new array with the updated user at the found index
              const updatedUsers = [...prevUsers];
              updatedUsers[index] = { ...updatedUser };
              return updatedUsers;
            } else {
              // If user with given ID is not found, return the previous state
              return prevUsers;
            }
          });
        } else {
          showSuccessToast('User details added successfully.');
          setUsers([...users, updatedUser]);
        }
      }
    } catch (error) {}
  };

  const deleteUser = (userId: string) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (confirmDelete) {
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      showSuccessToast('User deleted successfully.');
    }
  };

  const editUser = (user: Users) => {
    setEditId(user.id);
    setFname(user.fname);
    setLname(user.lname);
    setEmail(user.email);
    setDob(user.dob);
    setState(user.state);
    setGender(user.gender);
    setHobbies(user.hobbies);
    setPassword(user.password);
    setConfirmPassword(user.confirmPassword);
  };

  const renderForm = () => (
    <div id='add-form'>
      <form id='form-container'>
        <div className='horizontal-input'>
          <Input
            id='fname'
            label='First Name'
            name='fname'
            icon={faUser}
            value={fname}
            onChange={(event) => setFname(event.target.value)}
            onBlur={(event) => {
              if (event.target.value === '')
                setFnameError(validateName(event.target.value, event.target.placeholder));
            }}
            error={fnameError}
            required
          />
          <div className='horizontal-input-spacer'></div>
          <Input
            id='lname'
            label='Last Name'
            name='lname'
            icon={faUser}
            value={lname}
            onChange={(event) => setLname(event.target.value)}
            onBlur={(event) => {
              if (event.target.value === '')
                setLnameError(validateName(event.target.value, event.target.placeholder));
            }}
            error={lnameError}
            required
          />
        </div>
        <Input
          id='email'
          type='email'
          label='Email'
          name='email'
          icon={faEnvelope}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          onBlur={(event) => {
            if (event.target.value === '') setEmailError(validateEmail(event.target.value));
          }}
          error={emailError}
          required
        />
        <div className='horizontal-input'>
          <Input
            id='birthday'
            type='date'
            name='birthday'
            label={'Date of birth'}
            icon={faCalendar}
            value={dob ?? ''}
            onChange={(event) => setDob(event.target.value)}
            max={new Date().toISOString().split('T')[0]}
            onBlur={(event) => {
              if (event.target.value === '') setDobError(validateDob(event.target.value));
            }}
            error={dobError}
            required
          />
          <div className='horizontal-input-spacer'></div>
          <Select
            id='state'
            name='state'
            label='Select your state:'
            options={STATES}
            icon={faMapLocationDot}
            value={state}
            onChange={(event) => setState(event.target.value)}
            onBlur={(event) => {
              if (event.target.value === '')
                setStateError(validateEmpty(event.target.value, 'State'));
            }}
            error={stateError}
            required
          />
        </div>
        <RadioButton
          value={gender}
          options={GENDER}
          title='Select your gender:'
          onChange={(event) => setGender(event.target.value)}
        />
        <CheckBox
          value={hobbies}
          options={HOBBIES}
          title='Select your hobbies:'
          onChange={setHobbies}
        />
        <div className='horizontal-input'>
          <Input
            id='password'
            type='password'
            name='password'
            label='Password'
            icon={faLock}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            onBlur={(event) => {
              if (event.target.value === '') setPasswordError(validatePassword(event.target.value));
            }}
            error={passwordError}
            required
          />
          <div className='horizontal-input-spacer'></div>
          <Input
            id='confirm-password'
            type='password'
            name='confirmPassword'
            label='Confirm Password'
            icon={faLock}
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            onBlur={(event) => {
              if (event.target.value === '')
                setConfirmPasswordError(validateConfirmPassword(event.target.value, password));
            }}
            error={confirmPasswordError}
            required
          />
        </div>
        <Button className='submit' title='Submit' onClick={onFormSubmit} />
      </form>
    </div>
  );

  const renderUserDetails = () => (
    <div id='detail-view'>
      <h4>User List:</h4>
      {users.length > 0 ? (
        <table id='user-list'>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Birthday</th>
            <th>State</th>
            <th>Gender</th>
            <th>Hobbies</th>
            <th>Actions</th>
          </tr>
          {users.map((user, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{`${user.fname} ${user.lname}`}</td>
              <td>{user.email}</td>
              <td>{user.dob}</td>
              <td>{user.state}</td>
              <td>{user.gender}</td>
              <td>{user.hobbies.join(', ')}</td>
              <td>
                <div className='user-buttons'>
                  <button className='edit' onClick={() => editUser(user)}>
                    Edit
                  </button>
                  <div className='horizontal-input-spacer'></div>
                  <button className='delete' onClick={() => deleteUser(user.id)}>
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </table>
      ) : (
        <p>No user data found!</p>
      )}
    </div>
  );

  return (
    <>
      <NavBar />
      <div className='main'>
        {renderForm()}
        {renderUserDetails()}
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
