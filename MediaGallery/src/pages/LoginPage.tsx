import { Toaster } from "sonner";
import LoginForm from "../components/Auth/LoginForm";

function LoginPage() {
  return (
    <main className="flex justify-center items-center h-screen w-full">
      <Toaster
        theme="dark"
        closeButton
        position="top-right"
        className="bg-red-300"
      />
      <LoginForm />
    </main>
  );
}

export default LoginPage;
