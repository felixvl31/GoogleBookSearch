import React, { Component } from "react";
import ViewBtn from "../components/ViewBtn";
import SaveBtn from "../components/SaveBtn";
import Jumbotron from "../components/Jumbotron";
import Title from "../components/Title";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, FormBtn } from "../components/Form";

class Books extends Component {
  state = {
    books: [],
    search:""
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.search) {
      API.searchBook(this.state.search.replace(/ /g,"+"))
       .then(res => 
         this.setState({ books: res.data.items, search: ""}))
        .catch(err => console.log(err));
    }
  };

   saveBook = (title,authors,description,image,link, index) => {
    let data =  {
      title,
      authors,
      description,
      image,
      link
    }
    let original = this.state.books;
    original.splice(index,1);
    this.setState({books:original})
    API.saveBook(data)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Container>
        <Row>
     
           <Col size="sm-12">
              <Title>
              <h1>Search a book</h1>
            </Title>
          <form>
            <Input
              value={this.state.search}
              onChange={this.handleInputChange}
              name="search"
              placeholder="Search something"
            />
            <FormBtn
              disabled={!(this.state.search)}
              onClick={this.handleFormSubmit}
            >
              Search
            </FormBtn>
          </form>
          </Col>
        </Row>
        <Row>
          <Col size="sm-12">
            <Jumbotron>
              <h1>Results</h1>
            </Jumbotron>
            {(this.state.books?this.state.books.length:false) ? (
              <>
                {this.state.books.map((book,index) => (

                  <ListItem key={book.id}>
                    <Row>
                      <Col size="sm-9">
                        <strong>{book.volumeInfo.title}</strong>
                          <br></br>
                        <i>By { book.volumeInfo.authors !== undefined ? book.volumeInfo.authors.join(", "):"???"}</i>
                      </Col>
                      <Col size="sm-3">
                        <ViewBtn link={book.volumeInfo.previewLink}></ViewBtn>
                        <SaveBtn onClick={() => this.saveBook(
                                                        book.volumeInfo.title,
                                                        book.volumeInfo.authors,
                                                        book.volumeInfo.description,
                                                        book.volumeInfo.imageLinks?book.volumeInfo.imageLinks.thumbnail:"./images/dummy.gif",
                                                        book.volumeInfo.previewLink,
                                                        index)} />
                      </Col>
                    </Row>
                    <Row>
                      <Col size="sm-2">
                        <img src={book.volumeInfo.imageLinks?book.volumeInfo.imageLinks.thumbnail:"./images/dummy.gif"} alt={book.volumeInfo.title}></img>
                      </Col>
                      <Col size="sm-10">
                        {book.volumeInfo.description} 
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
