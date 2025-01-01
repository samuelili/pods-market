import { createLazyFileRoute } from '@tanstack/react-router'
import JoinPodPage from "@/components/join-pod/JoinPodPage.tsx";

export const Route = createLazyFileRoute('/join/$podId')({
  component: JoinPodPage,
});