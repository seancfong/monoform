"use client";
import {
  Form,
  FormButton,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import createWorkspace from "@/lib/actions/workspaces/create-workspace/action";
import {
  createWorkspaceFormSchema,
  CreateWorkspaceFormState,
} from "@/lib/actions/workspaces/create-workspace/schema";
import { useNextForm } from "@/lib/hooks/useNextForm";
import slug from "slug";

type Props = {};

export default function CreateWorkspaceForm({}: Props) {
  const form = useNextForm<
    typeof createWorkspaceFormSchema,
    CreateWorkspaceFormState
  >(createWorkspace, createWorkspaceFormSchema, {
    defaultFields: {
      title: "Untitled Space",
      slug: "untitled-space",
    },
    initialState: {
      error: "",
    },
    mode: "onChange",
  });

  const { setValue } = form.formManager;

  return (
    <div className="grid w-full">
      <Form {...form.formManager}>
        <form action={form.action}>
          <div className="grid gap-4">
            <FormField
              control={form.formManager.control}
              name="title"
              render={({ field }) => (
                <FormItem className="grid">
                  <FormLabel>Workspace Name</FormLabel>
                  <FormControl clearErrorsOnFocus>
                    <Input
                      type="text"
                      placeholder="Untitled Space"
                      className="placeholder:text-zinc-400"
                      {...field}
                      onChange={(e) => {
                        setValue("title", e.target.value);
                        setValue("slug", slug(e.target.value));
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.formManager.control}
              name="slug"
              render={({ field }) => (
                <FormItem className="grid">
                  <FormLabel>Workspace URL</FormLabel>
                  <div className="relative font-mono">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 select-none text-sm text-zinc-300">
                      /workspace/
                    </span>
                    <FormControl clearErrorsOnFocus>
                      <Input
                        type="text"
                        className="pl-[calc(0.75rem+11ch)] placeholder:text-zinc-400"
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormButton type="submit">Create</FormButton>
          </div>
          {form.state.error && (
            <p className="text-red-500">{form.state.error}</p>
          )}
        </form>
      </Form>
    </div>
  );
}
