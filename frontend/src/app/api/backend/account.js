import { URL_ACTIF_CHOICE, URL_ADMIN_ALL_USER, URL_ADMIN_ARCHIVECOMMENTARY, URL_ADMIN_COMMENTARY, URL_ADMIN_COMMENTARYREPORTED, URL_ADMIN_INFOADMIN, URL_ADMIN_PUTUSER, URL_ADMIN_SEARCHTRAVEL, URL_ADMIN_TRANSACTION, URL_BACK_ADDCAR, URL_BACK_ADD_IMAGE, URL_BACK_ADD_IMAGE_PROFILE, URL_BACK_AUTHENTICATE, URL_BACK_CAR, URL_BACK_CARROUSEL, URL_BACK_CAR_COLOR, URL_BACK_CHANGE_BIO, URL_BACK_CHANGE_PREFERENCE, URL_BACK_CHANGE_PROFILE, URL_BACK_GET_CAR_BY_ID, URL_BACK_GET_CAR_IMAGE, URL_BACK_GET_IMAGE_BY_ID, URL_BACK_IMAGE, URL_BACK_IMAGE_PROFILE, URL_BACK_PROFILE, URL_BACK_REGISTER, URL_BACK_SAVE_TRAVEL, URL_BACK_TRAVELBYUSERID, URL_BACK_USERBOOKINBYUSERID, URL_COMMENTARY_BY_USER, URL_COMMENT_NOTE_INFO, URL_COUNT_TRANSACTION, URL_GET_ACTIF_CHOICE, URL_GET_BOOKING_CONNECT, URL_GET_BOOKING_STATS, URL_GET_TRAVEL_BY_USER_STATUS, URL_GET_TRAVEL_CONNECT, URL_LIST_PASSENGERS, URL_NEW_COMMENTARY, URL_NEW_TRANSACTION, URL_NUMBER_BOOKING, URL_REPORT_COMMENT, URL_RESERVATION, URL_STATS_TRANSACTION, URL_STRIPE, URL_SUM_CREDITS_BUY, URL_SUM_CREDITS_SELL, URL_SUM_CREDITS_USE, URL_TOTAL_NOTE_TRAVEL, URL_TRANSACTION_PROFILE, URL_TRANSACTION_REGISTER, URL_TRAVEL_EXIST, URL_UPDATE_POINTS, URL_USER_CREDITS, URL_USER_ID } from "../../constants/urls/urlBackEnd";
import apiBackEnd from "./api.Backend";
import apiBackendSearch from "./api.BackendSearch";
import apiBackEndUser from "./api.BackendUser";
import apiBackEndCar from "./api.BackendCar";
import apiBackEndTravel from "./api.BackendTravel";
import apiBackEndColorCar from "./api.BackendColorCar";
import apiBackEndImage from "./api.BackendImage";
import apiBackEndCommentary from "./api.BackendCommentary";
import apiBackEndAdmin from "./apiBackendAdmin";
import apiBackEndTransaction from './api.BackendTransaction';
import apiBackEndPayment from "./api.BackendPayment";
import apiBackEndBooking from './api.BackendBooking';
import { URL_ADMIN_USER } from "../../constants/urls/urlFrontEnd";

export function authenticate(values) {
  return apiBackEnd.post(URL_BACK_AUTHENTICATE, values);
}

export function register(values) {
  console.log(values);
  return apiBackEnd.post(URL_BACK_REGISTER, values);
}

export function profile() {
  return apiBackEndUser.get(URL_BACK_PROFILE);
}

export function profileChange(values) { 
  return apiBackEndUser.put(URL_BACK_CHANGE_PROFILE, values);
}

export function preferenceChange(values) {
  return apiBackEndUser.put(URL_BACK_CHANGE_PREFERENCE, values);
}

export function changeBio(values) {
  return apiBackEndUser.put(URL_BACK_CHANGE_BIO, values);
}

export function travelRegister(values) {  
  return apiBackEndTravel.post(URL_BACK_SAVE_TRAVEL, values);
}

export function car(values) {
  console.log(values);
  return apiBackEndCar.get(URL_BACK_CAR, values);
}

export function test() {
  return apiBackendSearch.get(URL_BACK_CARROUSEL);
}

export function colorCar(){
  return apiBackEndColorCar.get(URL_BACK_CAR_COLOR);
}

export function addCar(values) {
  return apiBackEndTravel.post(URL_BACK_ADDCAR, values);
}

export function addImage(values, carId) {
  const url = `${URL_BACK_ADD_IMAGE}?id=${carId}`;
  return apiBackEndTravel.post(url, values);
}

export function addImageProfile(values) {
  console.log(values);
  return apiBackEndTravel.put(URL_BACK_ADD_IMAGE_PROFILE, values);
}

export function image(){
  return apiBackEndImage.get(URL_BACK_IMAGE);
}
export function getImageProfile(){
  return apiBackEndTravel.get(URL_BACK_IMAGE_PROFILE);
}

export function getImageProfileById(id){
const url = `${URL_BACK_GET_IMAGE_BY_ID}/${id}`;
return apiBackEndTravel.get(url);
}

export function getCar(id){
  const url = `${URL_BACK_GET_CAR_BY_ID}/${id}`;
  return apiBackEndTravel.get(url);
}

export function getTravelByUserId(userId, date){
  const url = `${URL_BACK_TRAVELBYUSERID}/${userId}/${date}`;
  return apiBackEndTravel.get(url);
}

