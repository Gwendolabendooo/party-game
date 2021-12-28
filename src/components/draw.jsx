import React, { Component } from "react";
import { render } from "react-dom";
import CanvasDraw from "react-canvas-draw";

import {SocketContext, socket} from './socket';

class Draw extends React.Component {
  state = {
    color: "#ffc600",
    width: 400,
    height: 400,
    brushRadius: 10,
    lazyRadius: 12,
  };

  componentDidMount() {
    // let's change the color randomly every 2 seconds. fun!
    window.setInterval(() => {
      this.setState({
        color: "#" + Math.floor(Math.random() * 16777215).toString(16)
      });
    }, 2000);

    socket.on('drawing', (data) => {
        console.log("la data", data)
        document.querySelector("#root > div > div:nth-child(1) > img").setAttribute("src", data)
    });

    // let's change the background image every 2 seconds. fun!
    window.setInterval(() => {
      if (
        this.state.imgs &&
        this.state.imgs.length &&
        this.state.backgroundImg
      ) {
        let img = '';
        let imgs = this.state.imgs;
        for (let i = 0; i < imgs.length; i++) {
          if (this.state.backgroundImg !== imgs[i]) {
            img = imgs[i];
          }
        }

        this.setState({
          backgroundImg: img,
        });
      }
    }, 2000);

  }

  test(){

  }

  render() {

    return (
      <div>
        <div>
          <button
            onClick={() => {
              localStorage.setItem(
                "savedDrawing",
                this.saveableCanvas.getSaveData()
              );
              console.log(localStorage)
            }}
          >
            Save
          </button>
          <button
            onClick={() => {
              this.saveableCanvas.eraseAll();
            }}
          >
            Erase
          </button>
          <button
            onClick={() => {
              this.saveableCanvas.undo();
            }}
          >
            Undo
          </button>
          <button
            onClick={() => {
              console.log(this.saveableCanvas.getDataURL());
              socket.emit('drawing', this.saveableCanvas.getSaveData());
            }}
          >
            GetDataURL
          </button>
          <div>
            <label>Width:</label>
            <input
              type="number"
              value={this.state.width}
              onChange={e =>
                this.setState({ width: parseInt(e.target.value, 10) })
              }
            />
          </div>
          <div>
            <label>Height:</label>
            <input
              type="number"
              value={this.state.height}
              onChange={e =>
                this.setState({ height: parseInt(e.target.value, 10) })
              }
            />
          </div>
          <div>
            <label>Brush-Radius:</label>
            <input
              type="number"
              value={this.state.brushRadius}
              onChange={e =>
                this.setState({ brushRadius: parseInt(e.target.value, 10) })
              }
            />
          </div>
          <div>
            <label>Lazy-Radius:</label>
            <input
              type="number"
              value={this.state.lazyRadius}
              onChange={e =>
                this.setState({ lazyRadius: parseInt(e.target.value, 10) })
              }
            />
          </div>
        </div>
        <CanvasDraw
          ref={canvasDraw => (this.saveableCanvas = canvasDraw)}
          brushColor={this.state.color}
          brushRadius={this.state.brushRadius}
          lazyRadius={this.state.lazyRadius}
          canvasWidth={this.state.width}
          canvasHeight={this.state.height}
          onChange={
            document.querySelector("#root > div > div:nth-child(1) > div:nth-child(1) > button:nth-child(4)").click()
          }
        />
        <button
          onClick={() => {
            this.loadableCanvas.loadSaveData(
              localStorage.getItem("savedDrawing")
            );
          }}
        >
          Load what you saved previously into the following canvas. Either by
          calling `loadSaveData()` on the component's reference or passing it
          the `saveData` prop:
        </button>
        {/* <CanvasDraw
          hideGrid
          loadTimeOffset={0}
          ref={canvasDraw => (this.loadableCanvas = canvasDraw)}
          saveData={localStorage.getItem("savedDrawing")}
        /> */}
        <img src=""></img>
      </div>
    );
  }
}

export default Draw;