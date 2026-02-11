'use client';

import { handleEditUserAddress } from '@/actions/edit-user-address';
import Bounded from '@/components/Bounded';
import SubmitButton from '@/components/SubmitButton';
import { Input } from '@/components/ui/input';
import { useUser } from '@clerk/nextjs';
import Form from 'next/form';
import { redirect } from 'next/navigation';
import { useActionState, useEffect } from 'react';
import { toast } from 'sonner';

const initialFormState = {
  status: '',
  message: '',
  field: '',
};

const EditUserAddress = () => {
  const { user } = useUser();
  const [state, actionFunction] = useActionState(
    handleEditUserAddress,
    initialFormState,
  );

  if (!user) {
    redirect('/sign-in');
  }

  useEffect(() => {
    if (state.status === 'success') {
      toast.success(state.message);
    }

    if (state.status === 'error') {
      toast.error(state.message);
    }
  }, [state.status, state.message]);

  return (
    <Bounded isPadded>
      <h2 className="font-semibold text-fs-500 text-center">Edit Address</h2>
      <Form action={actionFunction} className="flex flex-col gap-y-5">
        <div className="space-y-1">
          <label htmlFor="address1" className="form-label">
            Address 1
          </label>
          <Input type="text" name="address1" id="address1" required />
          {state.status === 'error' && state.field === 'address1' && (
            <p className="form-error-message">{state.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <label htmlFor="address2" className="form-label">
            Address 2
          </label>
          <Input type="text" name="address2" id="address2" />
          {state.status === 'error' && state.field === 'address2' && (
            <p className="form-error-message">{state.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <label htmlFor="city" className="form-label">
            City
          </label>
          <Input type="text" name="city" id="city" required />
          {state.status === 'error' && state.field === 'city' && (
            <p className="form-error-message">{state.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <label htmlFor="state" className="form-label">
            State
          </label>
          <Input type="text" name="state" id="state" required />
          {state.status === 'error' && state.field === 'state' && (
            <p className="form-error-message">{state.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <label htmlFor="zip" className="form-label">
            Zip
          </label>
          <Input type="text" name="zip" id="zip" required />
          {state.status === 'error' && state.field === 'zip' && (
            <p className="form-error-message">{state.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <label htmlFor="country" className="form-label">
            Country
          </label>
          <Input type="text" name="country" id="country" required />
          {state.status === 'error' && state.field === 'country' && (
            <p className="form-error-message">{state.message}</p>
          )}
        </div>

        <SubmitButton>Submit</SubmitButton>
      </Form>
    </Bounded>
  );
};

export default EditUserAddress;
