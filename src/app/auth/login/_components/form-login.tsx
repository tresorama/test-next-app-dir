'use client';

// import {
//   AtSymbolIcon,
//   KeyIcon,
//   ExclamationCircleIcon,
// } from '@heroicons/react/24/outline';
// import { ArrowRightIcon } from '@heroicons/react/20/solid';
// import { Button } from '@/app/ui/button';
import { useFormState, useFormStatus } from 'react-dom';
import { loginWithCredentials } from './form-login.action';
import { InputHTMLAttributes } from 'react';
import { cn } from '@/utils/cn';


const Input = (props: InputHTMLAttributes<HTMLInputElement>) => (
  <input
    {...props}
    className={cn(
      "peer block w-full rounded-md border border-gray-200 py-[.5em] pl-10 text-sm outline-2 text-black placeholder:text-gray-500",
      props.className
    )}
  />
);

const SUCCESSFULL_DEV_CREDENTIALS = {
  username: 'luke',
  password: "hhhh",
};

export const LoginForm = () => {
  const [errorMessage, dispatch] = useFormState(loginWithCredentials, undefined);

  return (
    <form action={dispatch} className="space-y-3">
      <div className="flex-1 rounded-lg bg-neutral-900 px-6 pb-4 pt-8">
        <h1 className="mb-3 text-2xl">
          Please log in to continue.
        </h1>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium"
              htmlFor="email"
            >
              Username
            </label>
            <div className="relative">
              <Input
                id="username"
                type="text"
                name="username"
                placeholder="Enter your username"
                required
                defaultValue={SUCCESSFULL_DEV_CREDENTIALS.username}
              />
              {/* <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" /> */}
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium "
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <Input
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
                defaultValue={SUCCESSFULL_DEV_CREDENTIALS.password}
              />
              {/* <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" /> */}
            </div>
          </div>
        </div>
        <LoginButton />
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
            <>
              {/* <ExclamationCircleIcon className="h-5 w-5 text-red-500" /> */}
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )}
        </div>
      </div>
    </form>
  );
};

function LoginButton() {
  const { pending } = useFormStatus();
  return (
    <button className="mt-4 w-full border p-3" aria-disabled={pending}>
      Log in{/*  <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" /> */}
    </button>
  );
}