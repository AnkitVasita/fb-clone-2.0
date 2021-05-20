import { useRef, useState } from "react";
import { EmojiHappyIcon } from "@heroicons/react/outline";
import { CameraIcon, VideoCameraIcon } from "@heroicons/react/solid";
import { useSession } from "next-auth/client";
import Image from "next/image";
import { db, storage } from "../firebase";
import firebase from "firebase";

const InputBox = () => {
  const [
    {
      user: { name, image, email },
    },
  ] = useSession();
  const inputRef = useRef(null);
  const filePickerRef = useRef(null);
  const [imageToPost, setImageToPost] = useState(null);

  const sendPost = (e) => {
    e.preventDefault();

    if (!inputRef.current.value) return;

    db.collection("posts")
      .add({
        message: inputRef.current.value,
        name,
        email,
        image,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then((doc) => {
        if (imageToPost) {
          const uploadTask = storage
            .ref(`posts/${doc.id}`)
            .putString(imageToPost, "data_url");

          removeImage();

          uploadTask.on(
            "state_change",
            null,
            (error) => console.error(error),
            () => {
              // when the upload completes
              storage
                .ref("posts")
                .child(doc.id)
                .getDownloadURL()
                .then((url) => {
                  db.collection("posts").doc(doc.id).set(
                    {
                      postImage: url,
                    },
                    { merge: true }
                  );
                });
            }
          );
        }
      });

    inputRef.current.value = "";
  };

  const addImage = (e) => {
    const reader = new FileReader();

    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setImageToPost(readerEvent.target.result);
    };
  };

  const removeImage = () => {
    setImageToPost(null);
  };

  return (
    <div
      className="bg-white p-2 rounded-2xl shadow-md text-gray-500
    font-medium mt-6"
    >
      <div className="flex space-x-4 p-4 items-center">
        <Image
          className="rounded-full "
          src={image}
          width={40}
          height={40}
          layout="fixed"
        />

        <form className="flex flex-1">
          <input
            type="text"
            placeholder={`What's on your mind, ${name}?`}
            className="rounded-full h-12 bg-gray-100 flex-grow px-5
            focus:outline-none"
            ref={inputRef}
          />

          {imageToPost && (
            <div
              onClick={removeImage}
              className="flex flex-col cursor-pointer hover:brightness-110 transition duration-150 transform hover:scale-105"
            >
              <img
                src={imageToPost}
                className="h-10 object-contain"
                alt="Image To Post"
              />
              <p className="text-xs text-red-500 text-center">Remove</p>
            </div>
          )}
          <button className="hidden" onClick={sendPost}>
            submit
          </button>
        </form>
      </div>

      <div className="flex justify-evenly p-3 border-t">
        <div className="inputIcon">
          <VideoCameraIcon className="h-7 text-red-500" />
          <p className="hidden sm:inline-flex text-xs sm:text-sm xl:text-base">
            Live Video
          </p>
        </div>
        <div
          onClick={() => filePickerRef.current.click()}
          className="inputIcon"
        >
          <CameraIcon className="h-7 text-green-400" />
          <p className=" hidden sm:inline-flex text-xs sm:text-sm xl:text-base">
            Photo/Video
          </p>
          <input onChange={addImage} type="file" ref={filePickerRef} hidden />
        </div>
        <div className="inputIcon">
          <EmojiHappyIcon className="h-7 text-yellow-300" />
          <p className="hidden sm:inline-flex  text-xs sm:text-sm xl:text-base">
            Feeling/Activity
          </p>
        </div>
      </div>
    </div>
  );
};

export default InputBox;
