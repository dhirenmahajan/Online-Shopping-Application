import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from '../../styles/WarehouseProducts.module.css';

function WarehouseProducts() {
    const router = useRouter();
    const { id } = router.query; // warehouse ID
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    async function fetchProducts() {
        setIsLoading(true);
        setError(null);
        const res = await fetch(`/api/warehouse/${id}`);
        if (!res.ok) {
            setError('Failed to fetch data');
            setIsLoading(false);
            return;
        }
        const data = await res.json();
        setProducts(data);
        setIsLoading(false);
    }

    useEffect(() => {
        if (id) {
            fetchProducts();
        }
    }, [id]);

    const updateStock = async (productId, newQuantity) => {
        const res = await fetch(`/api/warehouse/${id}/update-stock`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ warehouseId: id, productId, quantity: newQuantity })
        });
        if (res.ok) {
            fetchProducts(); // Refresh data after update
        } else {
            alert('Failed to update stock');
        }
    };

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Products in Warehouse {id}</h1>
            {products.length > 0 ? (
                <ul className={styles.productList}>
                    {products.map((product) => (
                        <li key={product.prod_id} className={styles.productItem}>
                            <div>
                                <span className={styles.productName}>{product.name}</span> -
                                <span className={styles.productPrice}> ${product.price}</span> -
                                <span className={styles.productDescription}> {product.description}</span>
                            </div>
                            <div>
                                Quantity: <input type="number" value={product.quantity} onChange={(e) => {
                                    const updatedProducts = products.map(p => {
                                        if (p.prod_id === product.prod_id) {
                                            return { ...p, quantity: e.target.value };
                                        }
                                        return p;
                                    });
                                    setProducts(updatedProducts);
                                }} />
                                <button onClick={() => updateStock(product.prod_id, product.quantity)}>Update Stock</button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No products found in this warehouse.</p>
            )}
        </div>
    );
}

export default WarehouseProducts;
