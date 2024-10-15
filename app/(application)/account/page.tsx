import { redirect } from 'next/navigation';
import { accountTabs } from './tabs';

export default function AccountsPage() {
  redirect(accountTabs[0].href);
}
