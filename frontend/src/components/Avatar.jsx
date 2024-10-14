const Avatar = ({ username, userId, selectedUserId, setSelectedUserId }) => {
  const colors = [
    "bg-red-200",
    "bg-green-200",
    "bg-purple-200",
    "bg-blue-200",
    "bg-yellow-200",
    "bg-teal-200",
  ];

  const userIdBase10 = parseInt(userId, 16);
  console.log();

  const color = colors[userIdBase10 % colors.length];

  return (
    <>
      <div
        className={`p-2 cursor-pointer flex items-center gap-2 rounded mb-1 ${
          userId === selectedUserId ? "bg-blue-200" : "bg-slate-100"
        }`}
        onClick={() => setSelectedUserId(userId)}
      >
        <div
          className={`w-8 h-8 ${color} rounded-full flex items-center justify-center`}
        >
          <span className="opacity-50 font-bold capitalize">{username[0]}</span>
        </div>

        <span className="text-md font-semibold">{username}</span>
      </div>
    </>
  );
};

export default Avatar;
