import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner';

class App extends React.Component{

    // constructor(props) {
    //     super(props);
        
    //     this.state = {
    //         lat: null,
    //         errorMessage: ''
    //     }
    // }

    state = { lat: null, errorMessage: '' } // Khai báo kiểu này sẽ được babel chuyển thành constructor tương đương với cách khai báo trên

    // Ta có thể bỏ dữ liệu vào trong constructor lẫn componentDidMount nhưng lời khuyên là nên sử dụng componentDidMount.
    componentDidMount() {
        window.navigator.geolocation.getCurrentPosition(
            location => this.setState({ lat: location.coords.latitude }),
            err => this.setState({ errorMessage: err.message })
        );
    }

    renderContent(){
        if(this.state.errorMessage && !this.state.lat){
            return <div>Error: { this.state.errorMessage }</div>;
        }

        if(!this.state.errorMessage && this.state.lat){
            return <SeasonDisplay lat={ this.state.lat } />;
        }
   
        return <Spinner message="Please accept location request" />;
    }

    render(){

        return (
            <div className="border red">
                { this.renderContent() }
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));

export default App;