import React, { Component } from 'react';
import { CanvasSpace, Create, Circle } from 'pts';

function randomInt(min, max)
{
    return Math.floor(Math.random() * (max - min + 1) + min);
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      header: {
        x: 20,
        y: 100,
      },
      text: {
        x: 20,
        y: 200,
      },
    };
    this.moveText = this.moveText.bind(this);
  }

  componentDidMount() {
    var pts = [];
    var colors = ['#65d8ef', '#ae82ff', '#e7db74', '#f92671', '#a6e22e'];
    const space = new CanvasSpace('#space').setup({
      bgcolor: '#191919',
      resize: true,
      retina: true
    });
    const form = space.getForm();
    space.add({
      // init with 500 random points
      start: bound => {
        pts = Create.distributeRandom(space.innerBound, randomInt(250, 1000));
      },

      animate: (time, ftime) => {
        let r = (Math.abs(space.pointer.x - space.center.x) / space.center.x) * 150 + 70;
        let range = Circle.fromCenter(space.pointer, r);

        // check if each point is within circle's range
        for (let i = 0, len = pts.length; i < len; i++) {
          if (Circle.withinBound(range, pts[i])) {
            // calculate circle size
            let dist = (r - pts[i].$subtract(space.pointer).magnitude()) / r;
            let p = pts[i]
              .$subtract(space.pointer)
              .scale(1 + dist)
              .add(space.pointer);
            form.fillOnly(colors[i % 4]).point(p, dist * 25, 'circle');
          } else {
            form.fillOnly('#fff').point(pts[i], 0.5);
          }
        }
      }
    });
    space.play().bindMouse().bindTouch();
    setTimeout(() => {
      setInterval(this.moveText, 2000);
    }, 0);
  }

  moveText() {
    this.setState({
      header: {
        x: randomInt(20, window.innerWidth - 150),
        y: randomInt(20, window.innerHeight - 36),
      },
      text: {
        x: randomInt(20, window.innerWidth - 250),
        y: randomInt(20, window.innerHeight - 36),
      }
    })
  }

  render() {
    return (
      <div>
        <h1 style={{ transform: `translate(${this.state.header.x}px, ${this.state.header.y}px)` }}>welcome</h1>
        <h1 style={{ transform: `translate(${this.state.text.x}px, ${this.state.text.y}px)`}}>to this website</h1>
        <div id="space" style={{ height: '100vh', opacity: 0.8 }} />
      </div>
    );
  }
}

export default App;
