import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";
import type { RegisterType } from "../../types/UserType";
import { Mail, Lock } from "lucide-react";

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
      className="max-w-md mx-auto bg-white p-8 w-[500px] h-110 rounded-2xl shadow-lg space-y-6 border border-gray-200"
    >
      <h2 className="text-3xl font-semibold text-center text-gray-800">
        Welcome back
      </h2>
      <p className="text-center text-gray-500 text-sm">
        Sign in and use more features
      </p>

      {/* Email */}
      <div className="space-y-1">
        <div className="flex items-center gap-2 border rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-black/80">
          <Mail className="h-5 w-5 text-gray-400" />
          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: "Email is required" })}
            className="flex-1 outline-none bg-transparent text-gray-800 placeholder-gray-400"
          />
        </div>
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div className="space-y-1">
        <div className="flex items-center gap-2 border rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-black/80">
          <Lock className="h-5 w-5 text-gray-400" />
          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: "Password is required" })}
            className="flex-1 outline-none bg-transparent text-gray-800 placeholder-gray-400"
          />
        </div>
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isPedingLogin}
        className="w-full py-2 bg-black text-white rounded-md hover:bg-gray-900 transition font-medium"
      >
        {isPedingLogin ? "Logging in..." : "Login"}
      </button>

      <p className="text-center text-sm text-gray-500">
        Don't have an account?{" "}
        <a href="/register" className="text-black font-medium hover:underline">
          Register
        </a>
      </p>
    </form>
  );
}
