
import  React, {useState, useEffect} from 'react';


import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";


export default function BarChart ({expenses, xAxis, expenseType}){
	const [series, setSeries] = useState([])
	useEffect(()=>{
		const recs= [];

		expenseType.forEach((expense)=>{
			let data = new Array(xAxis.length).fill(0);
			let allExpensesByType = expenses.filter((obj)=>obj.expenseType === expense);
			allExpensesByType.forEach((expense)=>{
				data[xAxis.indexOf(expense.expenseDate)] = parseFloat(expense.amount);
			})
			recs.push({name: expense, data:data });
		})
		setSeries(recs);
	}, [expenses])
	const options = {
		chart: {
			type: 'column'
		},

    xAxis: {
        categories: xAxis,
          title: {
            text: null
        }
    },
     yAxis: {
        min: 0,
        title: {
            text: 'Total expenses'
        },
    },
     plotOptions: {
        column: {
            stacking: 'normal',
            dataLabels: {
                enabled: true
            }
        }
    },
	  title: {
	    text: 'Daily Expenses Report'
	  },
	   
	  series:series
	}

  	return (
	    <HighchartsReact
	      highcharts={Highcharts}
	      options={options}
	    />
  );
}