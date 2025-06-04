// components/LoginForm.tsx
import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";
import type { RegisterType } from "../../types/UserType";

type LoginData = Omit<RegisterType, "name">;

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>();
  const { LoginMutate, isPedingLogin } = useAuth().login;

  const onSubmit = (data: LoginData) => {
    LoginMutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 max-w-md mx-auto"
    >
      <h2 className="text-2xl font-semibold text-center">Welcome back</h2>

      <input
        type="email"
        placeholder="Email"
        {...register("email", { required: "Email is required" })}
        className="w-full border p-2 rounded"
      />
      {errors.email && (
        <p className="text-red-500 text-sm">{errors.email.message}</p>
      )}

      <input
        type="password"
        placeholder="Password"
        {...register("password", { required: "Password is required" })}
        className="w-full border p-2 rounded"
      />
      {errors.password && (
        <p className="text-red-500 text-sm">{errors.password.message}</p>
      )}

      <button
        type="submit"
        disabled={isPedingLogin}
        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 w-full"
      >
        {isPedingLogin ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}
