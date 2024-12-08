import { ActionFunction } from "@remix-run/node";
import { Form, Link, redirect, useActionData } from "@remix-run/react";
import AuthLayout from "~/layouts/auth-layout";
import { generateToken, hashPassword } from "~/utils/auth.server";
import { authCookie } from "~/utils/cookies.server";
import { createUser, getUserByEmail } from "~/utils/db.server";

export const action: ActionFunction = async ({ request }) => {
  try {
    const formData = await request.formData();
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!name || !email || !password)
      return { error: "All fields are required.", status: 400 };

    const existingUser = await getUserByEmail(email);
    if (existingUser) return { error: "Email is already taken.", status: 400 };

    const passwordHash = await hashPassword(password);

    const newUser = await createUser(name, email, passwordHash);
    const session = await authCookie.getSession();
    session.get("userId", newUser.id);
    return redirect("/", {
      headers: {
        "Set-Cookie": await authCookie.commitSession(session)
      }
    })
  } catch (error) {
    return {
      error: "Something went error",
      status: 500,
      fields: {
        email: (await request.formData()).get("email"),
        password: (await request.formData()).get("password"),
      },
    };
  }
};

function Signup() {
  const actionData = useActionData();
  console.log(actionData);
  return (
    <AuthLayout>
      <div className="h-full justify-center items-center flex flex-col gap-y-5">
        <Form
          method="post"
          className="rounded-2xl bg-white p-6 w-[350px] md:w-96"
        >
          <h2 className="text-3xl font-extrabold text-black-600 mb-5">
            Create an account
          </h2>
          <div>
            <label htmlFor="name" className="text-gray-600 font-semibold">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full p-2 rounded-xl my-2 border border-gray-300"
            />
          </div>
          <div>
            <label htmlFor="email" className="text-gray-600 font-semibold">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-2 rounded-xl my-2 border border-gray-300"
            />
          </div>
          <div>
            <label htmlFor="password" className="text-gray-600 font-semibold">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full p-2 rounded-xl my-2 border border-gray-300"
            />
          </div>

          <div className="w-full text-center mt-5">
            <button
              type="submit"
              name="_action"
              value="Sign In"
              className="w-full rounded-xl mt-2 bg-teal-500 px-3 py-2 text-white font-semibold transition duration-300 ease-in-out hover:bg-teal-600"
            >
              Create an account
            </button>
          </div>
        </Form>
        <p className="text-gray-600">
          Already have an account?
          <Link to="/sign-in">
            <span className="text-teal-600 px-2 underline">Sign In</span>
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}

export default Signup;
