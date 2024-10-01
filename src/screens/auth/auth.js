// auth.js
export const handleSignup = async (
    email, 
    password, 
    confirmPassword, 
    username, 
    displayMessage, 
    isPasswordStrong, 
    setIsSuccess, 
    setLoading, 
    navigation
  ) => {
    if (!email || !password || !confirmPassword || !username) {
      displayMessage('Please fill out all fields');
      return;
    }
  
    if (password !== confirmPassword) {
      setIsSuccess(false);
      displayMessage('Passwords do not match');
      return;
    }
  
    if (!isPasswordStrong(password)) {
      setIsSuccess(false);
      displayMessage(
        'Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character',
      );
      return;
    }
  
    setLoading(true);
    try {
      const response = await fetch('http://10.0.2.2:8000/v1/session/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
          confirmPassword,
        }),
      });
  
      const data = await response.json();
      if (response.ok) {
        displayMessage('Signup successful!');
        setIsSuccess(true);
        navigation.navigate('Login');
      } else {
        displayMessage(data.message || 'Signup failed.');
        setIsSuccess(false);
      }
    } catch (error) {
      displayMessage('Network error. Please try again.');
      setIsSuccess(false);
    } finally {
      setLoading(false);
    }
  };
  
  export const handleLogin = async (
    email,
    password,
    displayMessage,
    setIsSuccess,
    setLoading,
    navigation
  ) => {
    if (!email || !password) {
      displayMessage('Please fill out both email and password');
      return;
    }
  
    setLoading(true);
    try {
      const response = await fetch('http://10.0.2.2:8000/v1/session/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
  
      const data = await response.json();
      if (response.ok) {
        displayMessage('Login successful!');
        setIsSuccess(true);
        // Navigate to another screen, etc.
        navigation.navigate('Home');
      } else {
        displayMessage(data.message || 'Login failed.');
        setIsSuccess(false);
      }
    } catch (error) {
      console.error('Network Error:', error);
      displayMessage('Network error. Please try again.');
      setIsSuccess(false);
    } finally {
      setLoading(false);
    }
  };
  