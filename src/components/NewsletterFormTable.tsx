'use client';

import { handleNewsletter } from '@/actions/newsletter';
import Form from 'next/form';
import { useActionState, useEffect } from 'react';
import { Input } from './ui/input';
import SubmitButton from './SubmitButton';
import { toast } from 'sonner';

const initialFormState = {
  status: '',
  message: '',
};

const NewsletterFormTable = () => {
  const [state, actionFunction] = useActionState(
    handleNewsletter,
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
    <Form action={actionFunction} className="flex flex-col gap-y-5">
      <div className="space-y-2">
        <label htmlFor="newsletter-email" className="form-label">
          Email
        </label>
        <Input
          required
          type="email"
          name="email"
          id="newsletter-email"
          placeholder="johndoe@example.com"
          autoComplete="email"
          className="border-brand-white"
        />
        {state.status === 'error' && (
          <p className="form-error-message">{state.message}</p>
        )}
      </div>

      <SubmitButton>Subscribe</SubmitButton>
    </Form>
  );
};

export default NewsletterFormTable;
