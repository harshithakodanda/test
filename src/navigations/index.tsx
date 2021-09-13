import React, { memo } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Routes } from "configs";
import OnBoarding from "container/OnBoarding";
import Login from "container/LoginAndSignUp/Login";
import ForgetPassword from "container/LoginAndSignUp/ForgetPassword";
import RecoveryPassword from "container/LoginAndSignUp/RecoveryPassword";
import ChangePasswordSuccessful from "container/LoginAndSignUp/ChangePasswordSuccessful";
import SignUp from "container/LoginAndSignUp/SignUp";
import VerifyPhoneNumber from "container/LoginAndSignUp/VerifyPhoneNumber";
import SignUpSuccessful from "container/LoginAndSignUp/SignUpSuccessful";
import WorkProfile from "container/UpdateProfile/WorkProfile";
import OtherInformation from "container/UpdateProfile/OtherInformation";
import BasicInformation from "container/UpdateProfile/BasicInformation";
import SentVerifySuccessful from "container/UpdateProfile/SentVerifySuccessful";
import MainTab from "./MainTab";
import Notification from "container/Notification";
import Consults from "container/Consults";
import ConsultDetail from "container/ConsultDetail";
import VideoCall from "container/VideoCall";
import CallReportProblem from "container/CallReportProblem";
import Schedule from "container/Schedule";
import SelectAddress from "container/SelectAddress";
import PastConsultsFilter from "container/PastConsultsFilter";
import PrivateCareLiveChat from "container/PrivateCareLiveChat";
import PastConsultDetail from "container/PastConsultsDetail";
import WriteAnAnswer from "container/WriteAnAnswer";
import ShareMedication from "container/PrivateCareLiveChat/ShareMedication";
import FinanceReport from "container/MyWorkFinanceReport/FinanceReport";
import WithdrawHistory from "container/MyWorkFinanceReport/WithdrawHistory";
import IncomeReport from "container/MyWorkFinanceReport/IncomeReport";
import MyWorkTopics from "container/MyWorkTopics/MyWorkTopics";
import TopicDetails from "container/MyWorkTopics/TopicDetails";
import TopicCreate from "container/MyWorkTopics/TopicCreate";
import TopicAddCondition from "container/MyWorkTopics/TopicAddCondition";
import HealthGuide from "container/MyWorkHealthGuideTips/HealthGuide";
import HealthGuideSavedDetail from "container/MyWorkHealthGuideTips/HealthGuideSavedDetail";
import VideoCallConnected from "container/VideoCallConnected";
import HealthTips from "container/MyWorkHealthGuideTips/HealthTips";
import HealthTipsCreate from "container/MyWorkHealthGuideTips/HealthTipsCreate";
import BankDeposit from "container/Account/BankDeposit";
import BankDepositAddNew from "container/Account/BankDepositAddNew";
import AccountInviteExpert from "container/Account/AccountInviteExpert";
import EndCall from "container/EndCall";
import FinancialEducation from "container/FinancialEducation";
import MyWorkNetwork from "container/MyWork/MyWorkNetwork";
import HealthGuideCreate from "container/MyWorkHealthGuideTips/HealthGuideCreate";
import MyWorkLibrary from "container/MyWork/MyWorkLibrary";
import WorkProfileManagement from "container/MyWork/WorkProfileManagement";
import ServicesManagement from "container/MyWork/ServicesManagement/ServicesManagement";
import SendMessage from "container/MyWork/ServicesManagement/SendMessage";
import OnlineAppointment from "container/MyWork/ServicesManagement/OnlineAppointment";
import SetWorkingDay from "container/MyWork/ServicesManagement/SetWorkingDay";
import SetWorkingTime from "container/MyWork/ServicesManagement/SetWorkingTime";
import FreeConsultDetail from "container/FreeConsultDetail";
import Search from "container/Search";
import RecentSearch from "container/RecentSearch";
import SearchResult from "container/SearchResult";
import SearchSpecialDoctor from "container/SearchSpecial/SearchSpecialDoctor";
import SearchDoctorResults from "container/SearchSpecial/SearchDoctorResults";
import ConditionsAndSymptoms from "container/SearchSpecial/ConditionsAndSymptoms";
import Medications from "container/SearchSpecial/Medications";
import MedicationDetail from "container/SearchSpecial/MedicationDetail";
import SearchSpecialHospital from "container/SearchSpecial/Hospitals";
import TipDetail from "container/HealthFeed/TipDetail";
import HospitalDetail from "container/SearchSpecial/HospitalDetail";
import DoctorFilter from "container/DoctorFilter";
import TopicDetail from "components/Video/VideoPlayer";
import TopicDetailConditions from "container/HealthFeed/TopicDetailConditions";
import FinancialAssessmentQuestionnaire from "container/FinancialAssessment/FinancialAssessmentQuestionnaire";
import HealthFeedStack from "./HealthFeedStack";
import FinancialAssessmentStack from "./FinancialAssessmentStack";
import LogoutMainTab from "./LogoutMainTab";

const Stack = createStackNavigator();

