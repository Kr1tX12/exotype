import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import React, { ReactNode, useState } from "react";

export const SettingButton = ({
  title,
  description,
  children,
  Icon,
  variant,
  onClick,
  warning = false,
  warningText = "Подтверждение",
  textToConfirm = "ПОДТВЕРДИТЬ",
}: {
  title: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  Icon: React.ComponentType<{ size: number }>;
  variant:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
  warning?: boolean;
  warningText?: string;
  textToConfirm?: string;
  onClick: () => Promise<{ success: boolean; error?: string }>;
}) => {
  const [open, setOpen] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();

  const handleConfirm = async () => {
    if (confirmText === textToConfirm) {
      setIsLoading(true);
      setError(undefined);
      const result = await onClick();
      if (!result.success) {
        setError(result.error);
        setIsLoading(false);
        return;
      }
      setIsLoading(false);
      setOpen(false);
      setConfirmText("");
    }
  };

  return (
    <div className="flex gap-4 justify-between w-full">
      <Icon size={48} />
      <div className="flex gap-12 items-center">
        <div className="flex flex-col">
          <h1 className="text-2xl font-medium">{title}</h1>
          <p className="text-muted-foreground">{description}</p>
        </div>
        {warning ? (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant={variant}>{children}</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{warningText}</DialogTitle>
                <DialogDescription>
                  Пожалуйста, введите <strong>{textToConfirm}</strong> для
                  продолжения.
                </DialogDescription>
              </DialogHeader>
              <Input
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                placeholder={textToConfirm}
                className="mb-4"
              />
              {error && <p className="text-destructive text-right">{error}</p>}
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => {
                    setOpen(false);
                    setConfirmText("");
                  }}
                >
                  Отмена
                </Button>
                <Button
                  disabled={confirmText !== textToConfirm || isLoading}
                  variant={variant}
                  onClick={handleConfirm}
                >
                  {isLoading && <Loader2 className="animate-spin" />}
                  {confirmText}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        ) : (
          <Button variant={variant} onClick={onClick}>
            {children}
          </Button>
        )}
      </div>
    </div>
  );
};
