import { createFileRoute } from '@tanstack/react-router';
import OnboardingPage from '@/components/onboarding/OnboardingPage.tsx';
import {redirectSchema} from "@/routes/login.ts";

export const Route = createFileRoute('/onboarding')({
  component: OnboardingPage,
  validateSearch: (search) => redirectSchema.parse(search),
});
