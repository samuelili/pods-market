import { createLazyFileRoute } from '@tanstack/react-router'
import Card from '@/components/card/Card.tsx'
import SettingsPage from "@/components/settings/SettingsPage.tsx";

export const Route = createLazyFileRoute('/_authenticated/settings/')({
  component: SettingsPage,
})