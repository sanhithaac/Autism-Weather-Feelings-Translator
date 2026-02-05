import React, { Component } from "react";
import Navbar from "../components/Navbar";

class Success extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animationPlayed: false,
    };
  }

  componentDidMount() {
    // Simple logic for the Class Component lifecycle demonstration
    setTimeout(() => {
      this.setState({ animationPlayed: true });
    }, 500);
  }

  render() {
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center px-6">
        <div className={`bg-white rounded-3xl p-12 shadow-2xl text-center transition-all duration-1000 ${this.state.animationPlayed ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}>
          <div className="text-8xl mb-8">🌟</div>
          <h1 className="text-4xl font-bold text-primary mb-4">Great Job!</h1>
          <p className="text-xl text-green-700 mb-10">
            You shared your feelings today. That is a wonderful step!
          </p>

          <button
            onClick={() => window.location.hash = "/checkin"}
            className="bg-primary hover:bg-accent text-white px-12 py-4 rounded-full font-bold text-xl shadow-lg transition transform hover:scale-110"
          >
            Play Again →
          </button>
        </div>
      </div>
    );
  }
}

export default Success;
