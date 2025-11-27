import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";

export const CrudContext = createContext();

const BASE = "https://6921c076512fb4140be13b05.mockapi.io/ProductsList/Product";

export const CrudProvider = ({ children }) => {
  const [products, setProducts] = useState({}); // agrupado por category
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (signal) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(BASE, { signal });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const list = await response.json(); // lista plana
      // agrupar por category para Admin.jsx
      const grouped = {};
      (list || []).forEach((p) => {
        const cat = p.category || "Sin Categoría";
        if (!grouped[cat]) grouped[cat] = [];
        grouped[cat].push(p);
      });
      setProducts(grouped);
      return { ok: true, data: grouped };
    } catch (err) {
      if (err.name !== "AbortError") {
        console.error("Error fetching data:", err);
        setError("No se pudieron cargar los productos.");
        return { ok: false, message: String(err) };
      }
      return { ok: false, message: "aborted" };
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const ctrl = new AbortController();
    fetchData(ctrl.signal);
    return () => ctrl.abort();
  }, [fetchData]);

  const reload = useCallback(async () => {
    const ctrl = new AbortController();
    return fetchData(ctrl.signal);
  }, [fetchData]);

  const createProduct = useCallback(
    async (payload) => {
      try {
        const res = await fetch(BASE, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const json = await res.json();
        if (!res.ok)
          return {
            ok: false,
            errors: json.errors || [json.message || "error"],
          };
        await reload();
        return { ok: true, data: json };
      } catch (err) {
        console.error("createProduct error", err);
        return { ok: false, message: String(err) };
      }
    },
    [reload]
  );

  const updateProduct = useCallback(
    async (payload) => {
      if (!payload || !payload.id) return { ok: false, message: "missing id" };
      try {
        const res = await fetch(`${BASE}/${payload.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const json = await res.json();
        if (!res.ok)
          return {
            ok: false,
            errors: json.errors || [json.message || "error"],
          };
        await reload();
        return { ok: true, data: json };
      } catch (err) {
        console.error("updateProduct error", err);
        return { ok: false, message: String(err) };
      }
    },
    [reload]
  );

  const deleteProduct = useCallback(
    async (id) => {
      if (!id) return { ok: false, message: "missing id" };
      try {
        const res = await fetch(`${BASE}/${id}`, { method: "DELETE" });
        if (!res.ok) {
          const json = await res.json().catch(() => ({}));
          return {
            ok: false,
            errors: json.errors || [json.message || "error"],
          };
        }
        await reload();
        return { ok: true };
      } catch (err) {
        console.error("deleteProduct error", err);
        return { ok: false, message: String(err) };
      }
    },
    [reload]
  );

  const value = useMemo(
    () => ({
      products,
      isLoading,
      error,
      fetchData,
      reload,
      createProduct,
      updateProduct,
      deleteProduct,
    }),
    [
      products,
      isLoading,
      error,
      fetchData,
      reload,
      createProduct,
      updateProduct,
      deleteProduct,
    ]
  );

  return <CrudContext.Provider value={value}>{children}</CrudContext.Provider>;
};
