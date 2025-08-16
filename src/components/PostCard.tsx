import React from "react";
import { alertMessage } from "./alertMessage";

export interface PostCardProps {
  profileIcon: string;
  name: string;
  message: string;
  reaction?: string;
  time: Date;
}
const PostCard: React.FC<PostCardProps> = (props) => {
  const { profileIcon, name, message, reaction, time } = props;

  const minutespast = Date.now() - time.getTime();
  const diffMinutes = Math.floor(minutespast / 1000 / 60);
  const calculatedHours = Math.floor(diffMinutes / 60);
  const isLoggedIn = !!localStorage?.getItem("isLoggedIn");
  return (
    <div className="flex flex-col bg-gray-100 rounded-lg">
      <div className="bg-white m-[10px] rounded-lg p-[10px] grid grid-cols-[50px_auto] grid-rows-[50px_auto] gap-[4px]">
        <div className=" h-[10px]">
          <img className="w-10 rounded-lg" src={profileIcon} alt="profile" />
        </div>
        <div className="flex flex-col text-[14px]">
          <span>{name}</span>

          <span className="text-gray-400">
            {diffMinutes > 0
              ? calculatedHours > 0
                ? `${calculatedHours} hours ago`
                : `${diffMinutes} minutes ago`
              : "just now"}
          </span>
        </div>
        <div className=" ">
          <span className="w-9 rounded-full bg-gray-200 p-[5px]">
            {reaction}
          </span>
        </div>
        <div className="">
          <span>{message}</span>
        </div>
      </div>

      <div className="flex flex-row m-[15px] mt-[2px] [&>*]:pr-[10px] [&>*]:pl-[10px]">
        <img
          className="w-9"
          src="/images/love.png"
          alt="like"
          onClick={() => {
            if (!isLoggedIn) return;
            alertMessage();
          }}
        />
        <img
          className="w-9"
          src="/images/message.png"
          alt="comment"
          onClick={() => {
            if (!isLoggedIn) return;
            alertMessage();
          }}
        />
        <img
          className="w-9"
          src="/images/send.png"
          alt="share"
          onClick={() => {
            if (!isLoggedIn) return;
            alertMessage();
          }}
        />
      </div>
    </div>
  );
};
export default PostCard;
