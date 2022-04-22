
import  React, {useState, useEffect} from 'react';


import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";


export default function PieChart ({expenses, xAxis, expenseType}){
	const [series, setSeries] = useState([])
	useEffect(()=>{
		const recs= [];
		expenseType.forEach((expense)=>{
			recs.push({name: expense, y: expenses.filter((obj)=>obj.expenseType==expense).reduce((a, obj)=> a+parseFloat(obj.amount), 0)})
		})
		setSeries({data:recs});
	}, [expenses])
	const options = {
		chart: {
			  type: 'pie'
		},

	  title: {
	    text: 'Expenses Breakdown Report'
	  },
	   
	  series:[series]
	}

  	return (
	    <HighchartsReact
	      highcharts={Highcharts}
	      options={options}
	    />
  );
}