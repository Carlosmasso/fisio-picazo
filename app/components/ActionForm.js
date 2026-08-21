"use client";

import { useTransition } from "react";
import { toast } from "sonner";

// Deliberately does NOT use useActionState. A successful action here often
// causes its own trigger to unmount before the response arrives (a modal
// that closes on submit, a list row that disappears once revalidated) —
// which would silently drop a result held in that component's state. Firing
// the toast imperatively, from inside the transition itself, survives that.
export default function ActionForm({ action, className, onSubmit, successDuration, children }) {
  const [pending, startTransition] = useTransition();

  function handleAction(formData) {
    startTransition(async () => {
      const result = await action(undefined, formData);
      if (result?.success) toast.success(result.success, { duration: successDuration });
      if (result?.error) toast.error(result.error);
    });
  }

  return (
    <form action={handleAction} onSubmit={onSubmit} className={className}>
      {typeof children === "function" ? children(pending) : children}
    </form>
  );
}
