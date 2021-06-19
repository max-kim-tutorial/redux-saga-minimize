import React, { useEffect } from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { RootState } from "./store";
import { catActions } from "./store/cats";

function App() {
  const dispatch = useDispatch();
  const { catFacts, status } = useSelector(
    (state: RootState) => ({
      catFacts: state.catReducer.catFact.data,
      status: state.catReducer.catFact.status
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(catActions.fetchCatFacts());
  }, [dispatch]);

  return (
    <div className="App">
      {status === "loading" ? (
        <div>loading</div>
      ) : (
        <>
          {catFacts?.map((fact, index) => (
            <div key={fact._id}>
              <div>Facts about cat no.{index + 1}</div>
              <div>{fact.text}</div>
              <br />
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default App;
