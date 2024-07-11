import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Logout from "../../Logout/Logout";
import BookCard from "../../BookCard/BookCard";
import "bootstrap/dist/css/bootstrap.min.css";
import "./user-dashboard.css";
import Carousel from "react-bootstrap/Carousel";
import Pagination from "react-bootstrap/Pagination";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";

const imageUrls = [
  "https://images.unsplash.com/photo-1575220360526-be964710f279?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1618365908648-e71bd5716cba?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxNzZWFyY2h8MTF8fGJvb2tzdG9yZXxlbnwwfHwwfHx8MA%3D%3D",
  "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJvb2tzdG9yZXxlbnwwfHwwfHx8MA%3D%3D",
];

function UserDashboard() {
  const [userData, setUserData] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingBooks, setLoadingBooks] = useState(true);
  const [booksData, setBooksData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const wishlistBooks = useSelector((state) => state.wishlist.wishlistBooks);
  const wishlistCount = wishlistBooks.length;
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const email = localStorage.getItem("userEmail");
        if (!email) {
          alert("User information missing. Please log in again.");
          window.location.href = "/login"; // Redirect to login page
          return;
        }

        const response = await axios.get(
          `http://localhost:9090/api/user-data?email=${email}`
        );
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        alert("Error fetching user data. Please try again.");
      } finally {
        setLoadingUser(false);
      }
    };

    const fetchBooksData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9090/api/publishers"
        );
        setBooksData(response.data);
      } catch (error) {
        console.error("Error fetching books data:", error);
        alert("Error fetching books data. Please try again.");
      } finally {
        setLoadingBooks(false);
      }
    };

    fetchUserData();
    fetchBooksData();
  }, []);

  // Filtering books based on search term
  const filteredBooks = booksData.flatMap((publisher) =>
    publisher.authors.flatMap((author) =>
      author.books
        .filter(
          (book) =>
            (book.bookTitle &&
              book.bookTitle
                .toLowerCase()
                .includes(searchTerm.toLowerCase())) ||
            (author.authorName &&
              author.authorName
                .toLowerCase()
                .includes(searchTerm.toLowerCase())) ||
            (publisher.publisherName &&
              publisher.publisherName
                .toLowerCase()
                .includes(searchTerm.toLowerCase()))
        )
        .map((book) => ({
          ...book,
          authorName: author.authorName,
          publisherName: publisher.publisherName,
        }))
    )
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
  const totalBooks = filteredBooks.length;
  const totalPages = Math.ceil(totalBooks / booksPerPage);

  return (
    <div
      className="dashboard-container"
      style={{ height: "100vh", display: "flex", flexDirection: "column" }}
    >
      {/* Navigation bar */}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#">User Dashboard</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/liked-books">
                Wish List ({wishlistCount})
              </Nav.Link>
              <Nav.Link href="#">Settings</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link>
                <Logout />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container fluid className="flex-grow-1 d-flex flex-column">
        {loadingUser ? (
          <div className="loading-container">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <div className="user-info mt-4">
            <h3>User Information</h3>
            <p>
              <strong>Email:</strong> {userData.email}
            </p>
            <p>
              <strong>Username:</strong> {userData.username}
            </p>
          </div>
        )}

        {/* Bootstrap Carousel (only show on first page) */}
        {currentPage === 1 && (
          <Carousel className="mt-4 carousel-custom">
            {imageUrls.map((url, index) => (
              <Carousel.Item key={index}>
                <img
                  className="d-block w-100"
                  src={url}
                  alt={`Slide ${index + 1}`}
                />
                <Carousel.Caption>
                  <h3>{`Slide ${index + 1} label`}</h3>
                  <p>{`Description for slide ${index + 1}`}</p>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        )}

        {/* Search bar */}
        <Form className="d-flex mt-4">
          <FormControl
            type="search"
            placeholder="Search books..."
            className="me-2"
            aria-label="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Form>

        {/* Book List and Pagination */}
        {loadingBooks ? (
          <div className="loading-container">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <div className="book-list mt-4 flex-grow-1">
            <Row className="g-2">
              {currentBooks.map((book) => (
                <Col
                  md={3}
                  xs={2}
                  key={book.bookId}
                  className="d-flex justify-content-center align-items-center"
                >
                  <BookCard
                    book={book}
                    authorName={book.authorName}
                    publisherName={book.publisherName}
                    className="book-card"
                  />
                </Col>
              ))}
            </Row>

            <div className="pagination-container mt-4">
              <Pagination>
                {[...Array(totalPages).keys()].map((number) => (
                  <Pagination.Item
                    key={number + 1}
                    active={number + 1 === currentPage}
                    onClick={() => handlePageChange(number + 1)}
                  >
                    {number + 1}
                  </Pagination.Item>
                ))}
              </Pagination>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}

export default UserDashboard;