export function getImage(id){
  const url = `${URL_BACK_GET_CAR_IMAGE}/${id}`;
  return apiBackEndTravel.get(url);}

// Get the credits of user connect
export function getCredits() {
  return apiBackEndUser.get(URL_USER_CREDITS);
}

export function getId() {
  return apiBackEndUser.get(URL_USER_ID);
}

export function newCommentary(values) {
  return apiBackEndCommentary.post(URL_NEW_COMMENTARY, values);
}

export function updatePoints(value) {
  return apiBackEndUser.put(URL_UPDATE_POINTS, value);
}


export function getUsers() {
  return apiBackEndAdmin.get(URL_ADMIN_ALL_USER);
}

export function getCommentary() {
  return apiBackEndAdmin.get(URL_ADMIN_COMMENTARY);
}

  export function editUser(values, userId) {
    const url = `${URL_ADMIN_PUTUSER}/${userId}`;
    return apiBackEndAdmin.put(url, values);
  } 

export function getTravelAdmin() {
  return apiBackEndAdmin.get(URL_ADMIN_INFOADMIN);
}

export function getArchiveCommentary() {
  return apiBackEndAdmin.get(URL_ADMIN_ARCHIVECOMMENTARY);
}



export function searchTravel(values,reference) {
  const url = `${URL_ADMIN_SEARCHTRAVEL}${reference}`;
  return apiBackEndAdmin.get(url,values);
}

export function getCommentarReported() {
  return apiBackEndAdmin.get(URL_ADMIN_COMMENTARYREPORTED);
}

export function getTransactionAdmin(buy) {
  const url = `${URL_ADMIN_TRANSACTION}?buy=${buy}`;
  return apiBackEndAdmin.get(url);
}

export function getTransactionnalById(userId) {
  const url = `${URL_ADMIN_TRANSACTION}/${userId}`;
  return apiBackEndAdmin.get(url);
}

export function getTransactionProfile() {
  return apiBackEndTransaction.get(URL_TRANSACTION_PROFILE);
}

export function newTransaction(values) {
  return apiBackEndTransaction.post(URL_NEW_TRANSACTION, values);
}

export function getSumCreditsBuy() {
  return apiBackEndTransaction.get(URL_SUM_CREDITS_BUY)
}

export function getSumCreditsSell() {
  return apiBackEndTransaction.get(URL_SUM_CREDITS_SELL)
}

export function getCountTransaction() {
  return apiBackEndTransaction.get(URL_COUNT_TRANSACTION)
}

export function getSumCreditsUse() {
  return apiBackEndTransaction.get(URL_SUM_CREDITS_USE)
}

export function postStripe(values) {
  return apiBackEndPayment.post(URL_STRIPE, values)
}


export function getTravelBngyUserBooking(userId){
  const url = `${URL_BACK_USERBOOKINBYUSERID}/${userId}`;
  return apiBackEndBooking.get(url);
}

export function transactionRegister(values) {
  return apiBackEndTransaction.post(URL_TRANSACTION_REGISTER, values);
}


export function getStatsTransactions() {
  return apiBackEndTransaction.get(URL_STATS_TRANSACTION)
}


export function reportComment(id) {
  const url = `${URL_REPORT_COMMENT}/${id}`;
  return apiBackEndCommentary.put(url);
}


export function getCommentaryByUserId(userId){
  const url = `${URL_COMMENTARY_BY_USER}/${userId}`;
  return apiBackEndCommentary.get(url);
}

export function getReservarions(status, date){
  const url = `${URL_GET_BOOKING_CONNECT}/${status}/${date}`;
  return apiBackEndBooking.get(url);
}

export function getTravelsOfUser(date){
  const url = `${URL_GET_TRAVEL_CONNECT}/${date}`;
  return apiBackEndBooking.get(url);
}

export function getCommentInfoOfUSer(infoId){
  const url = `${URL_COMMENT_NOTE_INFO}/${infoId}`;
  return apiBackEndCommentary.get(url);
}

export function getAllTravelStatusByUserId(userId, status, date){
  const url =`${URL_GET_TRAVEL_BY_USER_STATUS}/${userId}/${status}/${date}`;
  return apiBackEndBooking.get(url);
}

export function getBookingStats() {
  return apiBackEndBooking.get(URL_GET_BOOKING_STATS)
}

export function reservation(value) {
  return apiBackEndBooking.post(URL_RESERVATION, value)
}

export function getNoteOfTravel(infoId) {
  const url = `${URL_TOTAL_NOTE_TRAVEL}/${infoId}`
  return apiBackEndCommentary.get(url)
}

export function getTravelExist(infoId) {
  const url = `${URL_TRAVEL_EXIST}/${infoId}`
  return apiBackEndBooking.get(url)
}

export function getNumberOfBooking(infoId) {
  const url = `${URL_NUMBER_BOOKING}/${infoId}`
  return apiBackEndBooking.get(url)
}

export function choiceActif(choice, values) {
  const url = `${URL_ACTIF_CHOICE}/${choice}`
  return apiBackEndUser.put(url, values)
}

export function getActifChoice() {
  return apiBackEndUser.get(URL_GET_ACTIF_CHOICE)
}

export function getActifChoiceByUser(userId) {
  const url = `${URL_GET_ACTIF_CHOICE}/${userId}`
  return apiBackEndUser.get(url)
}

export function getListPassengers(infoId) {
  const url = `${URL_LIST_PASSENGERS}/${infoId}`
  return apiBackEndBooking.get(url)
}
