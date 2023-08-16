"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isVideoNew = exports.setVideo = void 0;
const firebase_admin_1 = require("firebase-admin");
const firebase_admin_2 = require("firebase-admin");
const firestore_1 = require("firebase-admin/firestore");
(0, firebase_admin_2.initializeApp)({ credential: firebase_admin_1.credential.applicationDefault() });
const firestore = new firestore_1.Firestore();
// Note: This requires setting an env variable in Cloud Run
/** if (process.env.NODE_ENV !== 'production') {
  firestore.settings({
      host: "localhost:8080", // Default port for Firestore emulator
      ssl: false
  });
} */
const videoCollectionId = 'videos';
function getVideo(videoId) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const snapshot = yield firestore.collection(videoCollectionId).doc(videoId).get();
        return (_a = snapshot.data()) !== null && _a !== void 0 ? _a : {};
    });
}
function setVideo(videoId, video) {
    return firestore
        .collection(videoCollectionId)
        .doc(videoId)
        .set(video, { merge: true });
}
exports.setVideo = setVideo;
function isVideoNew(videoId) {
    return __awaiter(this, void 0, void 0, function* () {
        const video = yield getVideo(videoId);
        return (video === null || video === void 0 ? void 0 : video.status) === undefined;
    });
}
exports.isVideoNew = isVideoNew;
