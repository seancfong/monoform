"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFormState } from "react-dom";
import { useForm, UseFormReturn } from "react-hook-form";
import { z, ZodObject, ZodSchema } from "zod";

interface UseNextFormOptions<Schema extends ZodObject<any>, State> {
  defaultFields: Partial<z.infer<Schema>>;
  initialState: Awaited<State>;
  mode?: "onBlur" | "onChange" | "onSubmit" | "onTouched";
}

interface UseNextFormReturn<State> {
  formManager: UseFormReturn;
  action: (formData: FormData) => void;
  state: Awaited<State>;
}

export function useNextForm<Schema extends ZodObject<any>, State>(
  action: (state: State, formData: FormData) => Promise<State>,
  schema: ZodSchema,
  options: UseNextFormOptions<Schema, State>,
): UseNextFormReturn<State> {
  const formManager = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: options.defaultFields,
    mode: options.mode,
  });

  const [formState, formAction] = useFormState(action, options.initialState);

  return {
    action: formAction,
    state: formState,
    formManager,
  };
}
