import { createSelector } from "reselect";
import { ConsentType } from "../../utils/constants";
import { Redirect } from "react-router-dom";
import React, { Component } from "react";

const consentsDetail = state => state.auth.consents;
const userConsentDetail = state => state.auth.userConsent;

export const getTNCConsent = createSelector( 
  [consentsDetail],
  consents => {
    let selectedConsent = null;   
    let tncConsent = {
      tag: "",
      label: "",
    };
    console.log([consentsDetail]);

    if (consents != null && consents.length > 0) {
      let consent = consents.filter(x => x.policy === ConsentType.TNC);
      if (consent != null) {
        selectedConsent = consent[0];
        console.log("text");
      }
    }
    if (selectedConsent != null) {
      tncConsent.tag = selectedConsent.consentTag;
      tncConsent.label = CreateConsentText(selectedConsent);
      console.log("text");
    }
    return tncConsent;
  }
);

export const getMKTGConsent = createSelector(
  [consentsDetail],
  consents => {
    let selectedConsent = null;
    let mktgConsent = {
      tag: "",
      label: "",
    };
    if (consents != null && consents.length > 0) {
      let consent = consents.filter(x => x.policy === ConsentType.Marketing);
      if (consent != null) {
        selectedConsent = consent[0];
      }
    }
    if (selectedConsent != null) {
      mktgConsent.tag = selectedConsent.consentTag;
      mktgConsent.label = CreateConsentText(selectedConsent);
    }
    return mktgConsent;
  }   
);
 
const CreateConsentText = consentDetail => {
  let selectedConsent = consentDetail;
  let consentText = "";
  if (selectedConsent != null) {
    consentText = selectedConsent.title;
    console.log(consentText)
    if (selectedConsent.urls.length > 0) {
      selectedConsent.urls.forEach(element => {
        consentText = consentText.replace(
          consentText,
          `<a href="/tc" target="blank" class="controledClass dynamiclinks linkFontSize"> ${
            consentText
          } </a>`
        );
      });
    }
    return consentText;
  }
};

export const LatestTncStatus = createSelector(
  [userConsentDetail],
  userConsent => {
    let latestTncAccepted = true;
    if (userConsent != null && userConsent.length > 0) {
      const userTncConsent = userConsent.filter(
        x => x.policy === ConsentType.TNC
      );
      if (userTncConsent != null) {
        latestTncAccepted =
          userTncConsent[0].userAccepted &&
          userTncConsent[0].version ===
            userTncConsent[0].userLastActionedVersion;
      }
    }
    return latestTncAccepted;
  }
);

export const LatestMktgStatus = createSelector(
  [userConsentDetail],
  userConsent => {
    let latestMktgActtepted = true;
    if (userConsent != null && userConsent.length > 0) {
      const userMktgConsent = userConsent.filter(
        x => x.policy === ConsentType.Marketing
      );
      if (userMktgConsent != null) {
        latestMktgActtepted =
          userMktgConsent[0].version ===
          userMktgConsent[0].userLastActionedVersion;
      }
    }
    return latestMktgActtepted;
  }
);
