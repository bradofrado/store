import { redirect } from 'next/navigation';
import { accountTabs } from './tabs';
import { protectedAdminPage } from '@/utils/protected-admin';

function AccountsPage() {
  redirect(accountTabs[0].href);
}

export default protectedAdminPage(AccountsPage);
