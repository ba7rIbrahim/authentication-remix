import { ActionFunction } from "@remix-run/node";
import { Form, Link, useActionData, useNavigate } from "@remix-run/react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import Layout from "~/components/layout/layout";
import { generateToken, verifyPassword } from "~/utils/auth.server";
import { authCookie } from "~/utils/cookies.server";
import { getUserByEmail } from "~/utils/db.server";

export const action: ActionFunction = async ({ request }) => {
  try {
    const formData = await request.formData();
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password)
      return { error: "Email and password are required", status: 400 };

    const user = await getUserByEmail(email);
    if (!user || !(await verifyPassword(password, user.password)))
      return { error: "Invalid email or password", status: 400 };

    const token = generateToken(user.id);
    return {
      success: true,
      status: 200,
      headers: {
        "Set-Cookie": await authCookie.serialize(token),
      },
    };
  } catch (error) {
    return { error: "Something went wrong", status: 500 };
  }
};

function Login() {
  const actionData = useActionData<typeof action>();
  const navigate = useNavigate();

  useEffect(() => {
    if (actionData?.error) {
      toast.error(actionData.error);
    } else if (actionData?.success) {
      toast.success("Login successful!");
      navigate("/", { replace: true });
    }
    console.log("actions=>", actionData);
  }, [actionData, navigate]);

  return (
    <Layout>
      <div className="h-full justify-center items-center flex flex-col gap-y-5">
        <Form method="post" className="rounded-2xl bg-white p-6 w-96">
          <h2 className="text-3xl font-extrabold text-black-600 mb-5">Login</h2>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-gray-600 font-semibold">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-2 rounded-xl my-2 border border-gray-300"
            />
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
              className="w-full rounded-xl mt-2 bg-teal-500 px-3 py-2 text-white font-semibold transition duration-300 ease-in-out hover:bg-red-600"
            >
              Login
            </button>
          </div>
        </Form>
        <p className="text-gray-600">
          Dont have an account?
          <Link to="/sign-up">
            <span className="text-teal-600 px-2 underline">Signup</span>
          </Link>
        </p>
      </div>
    </Layout>
  );
}

export default Login;
