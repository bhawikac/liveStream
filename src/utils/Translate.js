import React from 'react'
import { FormattedMessage } from 'react-intl';
// import {flattenMessages} from './flattenMessages'
// //const defaults = require('../translations/en.json');
// import messages_en from '../translations/en.json';

// const message=messages_en;



export function Translate({ id,defaultMessage, values }) {
  //  debugger;
  return (
   // <FormattedMessage id={id} values={values} defaultMessage={defaults[id]} />
   // <FormattedMessage id={id} values={values} defaultMessage={flattenMessages(message)[id]} />
   <FormattedMessage id={id} values={values} defaultMessage={defaultMessage} />
  );
}