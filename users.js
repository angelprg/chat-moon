const users = [];

const addUser = (socketId, username) => {
  const findUsername = users.find(user => user.username === username);
  if (findUsername)
    return { error: "El nombre de usuario ya está siendo utilizado" };
  const findsocketId = users.find(user => user.socketId === socketId);
  if (findsocketId)
    return { error: "El nombre de usuario ya está siendo utilizado" };
  users.push({ username, socketId });
  return { username, socketId };
};

const removeUser = socketId => {
  const user = getUser(socketId);
  if (!user) return { error: "El usuario no fue encontrado" };
  const userIndex = users.indexOf(user);
  users.splice(userIndex, 1);
};

const getUser = socketId => {
  const user = users.find(user => user.socketId === socketId);
  return user || null;
};

const getUsers = () => {
  return users;
};

module.exports = { addUser, removeUser, getUser, getUsers };
