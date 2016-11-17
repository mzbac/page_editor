import { LOADCONTENT, CONTENTREADY, UPDATECONTENT } from './types';
import firebase from '../firebase';
export function loadContent() {
  return {
    type: LOADCONTENT,
    payload: {}
  };
}

export function contentReady(content) {
  return {
    type: CONTENTREADY,
    payload: { content }
  };
}

export function updateContent(content) {
  const contentRef = firebase.database().ref('contents/testing');
  contentRef.set(content);
  return {
    type: UPDATECONTENT,
    payload: { content }
  };
}