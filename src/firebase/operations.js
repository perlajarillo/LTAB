import { db, storage } from "./firebase.js";

export function writeNewMentor(data, picture) {
  const newMentorsKey = db
    .ref()
    .child("mentors")
    .push().key;
  const updates = {};
  updates["/mentors/" + newMentorsKey] = data;
  putImage(picture, newMentorsKey);
  return db.ref().update(updates);
}

export function writeNewMentee(userId, data) {
  db.ref()
    .child("mentee")
    .child(userId)
    .set(data);
}

export function editMentor(data, mentorsKey, picture) {
  const updates = {};
  updates["/mentors/" + mentorsKey] = data;
  putImage(picture, mentorsKey);
  return db.ref().update(updates);
}

function putImage(picture, pictureName) {
  if (picture !== "") {
    const storageRef = storage.ref();
    const fullPicturePath = "images/" + pictureName;
    const mentorImageRef = storageRef.child(fullPicturePath);
    mentorImageRef.put(picture).catch(error => {
      console.log(error);
    });
  }
}

function deleteImage(pictureName) {
  const storageRef = storage.ref();
  let desertRef = storageRef.child("images/" + pictureName);
  if (desertRef) {
    desertRef
      .delete()
      .then(function() {
        console.log("File deleted successfully");
      })
      .catch(function(error) {
        console.log(error);
      });
  }
}
export function getMentors() {
  const mentors = db.ref("mentors");
  return mentors.once("value");
}

export function getImage(key, pictureName) {
  const childName = "images/" + key;
  const storageRef = storage.ref();
  const starsRef = storageRef.child(childName);
  return starsRef.getDownloadURL();
}

export function deleteMentor(mentorKey) {
  const mentorToDelete = db
    .ref()
    .child("mentors")
    .child(mentorKey);
  deleteImage(mentorKey);
  return mentorToDelete.remove();
}
