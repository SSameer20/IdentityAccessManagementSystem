import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { User } from "../../lib/helper";

export default function Auth() {
  const { register, handleSubmit, reset } = useForm<User>();

  const handleLogin = (data: User) => {
    console.log(data);
    reset();
  };

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="h-auto w-[30vw] border-2 border-white rounded-[10px] flex flex-col px-5 gap-5 py-10 justify-center">
        <span className="text-3xl font-bold">Login</span>
        <Input
          type="email"
          label="Email"
          placeholder="Enter your email"
          {...register("email", { required: true })}
        />
        <Input
          type="password"
          label="Password"
          placeholder="Enter your Password"
          {...register("password", { required: true })}
        />

        <select
          id="role"
          className="p-[10px] rounded-[10px]"
          {...register("role")}
        >
          <option value="user">User</option>
          <option value="moderator">Moderator</option>
          <option value="admin">Admin</option>
        </select>

        <Button variant="ghost" onClick={handleSubmit(handleLogin)}>
          Login
        </Button>
      </div>
    </div>
  );
}
