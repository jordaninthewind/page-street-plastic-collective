import {
  Box,
  Button,
  Container,
  TextField,
  Typography
} from '@mui/material';
import { useState } from 'react';

import { Section } from '@app/containers';
import { saveMessage } from '@app/services';

import '@app/sections/Contact.css';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [emailError, setEmailError] = useState(null);
  const [messageSent, setMessageSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const hasSentAMessage = window.localStorage.getItem('hasSentAMessage');

  const handleNameChange = (e) => {
    setName(e.target.value);
  }

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  const handleEmailChange = (e) => {
    const value = e.target.value;
  
    setEmail(value);
  
    if (!validateEmail(value)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError(null);
    }
  }

  
  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    await saveMessage({ name, email, message });

    window.localStorage.setItem('hasSentAMessage', true);

    setMessageSent(true);
  
    setIsLoading(false);
  }

  return (
    <Section id="contact" title={messageSent ? 'Thanks!' : 'Join In!'}>
      {hasSentAMessage ? (
        <Typography variant="h6" align="center">
          Thanks for your message! We'll get back to you soon.
        </Typography>
      ) : (
      <Container maxWidth="sm" sx={{ pb: 3 }}>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            '& .MuiTextField-root': {
              width: '100%',
            },
          }}
        >
          <TextField
            label="Your Name"
            variant="outlined"
            value={name}
            onChange={handleNameChange}
            required
            fullWidth
          />
          <TextField
            label="Your Email"
            type="email"
            variant="outlined"
            value={email}
            onChange={handleEmailChange}
            required
            fullWidth
            error={!!emailError}
            helperText={emailError}
            />
          <TextField
            label="Your Message"
            variant="outlined"
            multiline
            rows={4}
            value={message}
            onChange={handleMessageChange}
            required
            fullWidth
          />
          <Button
            type="submit"
            variant="contained"
            size="large"
            loading={isLoading}
            sx={{
              mt: 2,
              py: 1.5,
            }}
            disabled={!name || !email || !!emailError || !message || isLoading}
          >
            {isLoading ? 'Sending...' : 'Send'}
          </Button>
         </Box>
      </Container>
      )}
    </Section>
  );
}

export default Contact; 