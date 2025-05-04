import { createLazyFileRoute } from '@tanstack/react-router'
import OnboardingPage from "@/components/onboarding/OnboardingPage.tsx";

export const Route = createLazyFileRoute('/onboarding')({
  component: OnboardingPage,
})