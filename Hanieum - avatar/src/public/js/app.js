const avatar = document.getElementById("avatar");

const handleAvatarClick = () => {
  location.href = "http://localhost:3000/";  
};

avatar.addEventListener("click", handleAvatarClick);