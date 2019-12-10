import React, { Component } from "react";

const DEFAULT_QUERY = "redux";

const PATH_BASE = "https://hn.algolia.com/api/v1";
const PATH_SEARCH = "/search";
const PARAM_SEARCH = "query=";

const frontPage = "http://hn.algolia.com/api/v1/search_by_date?tags=story"


class App extends Component {
  state = {
    result: null,
    searchTerm: '',
    isLoading: false 
  };


    


  setSearchTopstories = result => {
    this.setState({ result, isLoading:false });
  };

  fetchFrontStories = () => {
    fetch(frontPage)
    .then(response => response.json())
    .then(result => {
      return this.setSearchTopstories(result)
    })
  }

  fetchSearchTopstories = searchTerm => {
    this.setState({isLoading:true})
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
      .then(response => response.json())
      .then(result => {
        return this.setSearchTopstories(result);
      })
      .catch(e => e);
  };

  componentDidMount = () => {
    // const { searchTerm } = this.state;
    // this.fetchSearchTopstories(searchTerm);

    this.fetchFrontStories()
  };

  onSearchChange = event => {
    this.setState({ searchTerm: event.target.value });
  };

  onSearchSubmit = event => {
    const { searchTerm } = this.state;
    this.fetchSearchTopstories(searchTerm);
    event.preventDefault();
  };

  render() {
    const { searchTerm, result, isLoading } = this.state;
    return (
      <div>
        <div>
          <Search
            value={searchTerm}
            onChange={this.onSearchChange}
            onSubmit={this.onSearchSubmit}
          >
            Search
          </Search>
        </div>
        <div>
        {isLoading ? <Loading/> : result && <Table list={result.hits} />}
      </div>
      </div>
    );
  }
}

const Search = ({ value, onChange, onSubmit, children }) => (
  <form onSubmit={onSubmit} className="container">
    <input type="text" value={value} onChange={onChange} />
    <button type="submit" className="btn blue darken-4">{children}</button>
  </form>
);

const Table = ({ list }) => (
  <div className="container center">
    {list.map(item => (
      <div key={item.objectID} className="card white center">
        <span>
          <a className="card-title black-text " href={item.url}>{item.title}</a>
        </span>
      </div>
    ))}
  </div>
);
const Loading = () =>
<div className="center">
<div class="preloader-wrapper big active">
<div class="spinner-layer spinner-blue darken-4">
  <div class="circle-clipper left">
    <div class="circle"></div>
  </div><div class="gap-patch">
    <div class="circle"></div>
  </div><div class="circle-clipper right">
    <div class="circle"></div>
  </div>
</div>
</div>
</div>


export default App;
