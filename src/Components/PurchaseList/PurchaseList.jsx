import React, { useEffect, useState } from 'react';
import { Table, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const PurchaseList = () => {
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:9090/api/purchases')
      .then(response => {
        setPurchases(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the purchases!', error);
      });
  }, []);

  return (
    <Container>
      <Row className="my-4">
        <Col>
          <h2>Purchase Requests</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Book Title</th>
                <th>Author Name</th>
                <th>Publisher Name</th>
                <th>Price</th>
                <th>User Email</th>
                <th>Purchase Date</th>
              </tr>
            </thead>
            <tbody>
              {purchases.map((purchase) => (
                <tr key={purchase.id}>
                  <td>{purchase.bookTitle}</td>
                  <td>{purchase.authorName}</td>
                  <td>{purchase.publisherName}</td>
                  <td>{purchase.price}</td>
                  <td>{purchase.userEmail}</td>
                  <td>{new Date(purchase.purchaseDate).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default PurchaseList;
