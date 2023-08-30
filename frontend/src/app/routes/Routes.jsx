import React from "react";
import { Route, Routes as RoutesContainer } from "react-router-dom";

import { ROLE_ADMIN } from "../constants/rolesConstant";
import * as URL from "../constants/urls/urlFrontEnd";
import WelcomeView from "../views/WelcomeView"
import ProfileView from "../views/profile/ProfileView";
import ProfilePublicView from "../views/profile/ProfilPublicView";
import ProfileChangeView from '../views/profile/ProfileChangeView'
import PasswordChangeView from "../views/PasswordChangeView"
import AccountConfirmDeleteView from "../views/Account/AccountConfirmDeleteView";
import BankDetailsView from "../views/BankDetailsView";
import PaymnentPreferenceView from "../views/PaymentPreferenceView";
import { PrivateRoute } from "./PrivateRoute";
import PopUpRegister from "../components/login-register/PopUpRegister/PopUpRegister";
import SearchListItinerary from "../views/itinerary/SearchListItinerary";
import ItineraryDetails from "../views/itinerary/ItineraryDetails";
import ContactUs from "../views/ContactUs";
import ReservedItinerary from './../views/itinerary/ReservedItinerary';
import ResetPassword from './../views/resetPasswordTest/ResetPassword';
import { CreateTravel } from "../views/itinerary/CreateTravel";
import ConfirmTravel from './../views/itinerary/ConfirmTravel';
import ErrorView from "../views/ErrorView";
import MessageView from './../views/MessageView';
import AdminView from "../views/AdminView";
import AdminUser from '../components/admin/user/AdminUser';
import AdminTravel from "../components/admin/travel/AdminTravel";
import AdminComment from "../components/admin/commentary/AdminComment";
import NoteTravel from "../views/itinerary/NoteTravel";
import CreditsView from "../views/credits/CreditsView";
import ChoiceCredits from "../views/credits/ChoiceCredits";
import ConfirmCredits from "../views/credits/ConfirmCredits";
import RecapCredits from "../views/credits/RecapCredits";
import Faq from "../views/Faq";
import CalendarTest from "../views/test/CalendarTest";
import OfferCredit from "../views/credits/OfferCredit";
import TransactionDashboard from "../views/profile/TransactionDashboard";
import AdminDashboardUser from "../views/admin/AdminDashboardUser";
import NewProfileUser from "../views/profile/NewProfileUser";
import StripePageTest from "../views/test/StripePageTest";
import AddCarProfileView from "../views/profile/AddCarProfileView";
import AdminUserCarView from "../views/admin/AdminUserCarView";
import AdminTravelUser from "../views/admin/AdminTravelUser";
import Archive from "../components/admin/Archive/Archive";
import AdminCommentaryUser from "../views/admin/AdminCommentaryUser";
import TravelManagement from './../views/profile/TravelManagement';
import AccountStatusView from "../views/profile/AccountStatusView";

/**
 * Routes of the application
 * with public and private route
 *
 * @author Peter Mollet
 */