const RootStack = memo(() => {
  return (
    <Stack.Navigator initialRouteName={Routes.OnBoarding}>


      <Stack.Screen
        name={Routes.OnBoarding}
        component={OnBoarding}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Routes.MainTab}
        component={LogoutMainTab}
        options={{ headerShown: false }}
      />
      <Stack.Screen
name={Routes.FinancialAssessmentStack}
component={FinancialAssessmentStack}
options={{ headerShown: false }}
/>


      <Stack.Screen
        name={Routes.Login}
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Routes.ForgetPassword}
        component={ForgetPassword}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Routes.RecoveryPassword}
        component={RecoveryPassword}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Routes.ChangePasswordSuccessful}
        component={ChangePasswordSuccessful}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Routes.SignUp}
        component={SignUp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Routes.VerifyPhoneNumber}
        component={VerifyPhoneNumber}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Routes.SignUpSuccessful}
        component={SignUpSuccessful}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Routes.BasicInformation}
        component={BasicInformation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Routes.WorkProfile}
        component={WorkProfile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Routes.OtherInformation}
        component={OtherInformation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Routes.SentVerifySuccessful}
        component={SentVerifySuccessful}
        options={{ headerShown: false }}
      />
      <Stack.Screen name={Routes.Notification} component={Notification} />
      <Stack.Screen
        name={Routes.Consult}
        component={Consults}
        options={{ headerShown: false }}
      />
      <Stack.Screen name={Routes.ConsultDetail} component={ConsultDetail} />
      <Stack.Screen
        name={Routes.PastConsultDetail}
        component={PastConsultDetail}
      />
      <Stack.Screen
        name={Routes.VideoCall}
        component={VideoCall}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Routes.CallReportProblem}
        component={CallReportProblem}
      />
      <Stack.Screen name={Routes.Schedule} component={Schedule} />
      <Stack.Screen name={Routes.SelectAddress} component={SelectAddress} />
      <Stack.Screen
        name={Routes.PastConsultsFilter}
        component={PastConsultsFilter}
      />
      <Stack.Screen
        name={Routes.PrivateCareLiveChat}
        component={PrivateCareLiveChat}
      />
      <Stack.Screen
name={Routes.HealthFeedStack}
component={HealthFeedStack}
options={{ headerShown: false }}
/>
      <Stack.Screen name={Routes.ShareMedication} component={ShareMedication} />
      <Stack.Screen name={Routes.WriteAnAnswer} component={WriteAnAnswer} />
      <Stack.Screen name={Routes.FinanceReport} component={FinanceReport} />
      <Stack.Screen name={Routes.WithdrawHistory} component={WithdrawHistory} />
      <Stack.Screen name={Routes.IncomeReport} component={IncomeReport} />
      <Stack.Screen name={Routes.MyWorkTopics} component={MyWorkTopics} />
      <Stack.Screen name={Routes.HealthGuide} component={HealthGuide} />
      <Stack.Screen
        name={Routes.HealthGuideSavedDetail}
        component={HealthGuideSavedDetail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Routes.TipDetail}
        component={TipDetail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Routes.VideoPlayer}
        component={TopicDetail}
        options={{ headerShown: false }}
      />
      <Stack.Screen name={Routes.HealthTips} component={HealthTips} />
      <Stack.Screen
        name={Routes.HealthTipsCreate}
        component={HealthTipsCreate}
      />
      <Stack.Screen
        name={Routes.HealthGuideCreate}
        component={HealthGuideCreate}
      />
      <Stack.Screen name={Routes.MyWorkLibrary} component={MyWorkLibrary} />
      <Stack.Screen name={Routes.MyWorkNetwork} component={MyWorkNetwork} />
      <Stack.Screen
        name={Routes.ServicesManagement}
        component={ServicesManagement}
      />
      <Stack.Screen name={Routes.SendMessage} component={SendMessage} />
      <Stack.Screen
        name={Routes.OnlineAppointment}
        component={OnlineAppointment}
      />
      <Stack.Screen name={Routes.SetWorkingDay} component={SetWorkingDay} />
      <Stack.Screen name={Routes.SetWorkingTime} component={SetWorkingTime} />
      <Stack.Screen
        name={Routes.WorkProfileManagement}
        component={WorkProfileManagement}
      />
      <Stack.Screen name={Routes.BankDeposit} component={BankDeposit} />
      <Stack.Screen
        name={Routes.BankDepositAddNew}
        component={BankDepositAddNew}
      />
      <Stack.Screen
        name={Routes.AccountInviteExpert}
        component={AccountInviteExpert}
      />
      <Stack.Screen
        name={Routes.TopicDetails}
        component={TopicDetails}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Routes.TopicDetailConditions}
        component={TopicDetailConditions}
      />
      <Stack.Screen name={Routes.TopicCreate} component={TopicCreate} />
      <Stack.Screen
        name={Routes.TopicAddCondition}
        component={TopicAddCondition}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Routes.VideoCallConnected}
        component={VideoCallConnected}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Routes.EndCall}
        component={EndCall}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Routes.FinancialEducation}
        component={FinancialEducation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Routes.FreeConsultDetail}
        component={FreeConsultDetail}
      />
      <Stack.Screen name={Routes.Search} component={Search} />
      <Stack.Screen name={Routes.RecentSearch} component={RecentSearch} />
      <Stack.Screen name={Routes.SearchResult} component={SearchResult} />
      <Stack.Screen
        name={Routes.SearchSpecialDoctor}
        component={SearchSpecialDoctor}
      />
      <Stack.Screen
        name={Routes.SearchDoctorResults}
        component={SearchDoctorResults}
      />
      <Stack.Screen
        name={Routes.ConditionsAndSymptoms}
        component={ConditionsAndSymptoms}
      />
      <Stack.Screen
        name={Routes.Medications}
        component={Medications}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Routes.MedicationDetail}
        component={MedicationDetail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Routes.SearchSpecialHospital}
        options={{ headerShown: false }}
        component={SearchSpecialHospital}
      />
      <Stack.Screen
        name={Routes.HospitalDetail}
        options={{ headerShown: false }}
        component={HospitalDetail}
      />
      <Stack.Screen name={Routes.DoctorFilter} component={DoctorFilter} />
      <Stack.Screen name={Routes.FinancialAssessmentQuestionnaire} component={FinancialAssessmentQuestionnaire} />
    </Stack.Navigator>
  );
});

export default RootStack;
