import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Lost from '../views/Lost.vue';
import Found from '../views/Found.vue';
import Profile from '../views/Profile.vue';
import Notifications from '../views/Notifications.vue';
import ReportLost from '../views/ReportLost.vue';
import ReportFound from '../views/ReportFound.vue';
import FoundItForm from '../views/FoundItForm.vue';
import ClaimItForm from '../views/ClaimItForm.vue';
import NotificationPopup from '../components/NotificationPopup.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import ManageFound from '../views/Admin/ManageFound.vue'; 
import AdminHome from '../views/Admin/AdminHome.vue'; 
import ManageLost from '../views/Admin/ManageLost.vue'; 
import ClaimRequest from '../views/Admin/ClaimRequests.vue'; 
import FoundRequest from '../views/Admin/FoundRequest.vue';
import UserManagement from '../views/Admin/UserManagement.vue';
import ClaimHistory from '../views/Admin/ClaimHistory.vue'; // <-- Added this import
import SecondTable from '../components/SecondTable.vue'; // <-- Added this import



const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/lost', name: 'lost', component: Lost },
    { path: '/found', name: 'found', component: Found },
    { path: '/profile', name: 'profile', component: Profile },
    { path: '/notifications', name: 'notifications', component: Notifications },
    { path: '/report-lost', name: 'reportLost', component: ReportLost },
    { path: '/report-found', name: 'reportFound', component: ReportFound },
    { path: '/found-verification', name: 'foundVerification', component: FoundItForm },
    { path: '/claim-it-form', name: 'ClaimItForm', component: ClaimItForm },
    { path: '/notification-popup', name: 'notificationPopup', component: NotificationPopup },
    { path: '/login', name: 'login', component: Login },
    { path: '/register', name: 'register', component: Register },
    { path: '/manage-found', name: 'manageFound', component: ManageFound },
    { path: '/admin-home', name: 'adminHome', component: AdminHome },
    { path: '/manage-lost', name: 'manageLost', component: ManageLost },
    { path: '/claimrequest', name: 'claimRequest', component: ClaimRequest },
    { path: '/foundrequest', name: 'foundRequest', component: FoundRequest }, 
    { path: '/usermanagement', name: 'usermanagement', component: UserManagement }, 
    { path: '/claimhistory', name: 'claimHistory', component: ClaimHistory }, 
    { path: '/secondtable', name: 'secondTable', component: SecondTable }, 

  ]
});

export default router;
