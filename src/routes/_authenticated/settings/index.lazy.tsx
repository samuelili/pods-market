import { createLazyFileRoute } from '@tanstack/react-router';
import SettingsPage from '@/components/settings/SettingsPage.tsx';

export const Route = createLazyFileRoute('/_authenticated/settings/')({
  component: SettingsPage,
});