const Routes = () => {

  return (
    <RoutesContainer>
      {/* PRIVATE ROUTES */} 
          {/* PROFILE */}
          <Route path={URL.URL_PROFILE} element={<PrivateRoute><ProfileView /></PrivateRoute>} />  
          <Route path={URL.URL_NEW_PROFILE} element={<PrivateRoute><NewProfileUser isUser={true} /></PrivateRoute>} />   
          <Route path={URL.URL_TRAVEL_MANAGEMENT} element={<PrivateRoute><TravelManagement /></PrivateRoute>} />    
          <Route path={URL.URL_PROFILE_PUBLIC} element={<PrivateRoute><ProfilePublicView /></PrivateRoute>} />   
          <Route path={URL.URL_PROFILE_CHANGE} element={<PrivateRoute><ProfileChangeView /></PrivateRoute>} />          
          <Route path={URL.URL_ACCOUNT_DELETE} element={<PrivateRoute><AccountStatusView suppr={true}/></PrivateRoute>}/>
          <Route path={URL.URL_CONFIRM_DELETE_ACCOUNT} element={<PrivateRoute><AccountConfirmDeleteView/></PrivateRoute>}/>
          <Route path={URL.URL_ACCOUNT_DISABLE} element={<PrivateRoute><AccountStatusView suppr={false}/></PrivateRoute>}/>
          <Route path={URL.URL_PASSWORD_CHANGE} element={<PrivateRoute><PasswordChangeView /></PrivateRoute>} />
          <Route path={URL.URL_PAYMENT_PREFERENCE} element={<PrivateRoute><PaymnentPreferenceView /></PrivateRoute>} />
          <Route path={URL.URL_BANK_DETAILS} element={<PrivateRoute><BankDetailsView/></PrivateRoute>} />
          <Route path={URL.URL_TRANSACTION} element={<PrivateRoute><TransactionDashboard/></PrivateRoute>} />
          <Route path={URL.URL_ADD_CAR_PROFILE} element={<PrivateRoute><AddCarProfileView/></PrivateRoute>} />
          {/* TRAVEL */}
          <Route path={URL.URL_CONFIRM_TRAVEL} element={<PrivateRoute><ConfirmTravel/></PrivateRoute>} />
          <Route path={URL.URL_RESERVED_ITINERARY} element={<PrivateRoute><ReservedItinerary/></PrivateRoute>} />
          <Route path={URL.URL_CREATE_TRAVEL} element={<PrivateRoute><CreateTravel/></PrivateRoute>} />
          <Route path={URL.URL_NOTE_TRAVEL} element={<PrivateRoute><NoteTravel/></PrivateRoute>} />
          {/* MESSAGE */}
          <Route path={URL.URL_MESSAGE} element={<PrivateRoute><MessageView/></PrivateRoute>} />
          {/* ADMIN */}
          <Route path={URL.URL_ADMIN} element={<PrivateRoute><AdminView/></PrivateRoute>} >
            <Route path={URL.URL_ADMIN_USER} element={<AdminUser/>} />
            <Route path={URL.URL_ADMIN_TRAVEL} element={<AdminTravel/>} />
            <Route path={URL.URL_ADMIN_COMMENT} element={<AdminComment/>} />       
            <Route path={URL.URL_ADMIN_ARCHIVE} element={<Archive/>} />      
          </Route>
          
          <Route path={URL.URL_ADMIN_DASHBOARD} element={<PrivateRoute><AdminDashboardUser /></PrivateRoute>} /> 
          <Route path={URL.URL_ADMIN_CAR_USER} element={<PrivateRoute><AdminUserCarView /></PrivateRoute>} />
          <Route path={URL.URL_ADMIN_TRAVELUSER} element={<PrivateRoute><AdminTravelUser /></PrivateRoute>} />
          <Route path={URL.URL_ADMIN_COMMENTARY_USER} element={<PrivateRoute><AdminCommentaryUser /></PrivateRoute>} />
          {/* CREDITS */}
          <Route path={URL.URL_CREDITS} element={<PrivateRoute><CreditsView/></PrivateRoute>} />
          <Route path={URL.URL_BUY_CREDITS} element={<PrivateRoute><ChoiceCredits buy={true}/></PrivateRoute>} />
          <Route path={URL.URL_SELL_CREDITS} element={<PrivateRoute><ChoiceCredits buy={false}/></PrivateRoute>} />
          <Route path={URL.URL_CONFIRM_BUY_CREDITS} element={<PrivateRoute><ConfirmCredits buy={true}/></PrivateRoute>} />
          <Route path={URL.URL_CONFIRM_SELL_CREDITS} element={<PrivateRoute><ConfirmCredits buy={false}/></PrivateRoute>} />
          <Route path={URL.URL_RECAP_BUY_CREDITS} element={<PrivateRoute><RecapCredits buy={true}/></PrivateRoute>} />
          <Route path={URL.URL_RECAP_SELL_CREDITS} element={<PrivateRoute><RecapCredits buy={false}/></PrivateRoute>} />
          <Route path={URL.URL_OFFER_CREDIT} element={<PrivateRoute><OfferCredit/></PrivateRoute>} />

      {/* PUBLIC ROUTES */}
          <Route path={URL.URL_REGISTER} element={<PopUpRegister/>} />
          <Route path={URL.URL_WELCOME} element={<WelcomeView />} />
          <Route path={URL.URL_SEARCH_LIST} element={<SearchListItinerary/>} />
          <Route path={URL.URL_DETAIL_ITINERARY} element={<ItineraryDetails/>} />
          <Route path={URL.URL_FORGOT_PASSWORD} element={<ResetPassword />} />
          <Route path={URL.URL_CONTACT_US} element={<ContactUs/>} />    
          <Route path={URL.URL_ERROR_404} element={<ErrorView />} />
          <Route path={URL.URL_FAQ} element={<Faq />} />
          <Route path={URL.URL_PROFIL_VIEWER} element={<NewProfileUser isUser={false} />} />


        {/* TEST */}
        <Route path="/test" element={<CalendarTest />} />
        <Route path="/stripe" element={<StripePageTest />} />
    
    </RoutesContainer>
  );
};


export default Routes;
