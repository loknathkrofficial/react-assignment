import React, { useState } from "react";
import FeedCard from "./FeedCard";
import PostCard, { PostCardProps } from "./PostCard";

const postData: PostCardProps[] = [
  {
    profileIcon: "https://i.pravatar.cc/150?img=1",
    name: "loknath",
    time: new Date("2025-08-15T18:42:57Z"),
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco ",
  },
  {
    profileIcon: "https://i.pravatar.cc/150?img=2",
    name: "Temporary",
    time: new Date("2025-08-14T10:00:00Z"),
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];
const LandingPage: React.FC<{ shouldHighlight: boolean }> = (props) => {
  const { shouldHighlight } = props;
  const [allPostFeed, setAllPostFeed] = useState<PostCardProps[]>(postData);
  const updatePost = (newPost: string) => {
    newPost?.length &&
      setAllPostFeed((prev) => [
        {
          profileIcon: `https://i.pravatar.cc/150?img=${
            allPostFeed.length + 1
          }`,
          message: newPost,
          name: `loknath ${allPostFeed.length + 1}`,
          time: new Date(),
        },
        ...prev,
      ]);
  };
  return (
    <>
      <div className="w-[500px] mx-auto flex flex-col gap-8">
        <FeedCard updatePost={updatePost} shouldHighlight={shouldHighlight} />
        <div className="flex flex-col gap-5">
          {allPostFeed?.map((data) => {
            return (
              <PostCard
                profileIcon={data?.profileIcon}
                name={data?.name}
                message={data?.message}
                reaction={"😄"}
                time={data?.time}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};
export default LandingPage;
