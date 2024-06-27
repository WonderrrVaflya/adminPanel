import React, { useState, useEffect } from "react";
import axios from "axios";
import { Store } from "../types";
import StoreList from "../components/StoreList";
import StoreForm from "../components/StoreForm";

const Home: React.FC = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await axios.get(
          "https://parsertovarov-6b40c4ac317f.herokuapp.com/sites"
        );
        setStores(response.data);
      } catch (error) {
        setError("Ошибка получения магазинов.");
        console.error("Ошибка получения магазинов:", error);
      }
      finally {
        setLoading(false)
      }
    };

    fetchStores();
  }, []);

  const handleAddStore = async (store: Store) => {
    try {
      console.log(store)
      const response = await axios.post(
        "https://parsertovarov-6b40c4ac317f.herokuapp.com/sites",
        store
      );
      setStores(prevStores => [...prevStores, response.data]);
    } catch (error) {
      console.error("Ошибка добавления магазина:", error);
    }
  };

  return (
    <div>
      <StoreForm onAddStore={handleAddStore} />
      {loading && <p>Загрузка...</p> }
      {error ? <p>{error}</p> : <StoreList stores={stores}/>}
    </div>
  );
};

export default Home;
