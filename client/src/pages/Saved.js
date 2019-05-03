import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import ViewBtn from "../components/ViewBtn";
import Title from "../components/Title";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";

class Books extends Component {
  state = {
    books: []
  };

  componentDidMount() {
    this.loadBooks();
  }

  loadBooks = () => {
    API.getBooks()
      .then(res =>
        this.setState({ books: res.data})
      )
      .catch(err => console.log(err));
  };

  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Container>
        <Row>
          <Col size="sm-12">
            <Title>
              <h1>Saved Books</h1>
            </Title>
            {this.state.books.length ? (
              <>
                {this.state.books.map(book => (
                  <ListItem key={book._id}>
                    <Row>
                      <Col size="sm-10">
                        <strong>{book.title}</strong>
                          <br></br>
                        <i>By {book.authors.toString().length !== 0 ? book.authors.join(", "):"???"}</i>
                      </Col>
                      <Col size="sm-2">
                        <ViewBtn link={book.link}></ViewBtn>
                        <DeleteBtn onClick={() => this.deleteBook(book._id)} />
                      </Col>
                    </Row>
                    <Row>
                      <Col size="sm-2">
                        <img src={book.image} alt={book.title}></img>
                      </Col>
                      <Col size="sm-10">
                        {book.description} 
                      </Col>
                    </Row>  
                  </ListItem>
                ))}
              </>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
 
      </Container>
    );
  }
}

export default Books;
