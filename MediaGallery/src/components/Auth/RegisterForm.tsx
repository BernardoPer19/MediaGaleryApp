// components/RegisterForm.tsx
import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";
import type { RegisterType } from "../../types/UserType";

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
      className="space-y-4 max-w-md mx-auto"
    >
      <h2 className="text-2xl font-semibold text-center">
        Create your account
      </h2>

      <input
        type="text"
        placeholder="Username"
        {...register("name", { required: "Username is required" })}
        className="w-full border p-2 rounded"
      />
      {errors.name && (
        <p className="text-red-500 text-sm">{errors.name.message}</p>
      )}

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
        disabled={isPedingRegister}
        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 w-full"
      >
        {isPedingRegister ? "Registering..." : "Register"}
      </button>
    </form>
  );
}
