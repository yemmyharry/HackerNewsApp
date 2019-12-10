import React, { useState, useEffect } from "react";


const PATH_BASE = "https://hn.algolia.com/api/v1";
const PATH_SEARCH = "/search";
const PARAM_SEARCH = "query=";
const frontPage = "http://hn.algolia.com/api/v1/search_by_date?tags=story"

const NewsApp = () => {
  const [result, setResult] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const setSearchTopstories = result => {
    setResult(result);
    setIsLoading(false);
  };

  const onSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

   const fetchFrontStories = () => {
     setIsLoading(true)
    fetch(frontPage)
    .then(response => response.json())
    .then(result => {
      return setSearchTopstories(result)
    })
  }

  const fetchSearchTopstories = searchTerm => {
    setIsLoading(true)
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        return setSearchTopstories(result);
      })
      .catch(e => e);
  };

 const onSearchSubmit = event => {    
    fetchSearchTopstories(searchTerm);
    event.preventDefault();
  };

  useEffect(()=>{
    fetchFrontStories()
  },[searchTerm])

    return (
      <div>
        <div>
          <Search
            value={searchTerm}
            onChange={onSearchChange}
            onSubmit={onSearchSubmit}
          >
             News Search
          </Search>
        </div>
        <div>{isLoading ? <Loading/> : result && <Table list={result.hits} />}</div>
        
      </div>
    ); 
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
          <a className="card-title black-text" href={item.url}>{item.title}</a>
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

export default NewsApp;
