import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import decoration from '../../resources/img/vision.png';
import { Component } from 'react';

class App extends Component {

    state = {
        currentCharId: null,
    }

    changeCharacterId = (id) => {
        this.setState({currentCharId: id})
    }

   render() {
       
        return (
            <div className="app">
                <AppHeader/>
                <main>
                    <RandomChar/>
                    <div className="char__content">
                        <CharList changeCharacterId={this.changeCharacterId}/>
                        <CharInfo currentCharId={this.state.currentCharId}/>
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision"/>
                </main>
            </div>
        )
   }
}

export default App;