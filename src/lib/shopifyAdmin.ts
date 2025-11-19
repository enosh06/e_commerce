const SHOPIFY_API_VERSION = '2025-07';
const SHOPIFY_STORE_PERMANENT_DOMAIN = 'swap-magic-tool-x7pa0.myshopify.com';
const SHOPIFY_STOREFRONT_URL = `https://${SHOPIFY_STORE_PERMANENT_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;
const SHOPIFY_STOREFRONT_TOKEN = 'd5106b78e74fc80af40e4389a250f179';

export interface ShopifyProductVariant {
  id: string;
  title: string;
  price: {
    amount: string;
    currencyCode: string;
  };
  availableForSale: boolean;
  quantityAvailable: number | null;
  selectedOptions: Array<{
    name: string;
    value: string;
  }>;
}

export interface ShopifyProductAdmin {
  id: string;
  title: string;
  description: string;
  handle: string;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  images: {
    edges: Array<{
      node: {
        url: string;
        altText: string | null;
      };
    }>;
  };
  variants: {
    edges: Array<{
      node: ShopifyProductVariant;
    }>;
  };
  totalInventory: number;
}

const GET_PRODUCTS_QUERY = `
  query GetProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          title
          description
          handle
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 1) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 50) {
            edges {
              node {
                id
                title
                price {
                  amount
                  currencyCode
                }
                availableForSale
                quantityAvailable
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
          totalInventory
        }
      }
    }
  }
`;

async function storefrontApiRequest(query: string, variables: any = {}) {
  const response = await fetch(SHOPIFY_STOREFRONT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_TOKEN
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  
  if (data.errors) {
    throw new Error(`Error calling Shopify: ${data.errors.map((e: any) => e.message).join(', ')}`);
  }

  return data;
}

export async function fetchShopifyProducts(): Promise<ShopifyProductAdmin[]> {
  const data = await storefrontApiRequest(GET_PRODUCTS_QUERY, { first: 100 });
  return data.data.products.edges.map((edge: any) => edge.node);
}
