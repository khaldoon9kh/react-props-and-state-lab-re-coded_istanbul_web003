import React from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      pets: [],
      filters: {
        type: "all",
      },
    };
  }

  onChangeType = (e) => {
    this.setState({ filters: { type: e.target.value } });
  };

  onFindPetsClick = async () => {
    const filter = this.state.filters.type;
    let query;
    if (filter === "all") query = "";
    else query = `?type=${filter}`;

    const response = await fetch(`/api/pets${query}`);
    const data = await response.json();
    this.setState({ pets: data });
    console.log(this.state.pets);
  };

  onAdoptPet = (id) => {
    console.log(this.state);
    const pets = this.state.pets.map((pet) => {
      return pet.id === id ? { ...pet, isAdopted: true } : pet;
    });
    this.setState({ pets: pets });
  };

  render() {
    return (
      <div className="ui container">
        <header>
          <h1
            onClick={(e) => fetch(this.state.filters.type)}
            lassName="ui dividing header"
          >
            React Animal Shelter
          </h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters
                onChangeType={this.onChangeType}
                onFindPetsClick={this.onFindPetsClick}
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;