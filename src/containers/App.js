import React, { useEffect, Component } from "react";
import { searchRobot } from "../features/robotSlice";
import { fetchRobots } from "../features/robotSlice";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import Scroll from "../components/Scroll";
import ErrorBoundry from "../components/ErrorBoundry";
import { useSelector, useDispatch } from "react-redux";

import "./App.css";

const App = () => {
  const dispatch = useDispatch();

  const robots = useSelector((state) => state.robots.robots);
  const searchField = useSelector((state) => state.robots.searchField);
  const status = useSelector((state) => state.robots.status);

  const onSearchChange = (e) => {
    dispatch(searchRobot(e.target.value));
  };

  useEffect(() => {
    dispatch(fetchRobots());
  }, [dispatch]);

  const filteredRobots = robots.filter((robot) => {
    return robot.name.toLowerCase().includes(searchField.toLowerCase());
  });

  return (
    <div className="tc">
      <h1 className="f1">RoboFriends</h1>
      <SearchBox searchChange={onSearchChange} />
      <Scroll>
        {status === "pending" ? (
          <h1>Loading</h1>
        ) : (
          <ErrorBoundry>
            <CardList robots={filteredRobots} />
          </ErrorBoundry>
        )}
      </Scroll>
    </div>
  );
};

export default App;
