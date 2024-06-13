import AddressManager from '../../components/AddressManager'; // Update the import path based on your actual folder structure
import styles from '../../styles/ManageAddresses.module.css';
import Head from 'next/head';

function ManageAddresses() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Manage Addresses</title>
            </Head>
            <h1 className={styles.title}>Manage Your Addresses</h1>
            <AddressManager />
        </div>
    );
}

export default ManageAddresses;
