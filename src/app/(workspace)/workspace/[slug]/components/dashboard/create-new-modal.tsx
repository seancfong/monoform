"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import createForm from "@/lib/actions/forms/create-form/action";
import {
  createFormSchema,
  CreateFormState,
} from "@/lib/actions/forms/create-form/schema";
import { useNextForm } from "@/lib/hooks/useNextForm";
import { UserWorkspaceFolder } from "@/lib/queries/workspaces";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown, FolderOpen } from "lucide-react";
import { use } from "react";

type Props = {
  workspaceFoldersPromise: Promise<UserWorkspaceFolder[]>;
};

export default function CreateNewModal({ workspaceFoldersPromise }: Props) {
  const workspaceFolders = use(workspaceFoldersPromise);

  const form = useNextForm<typeof createFormSchema, CreateFormState>(
    createForm,
    createFormSchema,
    {
      defaultFields: {
        "folder-id": "",
        name: "",
      },
      initialState: {
        error: "",
      },
      mode: "onBlur",
    },
  );

  return (
    <DialogContent className="mx-auto w-[calc(100vw-2rem)] rounded-md lg:gap-0">
      <DialogHeader className="text-left">
        <DialogTitle>Create a new form</DialogTitle>
        <DialogDescription>Select a folder and enter a name.</DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-2">
        <Form {...form.formManager}>
          <form action={form.action}>
            <div className="grid gap-4 lg:grid-cols-5 lg:gap-x-2">
              <FormField
                control={form.formManager.control}
                name="folder-id"
                render={({ field }) => (
                  <FormItem className="flex flex-col lg:col-span-2">
                    <FormLabel className="lg:sr-only">Folder</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "justify-between px-3",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            <span className="flex items-center gap-2 text-zinc-600">
                              <FolderOpen className="size-4" />
                              {field.value ? (
                                workspaceFolders.find(
                                  (folder) => folder.id === field.value,
                                )?.title
                              ) : (
                                <span className="opacity-50">
                                  Select Folder
                                </span>
                              )}
                            </span>
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0" align="start">
                        <Command>
                          <CommandInput placeholder="Search folders" />
                          <CommandList>
                            <CommandEmpty>No folder found.</CommandEmpty>
                            <CommandGroup>
                              {workspaceFolders.map((folder) => (
                                <CommandItem
                                  key={folder.id}
                                  value={folder.title}
                                  onSelect={() => {
                                    form.formManager.setValue(
                                      "folder-id",
                                      folder.id,
                                    );
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      folder.id === field.value
                                        ? "opacity-100"
                                        : "opacity-0",
                                    )}
                                  />
                                  {folder.title}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <Input type="text" {...field} className="hidden" />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.formManager.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="grid lg:col-span-3">
                    <FormLabel className="lg:sr-only">Name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        className="placeholder:text-zinc-400"
                        placeholder="Untitled Form"
                        {...field}
                      />
                    </FormControl>
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
    </DialogContent>
  );
}
