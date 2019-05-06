import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import ViewBtn from "../components/ViewBtn";
import Title from "../components/Title";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import {ListItem } from "../components/List";
import "./style.css";

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
                      <Col size="9 md-10">
                        <div className="title"><strong>{book.title}</strong></div>
                        <div className="author"><i>By {book.authors.toString().length !== 0 ? book.authors.join(", "):"???"}</i></div>
                      </Col>
                      <Col size="3 md-2 buttons">
                        <ViewBtn link={book.link}></ViewBtn>
                        <DeleteBtn onClick={() => this.deleteBook(book._id)} />
                      </Col>
                    </Row>
                    <Row>
                      <Col size="4 md-2 image">
                        <img src={book.image} alt={book.title}></img>
                      </Col>
                      <Col size="8 md-10 description">
                        <div className="description"> {book.description.length <1000 ? book.description : book.description.slice(0,1000)+"..."} </div>
                      </Col>
                    </Row>  
                  </ListItem>
                ))}
              </>
            ) : (
              <h3 class="noResults">No Results to Display</h3>
            )}
          </Col>
        </Row>
 
      </Container>
    );
  }
}

export default Books;
