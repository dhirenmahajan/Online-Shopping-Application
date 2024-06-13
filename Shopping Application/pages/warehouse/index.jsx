import { useEffect, useState } from 'react';

function WarehousePage() {
    const [warehouses, setWarehouses] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchWarehouses() {
            setIsLoading(true);
            setError(null);
            try {
                const res = await fetch('/api/warehouse');
                if (!res.ok) throw new Error('Data fetching failed');
                const data = await res.json();
                setWarehouses(data);
            } catch (error) {
                setError(error.message);
            }
            setIsLoading(false);
        }

        fetchWarehouses();
    }, []);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading data: {error}</p>;

    return (
        <div>
            <h1>Warehouses</h1>
            {warehouses.length > 0 ? (
                <ul>
                    {warehouses.map((warehouse) => (
                        <li key={warehouse.warehouse_id}>
                            Warehouse ID: {warehouse.warehouse_id}, Address: {warehouse.address_line1}, {warehouse.city}, {warehouse.state}, {warehouse.zipcode}, {warehouse.country}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No warehouses found.</p>
            )}
        </div>
    );
}

export default WarehousePage;
