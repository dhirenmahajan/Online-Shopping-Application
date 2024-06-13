import { useState, useEffect } from 'react';

function AddressManager() {
    const [addresses, setAddresses] = useState([]);
    const [edit, setEdit] = useState(false);
    const [custId, setCustId] = useState('');
    const [currentAddress, setCurrentAddress] = useState({
        addressId: null,
        custId: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        addressType: ''
    });

    useEffect(() => {
        fetchAddresses();
    }, [custId]); // Re-fetch addresses whenever custId changes

    const handleCustIdChange = (event) => {
        const newCustId = event.target.value;
        setCustId(newCustId);
        setCurrentAddress(prevState => ({
            ...prevState,
            custId: newCustId // Update custId in currentAddress whenever it changes
        }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentAddress(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const method = edit ? 'PUT' : 'POST';
        const url = '/api/address';

        await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(currentAddress)
        });
        
        fetchAddresses(); // Refresh the list of addresses
        setEdit(false);
        setCurrentAddress({
            addressId: null,
            custId: custId, // Maintain custId in new address state reset
            addressLine1: '',
            addressLine2: '',
            city: '',
            state: '',
            zipcode: '',
            country: '',
            addressType: ''
        });
    };

    const fetchAddresses = async () => {
        if (!custId) {
            setAddresses([]);  // Clear addresses if custId is not set
            return;
        }
        const res = await fetch(`/api/address?userId=${custId}`);
        if (!res.ok) {
            console.log('Failed to fetch addresses:', await res.text());  // Log the error message from the response for debugging
            setAddresses([]);
            return;
        }
        const data = await res.json();
        setAddresses(data.map(address => ({
            ...address,
            addressId: address.address_id  // Assuming the key in the response is `address_id`
        })));  // Ensure this is always an array
    };
    

    const handleEdit = (address) => {
        setEdit(true);
        setCurrentAddress({ ...address });
    };

    const handleDelete = async (addressId) => {
        await fetch('/api/address', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ addressId })
        });
        fetchAddresses(); // Refresh the list of addresses
    };

    return (
        <>
             <div>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Enter Customer ID"
                        value={custId}
                        onChange={handleCustIdChange}
                    />
                    <button type="submit">Load Addresses</button>
                </form>
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="addressLine1"
                        value={currentAddress.addressLine1}
                        onChange={handleInputChange}
                        placeholder="Address Line 1"
                    />
                    <input
                        type="text"
                        name="addressLine2"
                        value={currentAddress.addressLine2}
                        onChange={handleInputChange}
                        placeholder="Address Line 2"
                    />
                    <input
                        type="text"
                        name="city"
                        value={currentAddress.city}
                        onChange={handleInputChange}
                        placeholder="City"
                    />
                    <input
                        type="text"
                        name="state"
                        value={currentAddress.state}
                        onChange={handleInputChange}
                        placeholder="State"
                    />
                    <input
                        type="text"
                        name="zipcode"
                        value={currentAddress.zipcode}
                        onChange={handleInputChange}
                        placeholder="Zipcode"
                    />
                    <input
                        type="text"
                        name="country"
                        value={currentAddress.country}
                        onChange={handleInputChange}
                        placeholder="Country"
                    />
                    <input
                        type="text"
                        name="addressType"
                        value={currentAddress.addressType}
                        onChange={handleInputChange}
                        placeholder="Address Type"
                    />
                    <button type="submit">{edit ? 'Update Address' : 'Add Address'}</button>
                </form>
                {addresses.map((address) => (
                    <div key={address.addressId}>
                        <div>ID: {address.addressId}</div>
                        <div>{address.address_line1}, {address.address_line2}, {address.city}, {address.state}, {address.zipcode}, {address.country}</div>
                        <button>Edit</button>
                        <button onClick={() => handleDelete(address.addressId)}>Delete</button>
                        <div>------------------------------------</div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default AddressManager;
