import { zodResolver } from "@hookform/resolvers/zod";
import { RefObject, useRef, useState } from "react";
import { useFormState } from "react-dom";
import { useForm, UseFormReturn } from "react-hook-form";
import { z, ZodObject, ZodSchema } from "zod";

interface UseNextFormOptions<Schema extends ZodObject<any>, State> {
  defaultFields: Partial<z.infer<Schema>>;
  initialState: Awaited<State>;
}

interface UseNextFormReturn<State> {
  formManager: UseFormReturn;
  ref: RefObject<HTMLFormElement>;
  isPending: boolean;
  action: (formData: FormData) => void;
  state: Awaited<State>;
  onSubmit: (e: React.SyntheticEvent) => void;
}

export function useNextForm<Schema extends ZodObject<any>, State>(
  action: (formData: FormData) => Promise<State>,
  schema: ZodSchema,
  options: UseNextFormOptions<Schema, State>,
): UseNextFormReturn<State> {
  const [isPending, setIsPending] = useState(false);
  const ref = useRef<HTMLFormElement>(null);

  const formManager = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: options.defaultFields,
  });

  const [formState, formAction] = useFormState(
    async (_: any, formData: FormData) => {
      const result = await action(formData);
      setIsPending(false);
      return result;
    },
    options.initialState,
  );

  const onSubmit = async (e: React.SyntheticEvent) => {
    setIsPending(true);

    formManager.handleSubmit(
      // on valid client-side form
      async () => {
        await formAction(new FormData(ref.current!));
      },
      // on invalid client-side form
      () => {
        setIsPending(false);
      },
    )(e);
  };

  return {
    action: formAction,
    state: formState,
    formManager,
    ref,
    isPending,
    onSubmit,
  };
}
