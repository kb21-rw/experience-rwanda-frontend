import { Label } from '@/components/ui/Label';
import { UseFormRegister } from 'react-hook-form';
import { z } from 'zod';
import { loginSchema } from '@/utils/schemas/loginSchema';

type FormData = z.infer<typeof loginSchema>;

interface RememberMeProps {
  register: UseFormRegister<FormData>;
}

export const RememberMe = ({ register }: RememberMeProps) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center">
      <input
        id="rememberMe"
        type="checkbox"
        {...register("rememberMe")}
        className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black"
      />
      <Label htmlFor="rememberMe" className="ml-2 text-gray-900">
        Remember Me
      </Label>
    </div>
    <div>
      <a href="#" className="text-black hover:text-gray-700">
        Forget password?
      </a>
    </div>
  </div>
);