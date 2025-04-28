import { getCustomer } from "@/lib/data/customer";
import AccountLayout from "@/components/account/_templates/account-layout";

export default async function AccountPageLayout({
  dashboard,
  login,
}: {
  dashboard?: React.ReactNode;
  login?: React.ReactNode;
}) {
  const customer = await getCustomer().catch(() => null);

  return (
    <AccountLayout customer={customer}>
      {customer ? dashboard : login}
    </AccountLayout>
  );
}
