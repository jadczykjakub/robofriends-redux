import React, {  useEffect, Component } from 'react';
import { connect } from 'react-redux';
import { setSearchField, requestRobots } from '../actions';

import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
import { useSelector, useDispatch } from 'react-redux';

import './App.css';

// parameter state comes from index.js provider store state(rootReducers)
const mapStateToProps = (state) => {
  return {
    searchField: state.searchRobots.searchField,
    robots: state.requestRobots.robots,
    isPending: state.requestRobots.isPending
  }
}

// dispatch the DOM changes to call an action. note mapStateToProps returns object, mapDispatchToProps returns function
// the function returns an object then uses connect to change the data from redecers.
const mapDispatchToProps = (dispatch) => {
  return {
    onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
    onRequestRobots: () => dispatch(requestRobots())
  }
}

const App = () => {
  // const { robots, searchField, onSearchChange, isPending } = this.props;


  const robots = useSelector(state => state.requestRobots.robots);
  const searchField = useSelector(state => state.searchRobots.searchField);
  const isPending = useSelector(state => state.requestRobots.isPending)

  const dispatch = useDispatch();

  const onSearchChange = (e) => {
    dispatch(setSearchField(e.target.value))
};

useEffect(() =>  {
  dispatch(requestRobots());
}, [dispatch])

console.log(searchField)

  const filteredRobots = robots.filter(robot => {
    console.log(robot)
    return robot.name.toLowerCase().includes(searchField.toLowerCase());
  })




  return (
    <div className='tc'>
    <h1 className='f1'>RoboFriends</h1>
    <SearchBox searchChange={onSearchChange}/>
    <Scroll>
      { isPending ? <h1>Loading</h1> :
        <ErrorBoundry>
          <CardList robots={filteredRobots} />
        </ErrorBoundry>
      }
    </Scroll>
  </div>
  )

}

export default App;


// class App extends Component {
//   componentDidMount() {
//     this.props.onRequestRobots();
//   }

//   render() {
//     const { robots, searchField, onSearchChange, isPending } = this.props;
//     const filteredRobots = robots.filter(robot => {
//       return robot.name.toLowerCase().includes(searchField.toLowerCase());
//     })
//     return (
//       <div className='tc'>
//         <h1 className='f1'>RoboFriends</h1>
//         <SearchBox searchChange={onSearchChange}/>
//         <Scroll>
//           { isPending ? <h1>Loading</h1> :
//             <ErrorBoundry>
//               <CardList robots={filteredRobots} />
//             </ErrorBoundry>
//           }
//         </Scroll>
//       </div>
//     );
//   }
// }

// action done from mapDispatchToProps will channge state from mapStateToProps
// export default connect(mapStateToProps, mapDispatchToProps)(App)
