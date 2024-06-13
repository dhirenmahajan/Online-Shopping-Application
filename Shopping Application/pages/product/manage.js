import { useState } from 'react';
import styles from '../../styles/Manage.module.css';

function ManageProducts() {
    const [formData, setFormData] = useState({
        operation: 'add',
        prod_id: '',
        name: '',
        category: '',
        brand: '',
        type: '',
        size: '',
        description: '',
        price: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let { operation, ...data } = formData;
        let url = `/api/products/${operation}`; // URL changes based on the operation
        let method = 'POST'; // Default method is POST

        if (operation === 'delete') {
            method = 'DELETE';
            data = { prod_id: formData.prod_id }; // For delete, only send prod_id
        } else if (operation === 'update') {
            data = { prod_id: formData.prod_id, price: formData.price }; // For update, send prod_id and price
        } else {
            data = { ...data, price: parseFloat(data.price) || 0 }; // Convert price to a number (float) if adding
        }

        try {
            const response = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            const result = await response.json();
            alert(result.message);
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to perform the operation');
        }
    };


    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Manage Products</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <select className={styles.input} name="operation" value={formData.operation} onChange={handleChange}>
                    <option value="add">Add Product</option>
                    <option value="update">Update Pricing</option>
                    <option value="delete">Delete Product</option>
                </select>
                {formData.operation !== 'delete' && (
                    <>
                        <input className={styles.input} type="text" placeholder="Product ID (for update/delete)" name="prod_id" value={formData.prod_id} onChange={handleChange} required />
                        {formData.operation === 'add' && (
                            <>
                                <input className={styles.input} type="text" placeholder="Name" name="name" value={formData.name} onChange={handleChange} />
                                <input className={styles.input} type="text" placeholder="Category" name="category" value={formData.category} onChange={handleChange} />
                                <input className={styles.input} type="text" placeholder="Brand" name="brand" value={formData.brand} onChange={handleChange} />
                                <input className={styles.input} type="text" placeholder="Type" name="type" value={formData.type} onChange={handleChange} />
                                <input className={styles.input} type="text" placeholder="Size" name="size" value={formData.size} onChange={handleChange} />
                                <textarea className={styles.input} placeholder="Description" name="description" value={formData.description} onChange={handleChange} />
                            </>
                        )}
                        {formData.operation === 'update' && (
                            <input className={styles.input} type="number" placeholder="New Price" name="price" value={formData.price} onChange={handleChange} />
                        )}
                    </>
                )}
                {formData.operation === 'delete' && (
                    <input className={styles.input} type="text" placeholder="Product ID" name="prod_id" value={formData.prod_id} onChange={handleChange} required />
                )}
                <button className={styles.button} type="submit">Submit</button>
            </form>
        </div>
    );
}

export default ManageProducts;
