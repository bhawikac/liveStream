import React, { Fragment } from "react";
import PageTitle from "../../components/PageTitle";
import { Translate } from "../../utils/Translate";
import { Typography, Button } from "@material-ui/core";
import { withRouter } from 'react-router-dom';
import Routes from '../../components/Router/Routes'

function PaymentDone(props) {
  const goBackToHome = () => {
    props.history.push(Routes.classListViewRoute)
  }
  return (
    <Fragment>
      <div className="page-container m-t-55 m-t-xs-20">
        <PageTitle label= {Translate({ id: "Subscription.FinalHead" })}/>
        <Typography variant="h6" className="text-gray m-b-20">
        {Translate({ id: "Subscription.FinalMsg" })}
                    </Typography>
        <Button fullWidth
          variant="contained"
          color="secondary"
          className="m-t-55 m-t-xs-20 payButton"
          onClick={goBackToHome}
        >
          <Typography variant="button">
            {Translate({ id: "Subscription.backbutton" })}
            
          </Typography>
        </Button>
      </div>
    </Fragment>
  )
};

export default withRouter(PaymentDone);
