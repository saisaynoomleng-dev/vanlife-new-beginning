'use client';

import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { FaApple, FaEye, FaEyeSlash, FaGithub, FaGoogle } from 'react-icons/fa';
import { ClerkAPIError, OAuthStrategy } from '@clerk/types';
import { useSignIn, useSignUp } from '@clerk/nextjs';
import { isClerkAPIResponseError } from '@clerk/nextjs/errors';
import { Input } from '@/components/ui/input';
import SubmitButton from '@/components/SubmitButton';
import { useRouter } from 'next/navigation';
import Bounded from '@/components/Bounded';

const SignUpPage = () => {
  const { signUp, setActive, isLoaded } = useSignUp();
  const { isLoaded: signInLoaded, signIn } = useSignIn();

  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmedPassword, setShowConfirmedPassword] =
    useState<boolean>(false);
  const [code, setCode] = useState<string>('');
  const [errors, setErrors] = useState<ClerkAPIError[]>();
  const [emailCode, setEmailCode] = useState<boolean>(false);
  const router = useRouter();

  const handleOAuth = async (strategy: OAuthStrategy) => {
    if (!signInLoaded) return;
    setErrors(undefined);

    try {
      await signIn.authenticateWithRedirect({
        strategy,
        redirectUrl: '/sso-callback',
        redirectUrlComplete: '/',
      });
    } catch (error: any) {
      if (isClerkAPIResponseError(error)) setErrors(error.errors);
    }
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setErrors(undefined);

    if (!isLoaded) return;

    if (password !== confirmPassword) {
      setErrors([
        {
          longMessage: 'Passwords do not match.',
          code: 'form_error_custom',
        } as any,
      ]);
      return;
    }

    try {
      await signUp.create({
        firstName,
        lastName,
        emailAddress: email,
        password,
      });

      await signUp.prepareEmailAddressVerification({
        strategy: 'email_code',
      });

      setEmailCode(true);
    } catch (error: any) {
      if (isClerkAPIResponseError(error)) setErrors(error.errors);
    }
  };

  const handleEmailCode = async (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (signUpAttempt.status === 'complete') {
        await setActive({
          session: signUpAttempt.createdSessionId,
        });

        router.push('/');
      } else {
        console.error('Sing Up attempt not complete', signUpAttempt);
        console.error('Sing Up attempt status', signUpAttempt.status);
      }
    } catch (error: any) {
      if (isClerkAPIResponseError(error)) setErrors(error.errors);
    }
  };

  return emailCode ? (
    <Bounded className="flex flex-col justify-center items-center">
      <h2 className="font-semibold text-fs-500">Verify your email</h2>
      <p className="font-medium">
        A verification code has been sent to your email.
      </p>
      <form onSubmit={handleEmailCode} className="flex flex-col gap-y-5">
        <div className="space-y-1">
          <label htmlFor="code" className="form-label">
            Enter verification code
          </label>
          <Input
            onChange={(e) => setCode(e.target.value)}
            id="code"
            name="code"
            type="text"
            inputMode="numeric"
            value={code}
            autoComplete="one-time-code"
          />
        </div>
        <SubmitButton>Verify</SubmitButton>
      </form>
    </Bounded>
  ) : (
    <form
      className="py-5 px-5 md:px-8 lg:px-10 flex flex-col max-w-100 mx-auto gap-y-10 shadow my-10"
      onSubmit={handleSubmit}
    >
      <h2 className="font-semibold text-fs-500 text-center mb-10">Sign Up</h2>

      <div className="grid grid-cols-3 place-items-center">
        <div>
          <Button
            type="button"
            variant="oauth"
            onClick={() => handleOAuth('oauth_github')}
          >
            <FaGithub className="group-hover:text-white" />
          </Button>
        </div>

        <div>
          <Button
            type="button"
            variant="oauth"
            onClick={() => handleOAuth('oauth_google')}
          >
            <FaGoogle className="group-hover:text-white" />
          </Button>
        </div>

        <div>
          <Button
            type="button"
            variant="oauth"
            onClick={() => handleOAuth('oauth_apple')}
          >
            <FaApple className="group-hover:text-white" />
          </Button>
        </div>
      </div>

      <div className="divider"></div>

      <div className="space-y-1">
        <label htmlFor="sign-up-first-name" className="form-label">
          Frist Name
        </label>
        <Input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          id="sign-up-first-name"
          placeholder="John Doe"
          autoComplete="first name"
          required
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="sign-up-last-name" className="form-label">
          Last Name
        </label>
        <Input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          id="sign-up-last-name"
          placeholder="John Doe"
          autoComplete="last name"
          required
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="sign-up-email" className="form-label">
          Email
        </label>
        <Input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="sign-up-email"
          placeholder="johndoe@example.com"
          autoComplete="email"
          required
        />
      </div>

      <div className="space-y-1 relative">
        <label htmlFor="sign-up-password" className="form-label">
          Password
        </label>
        <Input
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="sign-up-password"
          required
        />
        <div className="absolute right-2 top-[50%]">
          {showPassword ? (
            <button type="button" onClick={() => setShowPassword(false)}>
              <FaEyeSlash className="text-brand-black-200" />
            </button>
          ) : (
            <button type="button" onClick={() => setShowPassword(true)}>
              <FaEye className="text-brand-black-200" />
            </button>
          )}
        </div>
      </div>

      <div className="space-y-1 relative">
        <label htmlFor="sign-up-confirm-password" className="form-label">
          Confirm Password
        </label>
        <Input
          type={showConfirmedPassword ? 'text' : 'password'}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          id="sign-up-confirm-password"
          required
        />
        <div className="absolute right-2 top-[50%]">
          {showConfirmedPassword ? (
            <button
              type="button"
              onClick={() => setShowConfirmedPassword(false)}
            >
              <FaEyeSlash className="text-brand-black-200" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setShowConfirmedPassword(true)}
            >
              <FaEye className="text-brand-black-200" />
            </button>
          )}
        </div>
      </div>

      {password !== confirmPassword ? (
        <p className="form-error-message">Password doesn&apos;t match</p>
      ) : null}

      <div id="clerk-captcha"></div>

      {errors && (
        <ul>
          {errors.map((el, i) => (
            <li key={i} className="form-error-message">
              {el.longMessage}
            </li>
          ))}
        </ul>
      )}

      <SubmitButton>Submit</SubmitButton>
    </form>
  );
};

export default SignUpPage;
