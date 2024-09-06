import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Paper, Button, CircularProgress } from '@mui/material';

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        if (!response.ok) throw new Error('Failed to fetch user data');
        const data = await response.json();
        setUser(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  return (
    <Box sx={{ padding: 4, display: 'flex', justifyContent: 'center' }}>
      {loading ? (
        <CircularProgress sx={{ margin: 'auto' }} />
      ) : error ? (
        <Typography color="error" variant="body1" sx={{ textAlign: 'center' }}>
          {error}
        </Typography>
      ) : (
        <Paper sx={{ padding: 5, maxWidth: 600, width: '100%', textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>
            User Details
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 1 }}>
            <strong>ID:</strong> {user.id}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 1 }}>
            <strong>Name:</strong> {user.name}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 1 }}>
            <strong>Email:</strong> {user.email}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 2 }}>
            <strong>Phone:</strong> {user.phone}
          </Typography>
          <Button
            onClick={() => navigate('/')}
            variant="contained"
            color="primary"
            sx={{ marginTop: 2 }}
          >
            Back to Home
          </Button>
        </Paper>
      )}
    </Box>
  );
};

export default UserDetail;
