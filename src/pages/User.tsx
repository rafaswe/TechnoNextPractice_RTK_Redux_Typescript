import { useState } from "react";
import {
  useGetDataByIDQuery,
  useGetDataQuery,
  usePostDataMutation,
} from "../redux/services/userApi";
import { User } from "../types/UserType";

const User = () => {
  const [newUserData, setNewUserData] = useState<User>({
    id: 10,
    name: "Hello",
    username: "string",
    email: "string",
    phone: "0112222",
  });
  const { data, isLoading } = useGetDataQuery();
  const { data: singleData, isLoading: isSingleDataLoading } =
    useGetDataByIDQuery(1);

  const [
    postData,
    {
      isLoading: isPostLoading,
      isError: isPostError,
      isSuccess: isPostSuccess,
    },
  ] = usePostDataMutation();

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    postData(newUserData);
  };

  return (
    <div>
      {isLoading ? "Loading..." : <p>Total Data : {data?.length}</p>}
      {isSingleDataLoading ? (
        "Loading Single Data..."
      ) : (
        <p>{singleData?.name}</p>
      )}

      {/* POST */}
      {isPostLoading && <p>Posting data...</p>}
      {isPostSuccess && <p>Data posted successfully!</p>}
      {isPostError && <p>Error posting data</p>}
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={newUserData.name}
          onChange={(e) =>
            setNewUserData({ ...newUserData, name: e.target.value })
          }
        />
        <input
          type="email"
          value={newUserData.email}
          onChange={(e) =>
            setNewUserData({ ...newUserData, email: e.target.value })
          }
        />
        <input
          type="text"
          value={newUserData.phone}
          onChange={(e) =>
            setNewUserData({ ...newUserData, phone: e.target.value })
          }
        />
        <button type="submit" disabled={isPostLoading}>
          {isPostLoading ? "Posting..." : "Post"}
        </button>
      </form>
    </div>
  );
};

export default User;
