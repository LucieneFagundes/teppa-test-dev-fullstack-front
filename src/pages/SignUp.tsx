import { Formik, Form, Field } from "formik";
import { LoginOutline } from "heroicons-react";
import { Toast } from "primereact/toast";
import { Messages } from "primereact/messages";
import { useContext, useRef } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Logo from "../assets/logo.png";

interface ISingUp {
  email: string;
  password: string;
  passwordConfirm: string;
}

export default function SignUp() {
  const { signUp } = useContext(AuthContext);
  const toast = useRef(null);
  const messages = useRef(null);

  const initialValues = {
    email: "",
    password: "",
    passwordConfirm: "",
  };

  async function handleSignUp({ email, password, passwordConfirm }: ISingUp) {
    try {
      if (password !== passwordConfirm) {
        return toast.current.show({
          life: 4000,
          severity: "warn",
          summary: `Atenção: `,
          detail: `Senhas diferentes`,
        });
      }
      await signUp({ email, password });
    } catch (err) {
      toast.current.show({
        life: 4000,
        severity: "error",
        summary: "Error",
        detail: `${err.response.data}`,
      });
    }
  }

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img className="mx-auto h-28 w-auto" src={Logo} alt="Workflow" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Cadastre-se
          </h2>
        </div>
        <Formik initialValues={initialValues} onSubmit={handleSignUp}>
          <Form className="mt-8 space-y-6" action="#" method="POST">
            <Messages ref={messages}></Messages>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md space-y-2">
              <div>
                <label htmlFor="email-address" className="sr-only" />
                <Field
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                  placeholder="E-mail"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only" />
                <Field
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                  placeholder="Senha"
                />
              </div>
              <div>
                <label htmlFor="passwordConfirm" className="sr-only" />
                <Field
                  id="passwordConfirm"
                  name="passwordConfirm"
                  type="password"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                  placeholder="Confirmação de senha"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LoginOutline
                    className="h-5 w-5 text-green-500 group-hover:text-green-400"
                    aria-hidden="true"
                  />
                </span>
                Cadastrar-me
              </button>
            </div>
            <div className="flex items-center justify-end">
              <div className="text-sm">
                <button className="btn border-b-2">
                  <a
                    href="/signin"
                    className="font-medium text-green-600 hover:text-green-500"
                  >
                    Entrar com conta existente
                  </a>
                </button>
              </div>
            </div>
          </Form>
        </Formik>
        <Toast ref={toast} />
      </div>
    </div>
  );
}
