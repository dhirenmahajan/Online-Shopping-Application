import { useState } from 'react';

function ManageStock() {
    const [stockData, setStockData] = useState({
        prod_id: '',
        warehouse_id: '',
        quantity: 0
    });

    const handleChange = (e) => {
        setStockData({ ...stockData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = '/api/stock/manage';

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(stockData)
            });
            const data = await response.json();
            alert(data.message);
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to add stock');
        }
    };

    return (
        <div>
            <h1>Manage Stock</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="prod_id" placeholder="Product ID" value={stockData.prod_id} onChange={handleChange} />
                <input type="text" name="warehouse_id" placeholder="Warehouse ID" value={stockData.warehouse_id} onChange={handleChange} />
                <input type="number" name="quantity" placeholder="Quantity" value={stockData.quantity} onChange={handleChange} />
                <button type="submit">Add Stock</button>
            </form>
        </div>
    );
}

export default ManageStock;
