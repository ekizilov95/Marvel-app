export class MarvelService {
    _apiKey = 'apikey=c27c6c34c7478b2b6d3544bbcbf06b2a';
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';

    getResourses = async (url) => {
       let res = await fetch(url);

       if(!res.ok) {
        throw new Error(`${res.status}`)
       }

       return await res.json()
    }

    getAllCharacters = async () => {
        const res = await this.getResourses(`${this._apiBase}characters?limit=9&offset=100&${this._apiKey}`);
        return res.data.results.map(item => this._transformCharacter(item));
    }

    getCharacter = async (id) => {
       const res = await this.getResourses(`${this._apiBase}characters/${id}?${this._apiKey}`);
       return this._transformCharacter(res.data.results[0])
    }

    _transformCharacter = (char) => {
        return {
            image: `${char.thumbnail.path}.${char.thumbnail.extension}`,
            name: char.name,
            description: char.description,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            id: char.id,
            stories: char.stories.items
        }
    }
}