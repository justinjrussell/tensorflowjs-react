# Tensorflow.js MNIST React Demo

Watch the [screencast](https://angularfirebase.com/lessons)

This demo imports an MNIST ConvNet trained in Keras Python, then makes predictions with TensorFlow.js

Based on TensorFlow.js Angular Demo [97-tensorflowjs-quick-start](https://github.com/AngularFirebase/97-tensorflowjs-quick-start)

- clone it, cd into it, `npm install && npm start`

## Use a Different Keras Model

```
tensorflowjs_converter --input_format keras keras/yourWeights.h5 public/models
```
