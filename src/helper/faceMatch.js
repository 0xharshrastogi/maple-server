import * as faceapi from '@vladmandic/face-api/dist/face-api.node.js';
import * as canvas from 'canvas';
import path from 'path';

const { Canvas, Image, ImageData, loadImage } = canvas;
faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

class FaceMatcher {
  constructor(compareThis, compareFrom) {
    this.compareThis = compareThis;
    this.compareFrom = compareFrom;
  }

  async compare() {
    const [imageA, imageB] = await Promise.all([
      loadImage(this.compareThis),
      loadImage(this.compareFrom),
    ]);

    await FaceMatcher.loadModels();

    const [resultA, resultB] = await Promise.all([
      this._detect(imageA, 'single'),
      this._detect(imageB, 'all'),
    ]);

    if (!resultA) {
      throw { type: 'Face Not Found', error: new Error('Face Not Detected In Passed Image') };
    }

    if (!resultB) {
      return { type: 'Face Not Found', error: new Error('Face Not Detected In Passed Image') };
    }

    const result = this._match(resultA, resultB);
    const { _label: label, distance } = result[0];

    return {
      label,
      similar: 100 - distance * 100,
      isMatching: distance < 0.5 ? true : false,
    };
  }
  _detect(image, detectType = 'all') {
    if (detectType === 'all')
      return faceapi
        .detectAllFaces(image, new faceapi.SsdMobilenetv1Options({ minConfidence: 0.5 }))
        .withFaceLandmarks()
        .withFaceDescriptors();
    if (detectType === 'single')
      return faceapi.detectSingleFace(image).withFaceLandmarks().withFaceDescriptor();
  }

  _match(compareThis, compareFrom) {
    const labelDescriptor = new faceapi.LabeledFaceDescriptors('Harsh', [compareThis.descriptor]);
    const matcher = new faceapi.FaceMatcher(labelDescriptor);
    return compareFrom.map((res) => matcher.findBestMatch(res.descriptor));
  }

  static async loadModels() {
    if (FaceMatcher.isModelLoaded) return;
    await Promise.all([
      faceapi.nets.ssdMobilenetv1.loadFromDisk(FaceMatcher.modelspath),
      faceapi.nets.faceLandmark68Net.loadFromDisk(FaceMatcher.modelspath),
      faceapi.nets.faceRecognitionNet.loadFromDisk(FaceMatcher.modelspath),
    ]);
    FaceMatcher.isModelLoaded = true;
    console.timeEnd('Model Load Time');
  }
}
console.time('Model Load Time');
FaceMatcher.modelspath = path.join(path.resolve(), '/models');
FaceMatcher.isModelLoaded = false;
FaceMatcher.loadModels();
FaceMatcher.SsdMobilenetv1Options = new faceapi.SsdMobilenetv1Options({
  minConfidence: 0.5,
});

export default FaceMatcher;
