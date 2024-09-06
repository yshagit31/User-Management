import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Card, CardContent, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CreateUser = () => {
  const [user, setUser] = useState({ name: '', email: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) throw new Error('Failed to create user');
      const data = await response.json();
      console.log('User created:', data);
      navigate('/');
    } catch (error) {
      setError('Error creating user.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ padding: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <Card sx={{ maxWidth: 600, width: '100%' }}>
          <CardContent>
            <Typography variant="h5" component="div" gutterBottom>
              Create User
            </Typography>
            <Box sx={{ backgroundColor: '#f5f5f5', padding: 3, borderRadius: 1 }}>
              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                  margin="normal"
                  variant="outlined"
                  sx={{
                    '& .MuiInputBase-input': {
                      color: 'black', // Text color
                    },
                    '& .MuiInputLabel-root': {
                      color: '#000', // Label text color
                    },
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: '#fff', // Background color
                    },
                  }}
                />
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  margin="normal"
                  variant="outlined"
                  sx={{
                    '& .MuiInputBase-input': {
                      color: '#000', // Text color
                    },
                    '& .MuiInputLabel-root': {
                      color: '#000', // Label text color
                    },
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: '#fff', // Background color
                    },
                  }}
                />
                <TextField
                  fullWidth
                  label="Phone"
                  name="phone"
                  value={user.phone}
                  onChange={handleChange}
                  margin="normal"
                  variant="outlined"
                  sx={{
                    '& .MuiInputBase-input': {
                      color: '#000', // Text color
                    },
                    '& .MuiInputLabel-root': {
                      color: '#000', // Label text color
                    },
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: '#fff', // Background color
                    },
                  }}
                />
                <Box sx={{ marginTop: 2 }}>
                  <Button type="submit" variant="contained">
                    Create User
                  </Button>
                  <Button onClick={() => navigate('/')} variant="outlined" sx={{ marginLeft: 2 }}>
                    Cancel
                  </Button>
                </Box>
              </form>
            </Box>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default CreateUser;
