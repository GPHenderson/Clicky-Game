import React, { Component } from "react";
import Nav from "../Nav";
import Header from "../Header";
import Container from "../Container";
import ClickItem from "../ClickItem";
import Footer from "../Footer";
import data from "../../data.json";

function resetData(props){

}
class Game extends Component{
    state = {
        data,
        score: 0,
        topScore: 0,
        showAlert: 0,
        showSuccess: 0,
        ClickItem: []
      };


  componentDidMount() {
    this.setState({ data: this.shuffleData(this.state.data) });
  }

      handleCorrectGuess = newData => {
        this.setState({score: this.state.score + 1});
        };


        handleIncorrectGuess = data => {
            this.setState({
            data: this.resetData(data),
            const :resetData = data.map(item => ({ ...item, clicked: false })),
            return : this.shuffleData(resetData),
          
            }) };

      shuffleData = data => {
        let i = data.length - 1;
        while (i > 0) {
          const j = Math.floor(Math.random() * (i + 1));
          const temp = data[i];
          data[i] = data[j];
          data[j] = temp;
          i--;
        }
        return data;
      };

      handleItemClick = id => {
        let guessedCorrectly = false;
        let score = this.state.score;
        let topScore = this.state.topScore;
        this.setState({showAlert:0});
    
        const newData = this.state.data.map(item => {
          const newItem = { ...item };
          if (newItem.id === id) {
            if (!newItem.clicked) {
              newItem.clicked = true;
              guessedCorrectly = true;
            }
          }
          return newItem;
        });
        guessedCorrectly
          ? this.handleCorrectGuess(newData)
          : this.handleIncorrectGuess(newData);
    
        if(score > topScore){
          this.setState({topScore : score});
        }
    
      };

    render(){
        return(
        <Container>
            <Nav/>
            <Header/>
                {this.state.data.map(item => (
                    <ClickItem
                        id={item.id}
                        image={item.image}
                        handleClick={this.handleItemClick}
                    />
                    ))}
            <Footer/>
        </Container>
        );
    }
}

export default Game;
