import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';

type DialogProps = {
  children: React.ReactNode;
  title: string;
  description: string;
  action: () => Promise<void>;
};

export function ConfirmDialog({
  children,
  title,
  description,
  action,
}: DialogProps) {
  const [open, setOpen] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    action();
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <form onSubmit={handleSubmit}>
            <Button type="submit">Confirm</Button>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
