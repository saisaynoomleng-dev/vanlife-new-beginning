'use client';

import { handleContact } from '@/actions/contact';
import Form from 'next/form';
import { useActionState, useEffect } from 'react';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import SubmitButton from './SubmitButton';
import { toast } from 'sonner';

const initialFormState = {
  status: '',
  message: '',
  field: '',
};

const ContactForm = () => {
  const [state, actionFunction] = useActionState(
    handleContact,
    initialFormState,
  );

  useEffect(() => {
    if (state.status === 'success') {
      toast.success(state.message);
    }
    if (state.status === 'error') {
      toast.error(state.message);
    }
  }, [state.status, state.message]);

  return (
    <Form action={actionFunction} className="flex flex-col gap-y-4">
      <div className="space-y-5">
        <label htmlFor="contact-name" className="form-label">
          Name
        </label>
        <Input
          type="text"
          name="name"
          id="contact-name"
          autoComplete="name"
          placeholder="John Doe"
          required
        />
        {state.status === 'error' && state.field === 'name' && (
          <p className="form-error-message">{state.message}</p>
        )}
      </div>

      <div className="space-y-5">
        <label htmlFor="contact-email" className="form-label">
          Email
        </label>
        <Input
          type="email"
          name="email"
          id="contact-email"
          autoComplete="email"
          placeholder="johndoe@example.com"
          required
        />
        {state.status === 'error' && state.field === 'email' && (
          <p className="form-error-message">{state.message}</p>
        )}
      </div>

      <div className="space-y-5">
        <label htmlFor="contact-phone" className="form-label">
          Phone
        </label>
        <Input
          type="string"
          name="phone"
          id="contact-phone"
          autoComplete="phone"
          placeholder="1234567890"
          required
        />
        {state.status === 'error' && state.field === 'phone' && (
          <p className="form-error-message">{state.message}</p>
        )}
      </div>

      <div className="space-y-5">
        <label htmlFor="contact-subject" className="form-label">
          Subject
        </label>
        <Input
          type="text"
          name="subject"
          id="contact-subject"
          placeholder="I'm interested in franchising..."
          required
        />
        {state.status === 'error' && state.field === 'subject' && (
          <p className="form-error-message">{state.message}</p>
        )}
      </div>

      <div className="space-y-5">
        <label htmlFor="contact-message" className="form-label">
          Message
        </label>
        <Textarea name="message" id="contact-message"></Textarea>
        {state.status === 'error' && state.field === 'message' && (
          <p className="form-error-message">{state.message}</p>
        )}
      </div>

      <SubmitButton>Submit</SubmitButton>
    </Form>
  );
};

export default ContactForm;
