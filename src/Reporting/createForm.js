
import  React, {useState, useEffect} from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function CreateForm ({createExpenseHandler}){
	
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [amount, setAmount] = useState(0);
	const [expenseType, setExpenseType] = useState('');
	const createExpense = ()=>{
		const body = {
			date : selectedDate.getFullYear() + '-'+ ('0' + selectedDate.getMonth()).slice(-2) + '-'
             + ('0' + (selectedDate.getDate()+1)).slice(-2) ,
			amount: amount,
			type: expenseType
		}
		createExpenseHandler(body);
	}
  	return (

	   <div className="modal">
	   		<div className="modal-content">
	   			<h1>Create An Expense </h1>
	   			<div className="form-control">
	   				<label>Expense Date</label>   
	   				<DatePicker
		   			  selected={selectedDate}
				      onChange={setSelectedDate}
				      dateFormat="yyyy-MM-dd"
				      placeholder="Date"
				    />
				</div>
				<div className="form-control">
					<label>Expense Type</label>    
			    	<input type="text" placeholder="Expense Type" value={expenseType} onChange={(e)=>setExpenseType(e.target.value)}/>
			    </div>
			    <div className="form-control">  
			    	<label>Amount</label>
			    	<input type="number" placeholder="Amount" value={amount}  onChange={(e)=>setAmount(e.target.value)}/>
			    </div> 
			    <div className="footer"> 
			    <button onClick={createExpense}>Save</button>
			    </div> 
	   		</div>
	    </div>
  );
}