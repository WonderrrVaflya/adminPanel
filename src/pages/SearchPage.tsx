import React, { useState, useEffect } from 'react';
import { Col, Row, AutoComplete, Card, Typography, Button } from 'antd';
import axios from 'axios';
import { Store, Product } from '../types';

const { Text } = Typography;

const SearchPage: React.FC = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [isSearched, setIsSearched] = useState<boolean>(false);
  const [autoCompleteOptions, setAutoCompleteOptions] = useState<{ value: string }[]>([]);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await axios.get('http://localhost:5000/stores/');
        setStores(response.data);
      } catch (error) {
        console.error('Ошибка получения данных:', error);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await axios.get<Product[]>('http://localhost:5000/products/');
        setProducts(response.data);
        const uniqueProductNames = Array.from(new Set(response.data.map(product => product.name)));
        const options = uniqueProductNames.map(name => ({ value: name }));
        setAutoCompleteOptions(options);
      } catch (error) {
        console.error('Ошибка получения данных о продуктах:', error);
      }
    };

    fetchStores();
    fetchProducts();
  }, []);

  const handleSearch = () => {
    if (searchText === '') {
      setFilteredProducts(products);
      setIsSearched(true);
    } else {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredProducts(filtered);
      setIsSearched(true);
    }
  };

  const handleAutoCompleteChange = (value: string) => {
    setSearchText(value);
    if (value === '') {
      setFilteredProducts([]);
      setIsSearched(false);
    }
  };

  const getCities = (stores: Store[]): string[] => {
    const cities = stores
      .map(store => {
        if (store.address) {
          const addressParts = store.address.split(',');
          return addressParts[0].trim();
        }
        return '';
      })
      .filter(city => city);
    return Array.from(new Set(cities));
  };

  const getStoresInCity = (city: string): Store[] => {
    return stores.filter(store => store.address.includes(city));
  };

  const cities = getCities(stores);

  return (
    <>
        <AutoComplete
          style={{ width: '100%' }}
          placeholder="Поиск по товарам"
          allowClear
          value={searchText}
          options={autoCompleteOptions}
          onChange={handleAutoCompleteChange}
          onSelect={value => setSearchText(value)}
          filterOption={(inputValue, option) =>
            option?.value.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1
          }
        />
        <Button
          type="primary"
          style={{ width: '100%', marginTop: '10px' }}
          onClick={handleSearch}
        >
          Поиск
        </Button>
        {isSearched && (
          <>
            {filteredProducts.length === 0 ? (
              <Text type="secondary" style={{ display: 'block', textAlign: 'center', marginTop: '20px' }}>
                Нет товаров, соответствующих вашему запросу.
              </Text>
            ) : (
              cities.map(city => {
                const storesInCity = getStoresInCity(city).filter(store =>
                  filteredProducts.some(product => product.storeId === store.id)
                );

                if (storesInCity.length === 0) {
                  return null;
                }

                return (
                  <div key={city} style={{ marginTop: '20px' }}>
                    <h2>{city}</h2>
                    {storesInCity.map(store => {
                      const productsInStore = filteredProducts.filter(
                        product => product.storeId === store.id
                      );

                      if (productsInStore.length === 0) {
                        return null;
                      }

                      return (
                          <div key={store.id} style={{ marginTop: '10px' }}>
                          <h3>{store.name}</h3>
                          <Row gutter={[16, 16]}>
                            {productsInStore.map(product => (
                              <Col key={product.id} span={24}>
                                <Card
                                  hoverable
                                  style={{ width: '100%', height: 100 }}
                                >
                                  <Row justify="space-between" style={{ width: '100%' }}>
                                    <Col span={6}>
                                      <img alt={product.name} src={product.image} style={{ width: '100%' }} />
                                      <h3>{product.name}</h3>
                                    </Col>
                                    <Col span={18}>
                                      <div style={{ display: 'flex',  height: '100%' }}>
                                        <p style={{ textAlign: 'center', flex: 1 , width: '80%'}}>{product.description}</p>
                                        <p style={{ textAlign: 'right' }}>Цена: ${product.price}</p>
                                      </div>
                                    </Col>
                                  </Row>
                                </Card>
                              </Col>
                            ))}
                          </Row>
                        </div>
                      );
                    })}
                  </div>
                );
              })
            )}
          </>
        )}
    </>
  );
};

export default SearchPage;
