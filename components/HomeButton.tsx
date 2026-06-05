import { Link } from "@tanstack/react-router";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Props {
  confirm?: boolean;
  onConfirm?: () => void;
}

export function HomeButton({ confirm, onConfirm }: Props) {
  if (!confirm) {
    return (
      <Button asChild variant="ghost" size="sm" className="gap-1">
        <Link to="/">
          <Home className="w-4 h-4" /> Hauptmenü
        </Link>
      </Button>
    );
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-1">
          <Home className="w-4 h-4" /> Hauptmenü
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Spiel wirklich verlassen?</AlertDialogTitle>
          <AlertDialogDescription>
            Du kannst es später über „Letztes Spiel fortsetzen" wieder starten.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Abbrechen</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Verlassen</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
