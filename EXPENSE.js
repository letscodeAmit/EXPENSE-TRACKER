function saveToLocalStorage(event) {
    event.preventDefault();
    const food1 = event.target.food.value;
    const category1 = event.target.category.value;
    const description1 = event.target.foodname.value;
    // const id = Math.floor(Math.random() * 1000);
    const obj = {
      food1,
      category1,
      description1
      // id,
    };
    axios.post("https://crudcrud.com/api/6973929c871f4794ba7c87cde5ec0ab5/appointmentData",obj)
    .then((Response)=> {
      showOrderOnSreen(Response.data)
      console.log(Response)
    })
    .catch((err)=>{
      //document.body.innerHTML=document.body.innerHTML + "<h4>Something went wrong</h4>"
      console.log(err)

    })
    
    //localStorage.setItem(obj.id, JSON.stringify(obj));
    //showOrderOnSreen(obj);
  }
  
  window.addEventListener("DOMContentLoaded", () => {
    axios.get("https://crudcrud.com/api/6973929c871f4794ba7c87cde5ec0ab5/appointmentData")
    .then((Response)=>{
      // console.log(Response)
      for(var i=0; i<Response.data.length; i++){
        showOrderOnSreen(Response.data[i])
      }
    })
    .catch((error)=>{
      console.log(error)
    })
  });
  
  function showOrderOnSreen(order) {

  
    document.getElementById("food").value = "";
    document.getElementById("category").value = "";
    document.getElementById("foodname").value = "";
    const parentNode = document.getElementById("listOfUsers");

    const childHTML = `<li id=${order._id}> ₹${order.food1} - ${order.category1} - ${order.description1} 
   <button onclick=editUserDetails('${order.food1}','${order.category1}','${order.description1}','${order._id}')>Edit User </button>
     <button onclick=deleteUser('${order._id}')> Delete User </button> </li>`;
    parentNode.innerHTML = parentNode.innerHTML + childHTML;
  }
  //edit
  function editUserDetails(food1, category1, description1,userId) {
    document.getElementById("food").value = food1;
    document.getElementById("category").value = category1;
    document.getElementById("foodname").value = description1;
  
    deleteUser(userId);
  }
  
  function deleteUser(userId) {
    axios.delete(`https://crudcrud.com/api/6973929c871f4794ba7c87cde5ec0ab5/appointmentData/${userId}`)
    .then((Response)=>{
      removeUserFromScreen(userId)
    })
    .catch((err)=>{
      console.log(err)
    });
    // localStorage.removeItem(id);
    // removeUserFromScreen(id);
  }
  
  function removeUserFromScreen(userId) {
    const parentNode = document.getElementById("listOfUsers");
    const childNodeToBeDeleted = document.getElementById(userId);
  if(childNodeToBeDeleted){
        parentNode.removeChild(childNodeToBeDeleted);

  }
  }