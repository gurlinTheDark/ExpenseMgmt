
import  React, {useState, useEffect} from 'react';
import api from '../apis/api';
import apiMethods from '../apis/apiMethods';
import moment from 'moment';
import DatePicker from "./DatePicker";
import BarChart from './BarCharts';
import PieChart from './PieChart';
import CreateForm from './createForm';

export default function ReportingContainer (){
	const [loading, setLoading] = useState(false);
	const [expenses, setExpenses] = useState([]);
	const [expenseType, setExpenseType]= useState([]);
	const [isCreateFormVisible, setIsCreateFormVisible] = useState(false);
	const getExpenses = apiMethods(api.getExpenses); 
	const createExpenses = apiMethods(api.createExpenses);
  	const [fromDate, setFromDate] = useState(new Date());  
  	const [toDate, setToDate] = useState(new Date());  
 	const [error, setError] = useState("");  
	const deleteExpense = apiMethods(api.deleteExpense); 
	const deleteRecord= (e)=>{
		const body = {"expenseId": parseInt(e.target.getAttribute('data-remove'))};
		deleteExpense.request(body);
	}
 	useEffect(()=>{
    	getExpenses.request();
	}, [])


  	useEffect(()=>{
  		if(fromDate>toDate){
  			setError("From date greater than To Date");
  		}
  		else {
  			setError("");
  		}
  	}, [fromDate, toDate]);

  	const filterData = ()=>{
  		getExpenses.request();
  	}
  	const  getDaysArray = function(s,e) {
  		for(var a=[],d=new Date(s);d<=new Date(e);d.setDate(d.getDate()+1)){ 
  			a.push(moment(d).format('yyyy-MM-DD'));}
  			return a;};

  	const createExpenseHandler = (body)=>{
		body['id'] = "" + Math.floor(Math.random() * (1000000 - 10 + 1) + 10)+  Math.floor(Math.random() * (1000000 - 10 + 1) + 10);
		createExpenses.request(body)
		setIsCreateFormVisible(false);
		getExpenses.request();

	};		
  		
  	useEffect(()=>{
  		let expenses = [];

		const expenseType =[...new Set(getExpenses.data?.Items?.map(obj=>obj.expenseType['S']))];
  			setExpenseType(expenseType)
  		getExpenses.data?.Items?.map((obj)=>{

			
  			if(moment(obj.date['S'], 'yyyy-MM-DD') >= moment(fromDate) && moment(obj.date['S'], 'yyyy-MM-DD')<= moment(toDate)){
  				expenses.push({expenseId: obj.expenseId['N'], expenseDate: obj.date['S'], expenseType: obj.expenseType['S'], amount: obj.expense['N']})
  			}
  			setExpenses(expenses);
  		})
  	},[getExpenses.data?.Items])		
  	return (

	   <div className="module-container">
	   			<div className="row">
		   			{getExpenses.loading && <p className="info"> Please wait, Expenses are loading!</p>}
		        	{getExpenses.error && <p className="error">{getExpenses.error}</p>}
		        	{error && <p className="error">{error}</p>}
		        </div>	
	        	<div className="row">
					{isCreateFormVisible && (
	   					<CreateForm createExpenseHandler={createExpenseHandler}/>)}
		        	<div>
		        	<label>From Date</label>

		        	<DatePicker type="date" selected={fromDate} onChange={(date) =>setFromDate(date)}/>
		        	</div>
		        	<div>
		        		<label>To Date</label>
		        		<DatePicker type="date" selected={toDate} onChange={(date) => setToDate(date)}/>
		        	</div>	
		        	<button onClick={filterData}>Filter</button>
			   		
			   		
		        	<button onClick={()=>setIsCreateFormVisible(!isCreateFormVisible)}>+Create</button>
			   	</div>
		   		<div className="row">
			        <table>
			   				<thead>
			   				<tr className="left">
			   					<th>Date</th>
			   					<th>Expense</th>
			   					<th>Expense Type</th>
			   					<th>Expense Id</th>
			   					<th>Action</th>
			   				</tr>
			   				</thead>
			   				<tbody>
			   				{
							expenses.map((obj)=>{
									return(<tr key={obj.expenseId}>
									<td>{obj.expenseDate}</td>
									<td>{obj.amount}</td>
									<td>{obj.expenseType}</td>
									<td>{obj.expenseId}</td>
									<td><button data-remove={ obj.expenseId } onClick={(e)=>deleteRecord(e)}>X</button></td>
			   					
									</tr>
								)})
			   				}
			   				</tbody>
			   			</table>
			   		</div>	
			   		  <div className="row"><BarChart expenses={expenses} xAxis={getDaysArray(fromDate,toDate)} expenseType={expenseType}/></div>
			   		  <div className="row"><PieChart expenses={expenses} xAxis={getDaysArray(fromDate,toDate)} expenseType={expenseType}/></div>
		   		
		  
	    </div>
  );
}