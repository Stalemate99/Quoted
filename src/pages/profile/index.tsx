import React, { useState } from "react";
import {
  useAuthState,
  useUpdatePassword,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import {
  collection,
  doc,
  getDocs,
  query,
  where,
  writeBatch,
} from "firebase/firestore";

import Navbar from "@/components/Navbar/Navbar";
import { auth, firestore, storage } from "@/firebase/config";
import { DEFAULT_TOAST_CONFIG } from "@/utils/toastUtils";

import { INITIAL_PROFILE_STATE } from "@/constants/profile_constants";

type ProfileProps = {};
type UpdatedData = { name?: string; pic?: any };

const Profile: React.FC<ProfileProps> = () => {
  const [user] = useAuthState(auth);
  const [formData, setFormData] = useState(INITIAL_PROFILE_STATE);
  const [updateProfile] = useUpdateProfile(auth);
  const [updatePassword] = useUpdatePassword(auth);

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === "pic") {
      const fileContent = event.target.files;

      setFormData((prevVal) => ({
        ...prevVal,
        [event.target.name]: fileContent,
      }));

      return;
    }

    setFormData((prevVal) => ({
      ...prevVal,
      [event.target.name]: event.target.value,
    }));
  };

  const handleProfileUpdate = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    // Checks password for the following conditions,
    // Minimum eight characters, at least one letter, one number and one special character
    const passwordCheck =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,32}$/;

    // Check for single worded user name
    const nameCheck = /^[A-Za-z0-9_]+$/;

    try {
      const updatedData: UpdatedData = {};
      const curAuthorName = user?.displayName;

      if (formData.name && formData.name !== user?.displayName) {
        if (formData.name.match(nameCheck)) {
          const isUpdateSuccess = await updateProfile({
            displayName: formData.name,
          });
          if (isUpdateSuccess) {
            updatedData["name"] = formData.name;
            toast.success("Updated author name.", DEFAULT_TOAST_CONFIG);
          }
        } else {
          toast.warn(
            "Please enter one word. Only '_' is allowed.",
            DEFAULT_TOAST_CONFIG
          );
        }
      }

      if (formData.curPassword) {
        if (formData.newPassword.match(passwordCheck)) {
          const isUpdateSuccess = await updatePassword(formData.newPassword);
          if (isUpdateSuccess)
            toast.success("Updated password.", DEFAULT_TOAST_CONFIG);
        } else {
          toast.warn(
            "Minimum eight characters, at least one letter, one number and one special character required",
            DEFAULT_TOAST_CONFIG
          );
        }
      }

      if (formData.pic) {
        const photoRef = ref(storage, user?.displayName + "_profile_pic");

        const picSnapshot = await uploadBytes(photoRef, formData.pic[0]);

        const url = await getDownloadURL(picSnapshot.ref);

        const isUpdateSuccess = await updateProfile({
          photoURL: url,
        });

        if (isUpdateSuccess) {
          updatedData["pic"] = url;
          toast.success("Updated profile picture.", DEFAULT_TOAST_CONFIG);
        }
      }

      if (!!updatedData.name || !!updatedData.pic) {
        const quotesQuery = query(
          collection(firestore, "quotes"),
          where("author_name", "==", curAuthorName)
        );
        const quoteSnap = await getDocs(quotesQuery);
        const batchRef = writeBatch(firestore);

        quoteSnap.forEach((queryDoc) => {
          const queryRef = doc(firestore, "quotes", queryDoc.id);

          batchRef.update(queryRef, {
            author_name: updatedData?.name || user?.displayName,
            author_pic: updatedData?.pic || user?.photoURL,
          });
        });

        await batchRef.commit();
      }
    } catch (error) {
      toast.warn(
        "Error occured while updating profile. Please try again",
        DEFAULT_TOAST_CONFIG
      );
    }
  };

  return (
    <main className="relative flexbg-gradient-to-b from-yellow-900 to-yellow-100 h-screen w-full bg-amber-100">
      <Navbar />
      <section className="flex flex-col items-center gap-2 m-4">
        <h1 className="text-amber-900 font-medium text-2xl">Profile</h1>
        <form
          onSubmit={handleProfileUpdate}
          className="flex flex-col gap-4 max-h-[70vh] p-2 w-[90%] lg:w-[50%] pl-4 bg-white rounded-lg items-center"
        >
          <fieldset className="flex items-center justify-between gap-4 w-full rounded-lg p-2">
            <label htmlFor="name" className="text-amber-900 font-medium w-fit">
              Author Name :
            </label>
            <input
              onChange={handleFormChange}
              type="text"
              defaultValue={user?.displayName || ""}
              name="name"
              id="name"
              autoComplete="username"
              className="flex items-center grow h-10 text-amber-900 font-medium border-2 border-amber-900 px-2 py-1 rounded"
            />
          </fieldset>
          <fieldset className="flex items-center gap-4 w-full rounded-lg p-2">
            <label
              htmlFor="pic"
              className="text-amber-900 font-medium min-w-fit"
            >
              Upload Profile Picture :
            </label>
            <label
              htmlFor="pic"
              className="flex items-center w-fit text-amber-900 font-medium cursor-pointer border-2 border-amber-900 rounded-lg px-2 h-10"
            >
              <input
                onChange={handleFormChange}
                type="file"
                name="pic"
                id="pic"
                autoComplete="photo"
                className="hidden"
              />
              Upload Pic
            </label>
          </fieldset>
          <fieldset className="flex flex-col gap-4 w-full rounded-lg p-2 ">
            <label
              htmlFor="newPassword"
              className="text-amber-900 font-medium w-fit text-lg"
            >
              Do you want to change password?
            </label>
            <div>
              <label
                htmlFor="curPassword"
                className="text-amber-900 font-medium w-fit"
              >
                Enter current password :
              </label>
              <input
                onChange={handleFormChange}
                type="password"
                name="curPassword"
                id="curPassword"
                autoComplete="current-password"
                className="flex items-center grow h-10 text-amber-900 font-medium border-2 border-amber-900 px-2 py-1 rounded"
              />
            </div>
            <div>
              <label
                htmlFor="newPassword"
                className="text-amber-900 font-medium w-fit"
              >
                Enter new password :
              </label>
              <input
                type="password"
                name="newPassword"
                id="newPassword"
                autoComplete="new-password"
                className="flex items-center grow h-10 text-amber-900 font-medium border-2 border-amber-900 px-2 py-1 rounded"
              />
            </div>
          </fieldset>
          <button
            type="submit"
            className="inline-block w-fit h-12 rounded bg-amber-900 px-5 pb-1 pt-2 text-md font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#e4a11b] transition duration-150 ease-in-out hover:bg-amber-800 hover:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] focus:bg-amber-800 focus:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] focus:outline-none focus:ring-0 active:bg-amber-600 active:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] md:px-6 md:pb-2 mb-2"
          >
            Save Changes
          </button>
        </form>
      </section>
    </main>
  );
};

export default Profile;
