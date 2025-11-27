import { useEffect, useState, createContext } from "react";

export const productsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState({});

  const fetchProducts = (cat) => {
    fetch(`https://dummyjson.com/products/category/${cat}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts((prevProducts) => ({
          ...prevProducts,
          [cat]: data.products,
        }));
      })
      .catch((err) => {
        console.error("Error al traer productos", err);
      });
  };

  useEffect(() => {
    const categories = ["laptops", "smartphones", "tablets"];
    categories.forEach((cat) => {
      fetchProducts(cat);
    });
  }, []);
  return (
    <productsContext.Provider value={{ products }}>
      {children}
    </productsContext.Provider>
  );
};
