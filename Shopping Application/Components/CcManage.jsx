import { useState, useEffect } from 'react';

function CcManager() {
    const [creditCards, setCreditCards] = useState([]);
    const [edit, setEdit] = useState(false);
    const [custId, setCustId] = useState('');
    const [currentCard, setCurrentCard] = useState({
        cardId: null,
        custId: '',
        creditCardNo: '',
        cardExp: '',
        cardName: '',
        billingAddressId: ''
    });

    useEffect(() => {
        fetchCreditCards();
    }, [custId]); // Re-fetch credit cards whenever custId changes

    const handleCustIdChange = (event) => {
        const newCustId = event.target.value;
        setCustId(newCustId);
        setCurrentCard(prevState => ({
            ...prevState,
            custId: newCustId // Update custId in currentCard whenever it changes
        }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentCard(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const method = edit ? 'PUT' : 'POST';
        const url = '/api/cc';

        await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(currentCard)
        });
        
        fetchCreditCards(); // Refresh the list of credit cards
        setEdit(false);
        setCurrentCard({
            cardId: null,
            custId: custId, // Maintain custId in new card state reset
            creditCardNo: '',
            cardExp: '',
            cardName: '',
            billingAddressId: ''
        });
    };

    const fetchCreditCards = async () => {
        if (!custId) {
            setCreditCards([]);  // Clear credit cards if custId is not set
            return;
        }
        const res = await fetch(`/api/cc?userId=${custId}`);
        if (!res.ok) {
            console.log('Failed to fetch credit cards:', await res.text());
            setCreditCards([]);
            return;
        }
        const data = await res.json();
        setCreditCards(data.map(card => ({
            ...card,
            cardId: card.card_id
        })));
        console.log('Fetched credit cards:', data);
    };

    const handleEdit = (card) => {
        setEdit(true);
        setCurrentCard({ ...card });
    };

    const handleDelete = async (cardId) => {
        await fetch('/api/cc', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cardId })
        });
        fetchCreditCards(); // Refresh the list of credit cards
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
                    <button type="submit">Load Credit Cards</button>
                </form>
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="creditCardNo"
                        value={currentCard.creditCardNo}
                        onChange={handleInputChange}
                        placeholder="Credit Card Number"
                    />
                    <input
                        type="text"
                        name="cardExp"
                        value={currentCard.cardExp}
                        onChange={handleInputChange}
                        placeholder="Expiration Date"
                    />
                    <input
                        type="text"
                        name="cardName"
                        value={currentCard.cardName}
                        onChange={handleInputChange}
                        placeholder="Cardholder Name"
                    />
                    <input
                        type="text"
                        name="billingAddressId"
                        value={currentCard.billingAddressId}
                        onChange={handleInputChange}
                        placeholder="Billing Address ID"
                    />
                    <button type="submit">{edit ? 'Update Credit Card' : 'Add Credit Card'}</button>
                </form>
                {creditCards.map((card) => (
                    <div key={card.cardId}>
                        <div>ID: {card.cardId}</div>
                        <div>{card.creditcardno}, {card.card_exp}, {card.card_name}, {card.billing_address_id}</div>
                        <button onClick={() => handleEdit(card)}>Edit</button>
                        <button onClick={() => handleDelete(card.cardId)}>Delete</button>
                        <div>------------------------------------</div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default CcManager;
