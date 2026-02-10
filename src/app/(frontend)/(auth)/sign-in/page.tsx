'use client';

import SubmitButton from '@/components/SubmitButton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { FaApple, FaEye, FaEyeSlash, FaGithub, FaGoogle } from 'react-icons/fa';
import { useSignIn } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { ClerkAPIError, OAuthStrategy } from '@clerk/types';
import { isClerkAPIResponseError } from '@clerk/nextjs/errors';
import Link from 'next/link';

const SignInPage = () => {
  const { isLoaded, signIn, setActive } = useSignIn();
  const router = useRouter();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errors, setErrors] = useState<ClerkAPIError[]>();

  if (!isLoaded) return null;

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setErrors(undefined);

    if (!isLoaded) return;

    try {
      const signInAttempt = await signIn.create({
        identifier: email,
        password,
      });

      if (signInAttempt.status === 'complete') {
        await setActive({
          session: signInAttempt.createdSessionId,
        });

        router.push('/');
      }
    } catch (error: any) {
      if (isClerkAPIResponseError(error)) setErrors(error.errors);
    }
  };

  const handleOAuth = async (strategy: OAuthStrategy) => {
    if (!isLoaded) return;
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

  return (
    <form
      className="py-5 px-5 md:px-8 lg:px-10 flex flex-col max-w-100 mx-auto gap-y-10 shadow"
      onSubmit={handleSubmit}
    >
      <h2 className="font-semibold text-fs-500 text-center mb-10">Sign In</h2>

      <div className="grid grid-cols-3 gap-y-5 gap-x-5 place-items-center">
        <div>
          <Button
            variant="oauth"
            type="button"
            onClick={() => handleOAuth('oauth_github')}
          >
            <FaGithub className="group-hover:text-white" />
          </Button>
        </div>

        <div>
          <Button
            variant="oauth"
            type="button"
            onClick={() => handleOAuth('oauth_google')}
          >
            <FaGoogle className="group-hover:text-white" />
          </Button>
        </div>

        <div>
          <Button
            variant="oauth"
            type="button"
            className="place-self-end"
            onClick={() => handleOAuth('oauth_apple')}
          >
            <FaApple className="group-hover:text-white" />
          </Button>
        </div>
      </div>

      <div className="divider"></div>

      <div className="space-y-1">
        <label htmlFor="sign-in-email" className="form-label">
          Email
        </label>
        <Input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="sign-in-email"
          placeholder="johndoe@example.com"
          autoComplete="email"
          required
        />
      </div>

      <div className="space-y-1 relative">
        <label htmlFor="sign-in-password" className="form-label">
          Password
        </label>
        <Input
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="sign-in-password"
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

      <p className="text-fs-300">
        Don&apos;t have an account yet?{' '}
        <Link
          href="/sign-up"
          className="text-brand-orange-400 underline font-semibold"
        >
          Sign Up
        </Link>
      </p>
    </form>
  );
};

export default SignInPage;
