import "./App.css"
import { Component } from 'react'

export default class App extends Component {
  constructor(props) {
    super(props);
    // Initialize state with person data and UI control states
    this.state = {
      person: {
        fullName: "Ettouhari Mohamed Ouassim",
        bio: "There's no spoon",
        imgSrc: "https://miro.medium.com/1*7ppAwglftfXIkpWvwuMEeA.jpeg",
        profession: "Full Stack Web Developer"
      },
      show: false,           // controls profile card visibility
      secondsSinceMount: 0   // tracks seconds since component mounted
    }
  }

  // Lifecycle: runs once after the component is added to the DOM
  componentDidMount() {
    // Start a timer that increments secondsSinceMount every second
    this.interval = setInterval(() => {
      // Functional setState because we're reading previous state inside an interval
      this.setState((prev) => ({
        secondsSinceMount: prev.secondsSinceMount + 1
      }))
    }, 1000)
  }

  // Lifecycle: runs before the component is removed from the DOM
  componentWillUnmount() {
    // Clear the interval to prevent memory leaks
    clearInterval(this.interval)
  }

  // Arrow function so 'this' is automatically bound to the class instance
  handleToggle = () => {
    this.setState(prev => ({ show: !prev.show }))
  }

  render() {
    // Destructure state to avoid repeating this.state.x everywhere
    const { person, show, secondsSinceMount } = this.state

    return (
      <div className="app">
        {/* Timer display */}
        <p className="timer">⏱ Mounted: {secondsSinceMount}s ago</p>

        {/* Toggle button label reflects current show state */}
        <button className="toggle-btn" onClick={this.handleToggle}>
          {show ? "Hide Profile" : "Show Profile"}
        </button>

        {/* Conditionally render profile card only when show is true */}
        {show && (
          <div className="profile-card">
            <img src={person.imgSrc} alt={person.fullName} />
            <h4>{person.fullName}</h4>
            <p className="profession">{person.profession}</p>
            <p className="bio">{person.bio}</p>
          </div>
        )}
      </div>
    )
  }
}