import { db, storage } from "./firebase.js";

export function writeNewMentor(uid, data, picture) {
  putImage(picture, uid);
  return db
    .ref()
    .child("mentors")
    .child(uid)
    .set(data);
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
    mentorImageRef
      .put(picture)
      .then(() => {
        getImage(pictureName).then(url => {
          setImage(pictureName, url);
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
}

function deleteImage(pictureName) {
  const storageRef = storage.ref();
  let desertRef = storageRef.child("images/" + pictureName);
  if (desertRef) {
    desertRef.delete().catch(function(error) {
      if (error.code === "storage/unauthorized") {
        console.log("No image for this mentor was storaged");
      }
    });
  }
}

export function getMentors() {
  const mentors = db.ref("mentors");
  return mentors.once("value");
}

export function getAdmin(uid) {
  const admin = db.ref("admin");
  return admin.child(uid).once("value");
}

export function getMentor(uid) {
  const mentor = db.ref("mentors");
  return mentor.child(uid).once("value");
}

export function getMentorState(uid) {
  const mentor = db.ref("mentors");
  return mentor
    .child(uid)
    .child("mentorState")
    .once("value");
}

export function getAvailableMentors() {
  const mentors = db.ref("mentors");

  return mentors
    .orderByChild("available")
    .equalTo(true)
    .once("value");
}

export function getImage(key) {
  const childName = "images/" + key;
  const storageRef = storage.ref();
  const starsRef = storageRef.child(childName);
  return starsRef.getDownloadURL();
}

export function deleteMentor(mentorKey) {
  getImageName(mentorKey)
    .then(snapshot => {
      if (
        snapshot.val().pictureName !==
        "/static/media/baseline_photo.2f761052.png"
      ) {
        deleteImage(mentorKey);
      }
    })
    .catch(error => {
      let msg = "No image was founded";
    });

  const mentorToDelete = db
    .ref()
    .child("mentors")
    .child(mentorKey);
  return mentorToDelete.remove();
}

export function writeMentorWithoutEmail(data, picture) {
  const newMentorsKey = db
    .ref()
    .child("mentors")
    .push().key;
  const updates = {};
  updates["/mentors/" + newMentorsKey] = data;
  putImage(picture, newMentorsKey);
  return db.ref().update(updates);
}

export function setState(mentorsKey, state) {
  return db
    .ref()
    .child("mentors")
    .child(mentorsKey)
    .child("mentorState")
    .set(state);
}

export function setImage(mentorsKey, url) {
  return db
    .ref()
    .child("mentors")
    .child(mentorsKey)
    .child("pictureName")
    .set(url);
}

export function deleteUser(userId, rol) {
  if (rol === "mentor") {
    getImageName(userId)
      .then(snapshot => {
        if (
          snapshot.val().pictureName !==
          "/static/media/baseline_photo.2f761052.png"
        ) {
          deleteImage(userId);
        }
      })
      .catch(error => {
        let msg = "No image was founded";
      });

    rol = "mentors";
  }

  return db
    .ref()
    .child(rol)
    .child(userId)
    .remove();
}

export function getMentee(uid) {
  const mentor = db.ref("mentee");
  return mentor.child(uid).once("value");
}

export function editMentee(data, menteeKey) {
  const updates = {};
  updates["/mentee/" + menteeKey] = data;
  return db.ref().update(updates);
}

export function getImageName(uid) {
  const mentor = db.ref("mentors");
  return mentor
    .child(uid)
    .child("pictureName")
    .once("value");
}

export function getUserName(uid, rol) {
  const userRef = db.ref(rol);
  return userRef
    .child(uid)
    .child("name")
    .once("value");
}
