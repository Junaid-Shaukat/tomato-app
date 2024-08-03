import React, { useEffect, useState } from "react";
import "./List.css";
import { toast } from "react-toastify";
import axios from "axios";
const List = ({url}) => {

  const [list, setList] = useState([]);

  const fecthList = async () => {
    const respone = await axios.get(`${url}/api/food/list`);
    if (respone.data.success) {
      setList(respone.data.data);
    } else {
      toast.error("Error fetching list: " + respone.data.message);
    }
  };

  const removeFood = async (foodId) => {
           const response = await axios.post(`${url}/api/food/remove/`,{id:foodId});
           await fecthList();
            if(response.data.success){
                toast.success(response.data.message);
            }
                else{
                    toast.error(response.data.message);
                }
  }

  useEffect(() => {
    fecthList();
  }, []);

  return (
    <div className="list add flex-col">
      <p>All Food List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => {
          return (
            <div key={index} className="list-table-format">
              <img src={`${url}/images/` + item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <button onClick={()=>removeFood(item._id)} className="cursor">Delete</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
