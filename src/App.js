import React, { Component } from "react";
import * as tf from "@tensorflow/tfjs";
import Chart from "./Chart";
import Drawing from "./Drawing";
import "./App.css";

export default class App extends Component {
  state = {
    predictions: undefined,
    prediction: undefined
  };
  componentDidMount() {
    this.trainNewModel();
    this.loadModel();
  }
  loadModel = async () => {
    this.model = await tf.loadModel("/models/model.json");
  };
  trainNewModel = async () => {
    this.linearModel = tf.sequential();
    this.linearModel.add(tf.layers.dense({ units: 1, inputShape: [1] }));

    // Prepare the model for training: Specify the loss and the optimizer.
    this.linearModel.compile({ loss: "meanSquaredError", optimizer: "sgd" });

    // Training data, completely random stuff
    const xs = tf.tensor1d([
      3.2,
      4.4,
      5.5,
      6.71,
      6.98,
      7.168,
      9.779,
      6.182,
      7.59,
      2.16,
      7.042,
      10.71,
      5.313,
      7.97,
      5.654,
      9.7,
      3.11
    ]);
    const ys = tf.tensor1d([
      1.6,
      2.7,
      2.9,
      3.19,
      1.684,
      2.53,
      3.366,
      2.596,
      2.53,
      1.22,
      2.87,
      3.45,
      1.65,
      2.904,
      2.42,
      2.4,
      1.31
    ]);

    // Train
    await this.linearModel.fit(xs, ys);

    console.log("model trained!");
  };
  predict = async imageData => {
    await tf.tidy(() => {
      // Convert the canvas pixels to
      let img = tf.fromPixels(imageData, 1);
      img = img.reshape([1, 28, 28, 1]);
      img = tf.cast(img, "float32");

      // Make and format the predications
      const output = this.model.predict(img);

      // Save predictions on the component
      const predictions = Array.from(output.dataSync());
      this.setState({ predictions });
    });
  };
  linearPrediction = val => {
    const output = this.linearModel.predict(tf.tensor2d([val], [1, 1]));
    const prediction = Array.from(output.dataSync())[0];
    this.setState({ prediction });
  };
  onNewImage = newImageData => {
    this.predict(newImageData);
  };
  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-sm">
              <h3>Draw Here</h3>
              <Drawing onNewImage={this.onNewImage} />
            </div>
            <div className="col-sm">
              <h3>TensorFlow Prediction</h3>
              <Chart data={this.state.predictions} />
            </div>
          </div>
        </div>
        <hr />
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-sm">
              <h1>Linear Model</h1>
              <h4>
                Predicted Value:{" "}
                <span className="badge badge-info">
                  {this.state.prediction}
                </span>
              </h4>
              <p>
                Basic TensorFlow linear regression model that was trained in the
                browser.
              </p>
              <input
                type="number"
                className="form-control"
                placeholder="enter any random numbner"
                onChange={e => this.linearPrediction(e.target.value)}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
