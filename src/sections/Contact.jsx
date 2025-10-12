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
import { trackEvent, identifyUser } from '@app/services/analytics';

import '@app/sections/Contact.css';

const title = 'Shoot us a message !';
const subtitle = 'We would love to hear from you! Please fill out the form below to send us a message.';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [emailError, setEmailError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [resendMessage, setResendMessage] = useState(false);

  const hasSentAMessage = window.localStorage.getItem('hasSentAMessage');

  const handleNameChange = ({target: {value}}) => {
    setName(value);
  }

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  const handleEmailChange = ({target: {value}}) => {
    setEmail(value);
  
    if (!validateEmail(value)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError(null);
    }
  }
  
  const handleMessageChange = ({target: {value}}) => {
    setMessage(value);
  }

  const handleSubmit = async ({preventDefault}) => {
    preventDefault();

    trackEvent('contact_message_sent', { name, email, message });
    identifyUser(email);

    setIsLoading(true);

    await saveMessage({ name, email, message });

    window.localStorage.setItem('hasSentAMessage', true);
  
    setIsLoading(false);
  }

  return (
    <Section id="contact" title={title} subtitle={subtitle}>
      {!hasSentAMessage || resendMessage ? (
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
            label="Name"
            variant="outlined"
            value={name}
            onChange={handleNameChange}
            required
            fullWidth
          />
          <TextField
            label="Email"
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
            label="Message"
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
          >
            {isLoading ? 'Sending...' : 'Send'}
          </Button>
         </Box>
      </Container>
      ) : (
        <Container maxWidth="sm" sx={{ pb: 3 }}>  
          <Typography variant="h6" align="center">
            Thanks for your message! We'll get back to you soon.
          </Typography>
          <Button
            variant="outlined"
            onClick={() => setResendMessage(true)}
          >
            Send Another Message
          </Button>
          </Container>
      )}
    </Section>
  );
}

export default Contact; 