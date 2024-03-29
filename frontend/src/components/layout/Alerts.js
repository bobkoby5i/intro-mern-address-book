import React, {useContext} from 'react'
import AlertContext from '../../context/alert/alertContext';


const Alerts = () => {
  const alertContext = useContext(AlertContext);
  console.log("inside alert component", alertContext.alerts)
  return (
        alertContext.alerts.map((alert)=>{
            return (<div key={alert.id} className={`alert alert-${alert.type}`}>
                <i className="fas fa-info-circle"></i>{" "}{alert.msg}
            </div>)
        })
  )
}


export default Alerts;