import React, {Component}from 'react';
import NavBar from './NavBar'
import NewsApp from './NewsStateless'
import Footer from './Footer'

class App extends Component {
    
    render() { 
        return ( 
            <div>
                <NavBar /> 
                <NewsApp />
                <Footer />

            </div>
         );
    }
}
 
export default App;