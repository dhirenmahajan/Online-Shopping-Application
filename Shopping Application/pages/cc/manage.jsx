
import CcManager from '../../components/CcManage'; // Corrected import path
import styles from '../../styles/ManageCc.module.css'; // Correct CSS module
import Head from 'next/head';

function ManageCreditCards() { // Updated function name
    return (
        <div className={styles.container}>
            <Head>
                <title>Manage Credit Cards</title>
            </Head>
            <h1 className={styles.title}>Manage Your Credit Cards</h1>
            <CcManager />
        </div>
    );
}

export default ManageCreditCards;
