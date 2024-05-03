import { useState, useEffect} from 'react';
import styles from './App.module.css';
import List from './components/List/List';
import getData from './utils/getData';


function App() {
    const [l3, setL3] = useState([])


    const fetchListData = async () => {
        try {
            const data = await getData('http://localhost:3005/getProducts')
            setL3(data)
        } catch (err) {
            console.error(err.message)
        }
    }

    useEffect(() => {
        fetchListData()
    }, [])

   
 

    return (
        <div className={styles['container']}>
         <List listItems={l3} />
        </div>
    );
}

export default App
