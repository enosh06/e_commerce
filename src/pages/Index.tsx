import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { ShoppingCart, Store, Loader2 } from "lucide-react";
import { CartDrawer } from "@/components/CartDrawer";
import { useCartStore } from "@/stores/cartStore";
import { ShopifyProduct, fetchProducts } from "@/lib/shopify";
import { toast } from "sonner";

const Index = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore(state => state.addItem);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts(20);
        setProducts(data);
      } catch (error) {
        console.error('Error loading products:', error);
        toast.error('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const handleAddToCart = (product: ShopifyProduct) => {
    const variant = product.node.variants.edges[0].node;
    const cartItem = {
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions
    };

    addItem(cartItem);
    toast.success("Added to cart", {
      description: `${product.node.title} has been added to your cart`
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
              <Store className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold">My Store</h1>
          </div>
          <CartDrawer />
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Welcome to Our Store
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover amazing products at great prices
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-6">
              <Store className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="text-2xl font-bold mb-2">No products found</h3>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Your store is empty. Create your first product by telling me what you'd like to sell!
            </p>
            <div className="bg-card border rounded-lg p-6 max-w-md mx-auto">
              <p className="text-sm text-muted-foreground mb-2">Example:</p>
              <p className="text-sm font-medium">"Create a product called 'Premium T-Shirt' priced at $29.99"</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <Card key={product.node.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <Link to={`/product/${product.node.handle}`}>
                  <CardHeader className="p-0">
                    <div className="aspect-square bg-muted overflow-hidden">
                      <img
                        src={product.node.images.edges[0]?.node.url || '/placeholder.svg'}
                        alt={product.node.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </CardHeader>
                </Link>
                <CardContent className="p-4">
                  <Link to={`/product/${product.node.handle}`}>
                    <h3 className="font-semibold text-lg mb-2 hover:text-primary transition-colors line-clamp-1">
                      {product.node.title}
                    </h3>
                  </Link>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                    {product.node.description}
                  </p>
                  <p className="text-xl font-bold text-primary">
                    {product.node.priceRange.minVariantPrice.currencyCode}{' '}
                    {parseFloat(product.node.priceRange.minVariantPrice.amount).toFixed(2)}
                  </p>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button
                    className="w-full"
                    onClick={() => handleAddToCart(product)}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
