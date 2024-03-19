import React, { useState } from 'react';
import { Select, Typography, Row, Col, Avatar, Card } from "antd";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import { useGetCryptosQuery } from "../services/cryptoApi";
import { Link } from "react-router-dom";
import Loader from "./Loader";



const { Text, Title } = Typography
const { Option } = Select
const demoImage = "http://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg"
const bingImage = "https://cdn1.iconfinder.com/data/icons/flat-and-simple-part-1/128/microsoft-512.png"

const News = ({ simplified }) => {

    const [newsCategory, setNewsCategory] = useState("cryptocurrency")

    const { data } = useGetCryptosQuery(100);
    const { data: cryptoNews } = useGetCryptoNewsQuery(newsCategory)

    if (!cryptoNews?.data) return <Loader />;

    return (
        <Row gutter={[24, 24]}>
            {!simplified && (
                <Col span={24}>
                    <Select
                        showSearch
                        className='select-news'
                        placeholder="Select a Crypto"
                        optionFilterProp='children'
                        onChange={(value) => setNewsCategory(value)}
                        filterOption={(input, option) => (
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        )}
                    >
                        <Option value='Cryptocurrency'>Cryptocurrency</Option>
                        {data?.data?.coins.map((coin, i) => <Option value={coin.name} key={i}>{coin.name}</Option>)
                        }
                    </Select>
                </Col>
            )}
            {(cryptoNews?.data.slice(0, simplified ? 6 : 12)).map((news, index) => (
                <Col xs={24} sm={12} lg={8} key={index}>
                    <Card hoverable className='news-card'>
                        <Link to={news.url} target='_blank' rel='noreferrer'>
                            <div className='news-image-container'>
                                <Title className='news-title' level={4}>{news.title}</Title>
                                <img src={news?.image || demoImage} alt="news" style={{ maxWidth: '200px', maxHeight: '100px' }} />
                            </div>
                            <p>
                                {news.excerpt > 100 ? `${news.excerpt.substring(0, 100)}...` : news.excerpt
                                }
                            </p>
                            <div className='provider-container'>
                                <div>
                                    <Avatar src={bingImage || demoImage} alt='news' />
                                    <Text className='provider-name'>{news.syndicate}</Text>
                                </div>
                                <Text>{news.relativeTime}</Text>
                            </div>
                        </Link>
                    </Card>
                </Col>
            ))}
        </Row>

    )
}

export default News