import { enrichLineItems, retrieveCart } from "@/lib/data/cart";
import { getDictionary } from "@/lib/dictionary";

import CartDropdown from "../cart-dropdown";

const fetchCart = async () => {
  const cart = await retrieveCart();

  if (!cart) {
    return null;
  }

  if (cart?.items?.length) {
    const enrichedItems = await enrichLineItems(cart.items, cart.region_id!);
    cart.items = enrichedItems;
  }

  return cart;
};

export default async function CartButton({
  countryCode,
}: {
  countryCode: string;
}) {
  const [cart, dict] = await Promise.all([
    fetchCart(),
    getDictionary(countryCode),
  ]);

  return <CartDropdown cart={cart} dict={dict} />;
}
