import React, { useState } from "react";
import { alertMessage } from "./alertMessage";
import Login from "./Login";
import SignUp from "./SignUp";

const FeedCard: React.FC<{
  updatePost: (post: string) => void;
  shouldHighlight: boolean;
}> = (props) => {
  const { updatePost, shouldHighlight } = props;
  const [feed, setFeed] = useState<string>("");
  const [openLoginModal, setLoginOpenModal] = useState<boolean>(false);
  const [openSignUpModal, setOpenSignUpModal] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    !!localStorage?.getItem("isLoggedIn")
  );

  const handleLoginCallBack = () => {
    setLoginOpenModal(false);
    setIsLoggedIn(true);
  };

  const isSignUpModal = () => {
    setLoginOpenModal(false);
    setOpenSignUpModal(true);
  };

  const isLoginModal = () => {
    setOpenSignUpModal(false);
    setLoginOpenModal(true);
  };
  return (
    <div className="relative bg-gray-100 p-[5px] rounded-lg">
      <div
        className="flex flex-col m-[5px] rounded-lg bg-white"
        onClick={() => !isLoggedIn && setLoginOpenModal(true)}
      >
        {!openLoginModal && !openSignUpModal && shouldHighlight && (
          <div
            className="absolute inset-0 flex items-center justify-center cursor-pointer"
            style={{ backgroundColor: "#7EBAF7", opacity: 0.5 }}
          ></div>
        )}
        <div className="p-[10px] border-b border-gray-400 ">
          <div className="flex justify-between">
            <span>
              <img
                className="w-[350px]"
                src="/images/input_top.png"
                alt="input"
                onClick={alertMessage}
              />
            </span>
            <span className="flex p-[9px] justify-center bg-red-100 w-[40px] rounded-lg">
              <img
                className="w-5 h-5"
                src="/images/delete.png"
                alt="delete"
                onClick={alertMessage}
              />
            </span>
          </div>
          <div className="flex flex-row gap-2">
            😀
            <textarea
              placeholder="How are you feeling today?"
              className="w-full w-full outline-none border-none resize-none"
              rows={4}
              value={feed}
              readOnly={!isLoggedIn}
              onChange={(e) => setFeed(e.target.value)}
            ></textarea>
          </div>
        </div>
        <div className="flex justify-between p-[10px]">
          <span className="flex flex-row [&>*]:mr-[6px] [&>*]:hover:cursor-pointer">
            <span
              className=" flex justify-center bg-gray-200 w-[30px] rounded-lg"
              onClick={alertMessage}
            >
              +
            </span>
            <img
              className="w-6 h-5"
              src="/images/microphone.png"
              alt="post"
              onClick={alertMessage}
            />
            <img
              className="w-5"
              src="/images/video.png"
              alt="post"
              onClick={alertMessage}
            />
          </span>
          <img
            className="w-7 rotate-45 hover:cursor-pointer"
            src="/images/send_color.png"
            alt="post"
            onClick={() => {
              setFeed("");
              updatePost(feed);
            }}
          />
        </div>
      </div>
      {openLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 pt-[100px]">
          <Login
            shouldHighlight={shouldHighlight}
            handleLoginCallBack={handleLoginCallBack}
            isSignUpModal={isSignUpModal}
          />
        </div>
      )}
      {openSignUpModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 pt-[100px]">
          <SignUp shouldHighlight={shouldHighlight} isLoginModal={isLoginModal} />
        </div>
      )}
    </div>
  );
};
export default FeedCard;
