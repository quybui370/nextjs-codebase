"use client";

import { useActionState } from "react";
import { submitLoginAction } from "../actions";

const intialState = {
  errors: {
    name: [],
    email: [],
    password: [],
  },
};

export default function ServerComponent() {
  const [state, loginAction] = useActionState(submitLoginAction, intialState);
  return (
    <form action={loginAction} className="flex flex-col gap-2">
      <input type="text" name="name" placeholder="Name" />
      {state.errors &&
        state.errors.name &&
        state.errors.name.map((name) => (
          <p className="text-red-500" key={name}>
            {name}
          </p>
        ))}
      <input type="text" name="email" placeholder="Email" />
      {state.errors &&
        state.errors.email &&
        state.errors.email.map((email) => (
          <p className="text-red-500" key={email}>
            {email}
          </p>
        ))}
      <input type="password" name="password" placeholder="Password" />
      {state.errors &&
        state.errors.password &&
        state.errors.password.map((password) => (
          <p className="text-red-500" key={password}>
            {password}
          </p>
        ))}
      <button type="submit">Submit</button>
    </form>
  );
}
