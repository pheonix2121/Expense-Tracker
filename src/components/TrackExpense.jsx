import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setEditItem, removeItem, premiumHandler} from "../store/ItemRedux";
import { removeItemHandler } from "../store/ItemApi";
import classes from "./TrackExpense.module.css";
import { darkModeHandler } from "../store/AuthRedux";
import CsvFileDown from "./CsvFileDown";

const TrackExpense = () => {
  const items = useSelector((state) => state.item.items);
  const authData = useSelector((state) => state.auth);
  const totalAmount = items.reduce((total, item) => total + +item.amount, 0);
  const modifiedEmail = authData.userEmail.replace(/[@.]/g, "-");
  const dispatch = useDispatch();
  const isPremium = useSelector((state) => state.item.isPremium);


  const handleEdit = (item) => {
    dispatch(setEditItem(item));
  };

  const switchTheme=()=>{
    dispatch(darkModeHandler())
  }

  useEffect(()=>{
    if(totalAmount >= 10000){
      dispatch(premiumHandler(true))
    }else {
      dispatch(premiumHandler(false))
    }


  },[totalAmount])




  const handleDelete = async (id) => {


    const res = await removeItemHandler({
      userEmail: modifiedEmail,
      itemId: id,
    });
    if (res === id) dispatch(removeItem(id));
    else console.log(res);
  };

  return (
    <div className={classes.expense}>
      <h2>Track Expense</h2>
      <CsvFileDown/>
      {isPremium && <button onClick={switchTheme}>Buy Premium</button>}
      
      {items.length === 0 ? (
        <p>No items found.</p>
      ) : (
        <ul>
          <div>
            <h2>Total Amount: {totalAmount}</h2>
          </div>
          {items.map((item) => (
            <li key={item.id}>
              <div>
                <p>Amount: {item.amount}</p>
                <p>Description: {item.description}</p>
                <p>Category: {item.category}</p>
              </div>

              <div>
                <button onClick={() => handleEdit(item)}>Edit</button>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TrackExpense;