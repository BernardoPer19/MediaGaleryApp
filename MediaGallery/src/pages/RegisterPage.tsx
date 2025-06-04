import { Toaster } from "sonner";
import RegisterForm from "../components/Auth/RegisterForm";

function RegisterPage() {
  return (
    <main className="flex justify-center items-center h-screen w-full">
      <Toaster />
      <RegisterForm />
    </main>
  );
}

export default RegisterPage;
