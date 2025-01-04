import { database } from '../config/firebase';
import { ref, set, push, get, update, remove } from 'firebase/database';
import { onChildAdded, onChildChanged, onChildRemoved, onValue } from 'firebase/database';
/* Create */
export function createNewData(endpoint, dataObject) {
  const refData = ref(database, endpoint);
  const newRefData = push(refData);
  return set(newRefData, dataObject);
}
/* Read */
export function readData(endpoint, key) {
  if (key) {
    // Példa: endpoint: events/-MzpS80DW3ZJdzAs_Iwg
    const refData = ref(database, `${endpoint}/${key}`);
    return get(refData);
  }
  /*ha nincs key */
  const refData = ref(database, endpoint);
  return get(refData);
}
/*Update*/
export function updateData(endpoint, key, dataObject) {
  const refData = ref(database, `${endpoint}/${key}`);
  return update(refData, dataObject);
}
/*Delete */
export function deleteData(endpoint, key) {
  const refData = ref(database, `${endpoint}/${key}`);
  return remove(refData);
}
export function liveRemoved(endpoint, callback) {
  const refData = ref(database, endpoint);
  return onChildRemoved(refData, callback);
}

export function liveAdded(endpoint, callback) {
  const refData = ref(database, endpoint);
  return onChildAdded(refData, callback);
}

export function liveChanged(endpoint, callback) {
  const refData = ref(database, endpoint);
  return onChildChanged(refData, callback);
}
export function liveValue(endpoint, callback) {
  const refData = ref(database, endpoint);
  return onValue(refData, callback);
}
