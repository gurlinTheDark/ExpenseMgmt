
import  React, {useState, useEffect} from 'react';
import SideBar from './SideBar';
import ExpenseManagementContainer from './ExpenseManagement/index'
import ReportingContainer from './Reporting/index';

export default function HomeContainer (){
	/*const TABS= [{
	name: "Expense Management", acc: "EM"
	}, {
		name: "Reporting", acc: "R"
	}];
	const [tabSelected, setTabSelected] = useState(TABS[0].acc);
	const renderTab = ()=>{
		if(tabSelected === "EM")
			return <ExpenseManagementContainer/>
			return <ReportingContainer/>
	}

	useEffect(()=>{
		renderTab();
	}, [tabSelected])*/
  	return (
	      	
		    	<ReportingContainer/>
  );
}