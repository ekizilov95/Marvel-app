import './charInfo.scss';
import thor from '../../resources/img/thor.jpeg';
import { Component } from 'react/cjs/react.development';
import { MarvelService } from '../../services/Marvel';
import Skeleton from '../skeleton/Skeleton';

class CharInfo extends Component {
    state = {
        char: null,
    }

    marvelService = new MarvelService();

    componentDidUpdate(prevProps) {
        if(prevProps.currentCharId !== this.props.currentCharId) {
            this.onchangeCharacter(this.props.currentCharId);
        }
    }

    onchangeCharacter = id => {
        this.marvelService.getCharacter(id)
        .then(res => this.setState({char: res}))
    }

    render() {
        const {char} = this.state;
        const content = char ? <Content char={char}/> : null;
        const skeleton = !char ? <Skeleton /> : null;
        
        return (
            <div className="char__info">
                {skeleton}
                {content}
            </div>
        )
    }
}

const Content = ({char}) => {
    console.log(char.stories.length );
    
    return (
        <>
            <div className="char__basics">
                <img src={ char.image } alt={ char.name }/>
                <div>
                    <div className="char__info-name">{ char.name }</div>
                    <div className="char__btns">
                        <a href={ char.homepage } className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={ char.wiki } className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                { char.description } 
            </div>
            
            <div className="char__comics" style={ char.stories.length < 1 ? {display: 'none'} : null}>Comics:</div>
            <ul className="char__comics-list">
                {
                    char.stories.map((item, i) => {
                        if(i < 10)  {
                            return (
                                <li className="char__comics-item" key={i}>
                                    { item.name }
                                </li>
                            )
                        }
                    })
                }
            </ul>
        </>
    )
}

export default CharInfo;