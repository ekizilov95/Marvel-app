import { Component } from 'react';
import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import { MarvelService } from '../../services/Marvel'
import Spinner from '../Spinner/Spinner';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

class RandomChar extends Component {
    constructor(props) {
        super(props);
        this.updateCharacter();
    }

    state = {
        char: {},
        loading: true,
        error: false
    }

    marvelService = new MarvelService();

    updateCharacter = () => {
        let id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        this.marvelService.getCharacter(id)
        .then(res => {
            this.setState({char: res, loading: false})
        })
        .catch(e => this.setState({loading: false, error: true}));
    }

    render() {
        const {char, loading, error} = this.state;
        const content = !(loading || error)? <Content char={char}/> : null;
        const spinner = loading ? <Spinner/> : null;
        const errorMessage = error ? <ErrorMessage/> : null;

        return (
            <div className="randomchar">
                {content}
                {spinner}
                {errorMessage}

                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main">
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
}

const Content = ({char}) => {
    const {image, name, description, homepage, wiki} = char;

    return (
        <div className="randomchar__block">
            <img src={image} alt="Random character" className="randomchar__img"/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description ? description : "description is blank"}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
} 

export default RandomChar;