'use client';

import { handleEditUserProfile } from '@/actions/edit-user-profile';
import Bounded from '@/components/Bounded';
import SubmitButton from '@/components/SubmitButton';
import { Input } from '@/components/ui/input';
import Form from 'next/form';
import { useActionState } from 'react';

const initialFormState = {
  status: '',
  message: '',
  field: '',
};

const EditProfilePage = () => {
  const [state, actionFunction] = useActionState(
    handleEditUserProfile,
    initialFormState,
  );

  return (
    <Bounded isPadded>
      <h2 className="font-semibold text-center">Update Profile</h2>

      <Form action={actionFunction} className="flex flex-col gap-y-5">
        <div className="space-y-1">
          <label htmlFor="user-profile-firstname" className="form-label">
            First Name
          </label>
          <Input type="text" name="firstname" id="user-profile-firstname" />
        </div>

        <div className="space-y-1">
          <label htmlFor="user-profile-lastname" className="form-label">
            Last Name
          </label>
          <Input type="text" name="lastname" id="user-profile-lastname" />
        </div>

        <div className="space-y-1">
          <label htmlFor="user-profile-email" className="form-label">
            Email
          </label>
          <Input type="email" name="email" id="user-profile-email" />
        </div>

        <div className="space-y-1">
          <label htmlFor="user-profile-imageurl" className="form-label">
            Profile Photo
          </label>
          <Input
            type="file"
            name="imageUrl"
            id="user-profile-imageurl"
            className="border h-20 cursor-pointer"
            accept="image/*"
          />
        </div>

        <SubmitButton>Change</SubmitButton>
      </Form>
    </Bounded>
  );
};

export default EditProfilePage;
