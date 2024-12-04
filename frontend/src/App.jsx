import axios from "axios";
import React, { useEffect, useState } from "react";

const App = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "https://www.myntra.com/gateway/v2/product/29916603/cross-sell?maxCount=15"
      );
      const data = await response.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Similar Products</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.productId}
              className="border rounded-lg shadow-sm hover:shadow-lg p-4"
            >
              <img
                src={product.imageUrl}
                alt={product.productName}
                className="w-full h-40 object-cover mb-4 rounded-lg"
              />
              <h2 className="font-semibold text-lg mb-2">
                {product.productName}
              </h2>
              <p className="text-gray-600">
                ₹{product.price?.discounted || product.price?.regular}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
