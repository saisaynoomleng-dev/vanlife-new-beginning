import { AuthenticateWithRedirectCallback } from '@clerk/nextjs';

const SSOCallbackPage = () => {
  return (
    <>
      <AuthenticateWithRedirectCallback />

      <div id="clerk-captcha"></div>
    </>
  );
};

export default SSOCallbackPage;
