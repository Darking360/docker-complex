import React, { Component } from 'react'
import axios from 'axios';

export class Fib extends Component {

  state = {
    seenIndexes: [],
    values: {},
    index: '',
  };

  componentDidMount = () => {
    this.fetchValues();
    this.fetchIndexes();
  }

  fetchValues = async () => {
    const values = await axios.get('/api/values/current');
    this.setState({ values: values.data });
  }

  fetchIndexes = async () => {
    const seenIndexes = await axios.get('/api/values/all');
    this.setState({
      seenIndexes: seenIndexes.data,
    });
  }

  renderSeenIndexes = () => {
    const { seenIndexes } = this.state;
    return seenIndexes.map(({ number }) => number).join(', ');
  }

  renderCalculatedValues = () => {
    const { values } = this.state;
    const entries = [];
    for (let key in values) {
      entries.push(
        <div key={key}>
          For index {key} I calculated {values[key]}
        </div>
      );
    }
    return entries;
  }

  handleSubmit = async (e) => {
    const { index } = this.state;
    e.preventDefault();
    await axios.post('/api/values', {
      index,
    });
    this.setState({ index: '' });
  }

  render() {
    const { index } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
            <label htmlFor="index">Enter your index</label>
            <input 
              id="index" 
              type="text"
              value={index}
              onChange={({ target: { value } }) => this.setState({ index: value })}
            />
            <button type="submit">Submit!</button>
        </form>
        <h3>Indexes I've seen</h3>
        { this.renderSeenIndexes() }
        <h3>Calculated values</h3>
        { this.renderCalculatedValues() }
      </div>
    )
  }
}

export default Fib;
