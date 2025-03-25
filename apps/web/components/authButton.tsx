"use client"; // This must be a client component

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { signOutAction } from "@/lib/actions";

export default function AuthButton() {
    const router = useRouter();

    async function handleSignOut() {
        await signOutAction(); // Calls the server action to sign out
        router.refresh(); // Forces a UI update
    }

    return <Button onClick={handleSignOut}>Sign Out</Button>;
}
