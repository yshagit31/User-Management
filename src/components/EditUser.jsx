// src/components/EditUser.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography, Card, CardContent, CircularProgress } from '@mui/material';

const EditUser = () => {
  const { id } = useParams();
  const [user, setUser] = useState({ name: '', email: '', phone: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        if (!response.ok) throw new Error('Failed to fetch user data');
        const data = await response.json();
        setUser({
          name: data.name,
          email: data.email,
          phone: data.phone,
        });
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      navigate('/');
    } catch (error) {
      setError('Error updating user.');
    }
  };

  return (
    <Box sx={{ padding: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f0f0' }}>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <Box sx={{ backgroundColor: '#ffffff', padding: 3, borderRadius: 1 }}>
          <Card sx={{ maxWidth: 600, width: '100%' }}>
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                Edit User
              </Typography>
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
                    Update User
                  </Button>
                  <Button onClick={() => navigate('/')} variant="outlined" sx={{ marginLeft: 2 }}>
                    Cancel
                  </Button>
                </Box>
              </form>
            </CardContent>
          </Card>
        </Box>
      )}
    </Box>
  );
};

export default EditUser;
