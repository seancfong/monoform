import { signup } from "@/actions/auth";

export default async function Page() {
  return (
    <>
      <h1>Create an account</h1>
      <form action={signup}>
        <label htmlFor="email">email</label>
        <input name="email" id="email" />
        <br />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
        <br />
        <button>Continue</button>
      </form>
    </>
  );
}
