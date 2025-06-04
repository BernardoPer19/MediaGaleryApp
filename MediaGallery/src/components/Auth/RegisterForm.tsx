import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";
import type { RegisterType } from "../../types/UserType";
import { Mail, Lock, User } from "lucide-react";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterType>();
  const { registerMutate, isPedingRegister } = useAuth().register;

  const onSubmit = (data: RegisterType) => {
    registerMutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto bg-white p-8 rounded-2xl w-[500px] h-120  shadow-lg space-y-6 border border-gray-200"
    >
      <h2 className="text-3xl font-semibold text-center text-gray-800">
        Create your account
      </h2>
      <p className="text-center text-gray-500 text-sm">
        Sign up to start using MediaGallery
      </p>

      {/* Username */}
      <div className="space-y-1">
        <div className="flex items-center gap-2 border rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-black/80">
          <User className="h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Username"
            {...register("name", { required: "Username is required" })}
            className="flex-1 outline-none bg-transparent text-gray-800 placeholder-gray-400"
          />
        </div>
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

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

      {/* Submit */}
      <button
        type="submit"
        disabled={isPedingRegister}
        className="bg-black text-white py-2 rounded-md w-full hover:bg-gray-800 transition"
      >
        {isPedingRegister ? "Registering..." : "Register"}
      </button>
      <p className="text-center text-sm text-gray-500">
        Do have an account?{" "}
        <a href="/login" className="text-black font-medium hover:underline">
          Login
        </a>
      </p>
    </form>
  );
}
