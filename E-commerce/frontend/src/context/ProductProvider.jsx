import axios from 'axios'
import React, { useEffect, useState, createContext } from 'react'

export const productContext = createContext()

const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([])
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [cart, setCart] = useState([])
    const [orders, setOrders] = useState([]); // Orders store karne ke liye state
    const [orderStats, setOrderStates] = useState(null)

    const [selectedCategories, setSelectedCategories] = useState([]);
    const [maxPrice, setMaxPrice] = useState(100000);
    const [sortBy, setSortBy] = useState("Newest");

    // 1. Fetch All Products
    async function fetchProducts() {
        try {
            const response = await axios.get("http://localhost:3000/api/product/get-products", {
                withCredentials: true,
            })
            setProducts(response.data.products);
            return response.data;
        } catch (err) {
            console.log("Fetching Error:", err.response?.data || err.message);
            throw err;
        }
    }

    // Filter Logic
    const filteredProducts = products
        ?.filter(p => {
            const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(p.category);
            const priceMatch = p.price <= maxPrice;
            return categoryMatch && priceMatch;
        })
        .sort((a, b) => {
            if (sortBy === "Low to High") return a.price - b.price;
            if (sortBy === "High to Low") return b.price - a.price;
            return new Date(b.createdAt) - new Date(a.createdAt);
        });

    // 2. Cart Functions
    async function fetchCart() {
        try {
            const response = await axios.get("http://localhost:3000/api/product/get-cart", {
                withCredentials: true,
            });
            if (response.data.success) {
                setCart(response.data.cartItems);
            }
        } catch (err) {
            console.log("Cart Fetching Error:", err.message);
        }
    }

    async function clearCartFromDB() {
    try {
        const response = await axios.delete(
            "http://localhost:3000/api/product/clear-cart",
            { withCredentials: true }
        );

        if (response.data.success) {
            setCart([]);
        }

    } catch (err) {
        console.log(err.message);
    }
}

    // Order Place Karne Ke Liye
   async function createOrder(orderData) {
    try {
        const response = await axios.post(
            "http://localhost:3000/api/order/create", 
            orderData, // <-- Yeh data backend ko req.body mein milega
            { withCredentials: true }
        );
        
        if (response.data.success) {
            await clearCartFromDB(); 
            await fetchOrders(); 
            return response.data;
        }
    } catch (err) {
        // Error logging improve karein
        console.log("Order Creating Error:", err.response?.data || err.message);
        throw err;
    }
}

    // Saare Orders Fetch Karne Ke Liye (For Admin/User Profile)
    async function fetchOrders() {
        try {
            const response = await axios.get("http://localhost:3000/api/order/get-orders", {
                withCredentials: true,
            });
            if (response.data.success) {
                setOrders(response.data.order);
            }
            return response.data;
        } catch (err) {
            console.log("Orders Fetching Error:", err.message);
        }
    }

    async function fetcuOrdersStats() {
        try {
            const response = await axios.get("http://localhost:3000/api/order/admin-stats", {
                withCredentials: true,
            });
            if (response.data.success) {
                setOrderStates(response.data.orderStats);
            }
            return response.data;
        } catch(err) {
            console.log("OrdersStats Fetching Error:", err.message);
        }
    }

    // Other Product Functions...
    async function createProducts(productData) {
        try {
            const response = await axios.post("http://localhost:3000/api/product/create-product", productData, { withCredentials: true });
            fetchProducts();
            return response.data;
        } catch (err) { throw err; }
    }

    async function getProductDetails(id) {
        try {
            const response = await axios.get(`http://localhost:3000/api/product/product-details/${id}`, { withCredentials: true });
            setSelectedProduct(response.data.product);
            return response.data;
        } catch (err) { throw err; }
    }

    async function delteProducts(id) {
        try {
            const response = await axios.delete(`http://localhost:3000/api/product/delete-product/${id}`, { withCredentials: true });
            setProducts((prev) => prev.filter(p => (p._id !== id && p.id !== id)));
            return response.data;
        } catch (err) { throw err; }
    }

    async function addToCart(productId) {
        try {
            const response = await axios.post(`http://localhost:3000/api/product/addtocart/${productId}`, {}, { withCredentials: true });
            if (response.data.success) fetchCart(); // State update ke liye fetch use karna zyada reliable hai
            return response.data;
        } catch (err) { throw err; }
    }

    async function removeFromCart(productId) {
        try {
            const response = await axios.post(`http://localhost:3000/api/product/removefromcart/${productId}`, {}, { withCredentials: true });
            if (response.data.success) fetchCart();
            return response.data;
        } catch (err) { throw err; }
    }

    useEffect(() => {
        fetchProducts();
        fetchCart();
        fetcuOrdersStats()
        fetchOrders(); 
    }, [])

    return (
        <productContext.Provider value={{ 
            products, setProducts, filteredProducts, 
            selectedCategories, setSelectedCategories, 
            maxPrice, setMaxPrice, 
            sortBy, setSortBy, 
            createProducts, getProductDetails, selectedProduct, delteProducts, 
            addToCart, removeFromCart, cart,
            createOrder, fetchOrders, orders, orderStats, setOrderStates // Inhe export karna na bhulein
        }}>
            {children}
        </productContext.Provider>
    )
}

export default ProductProvider;