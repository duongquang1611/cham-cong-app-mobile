import API from '.';
import actions from '../redux/actions';

const getDetailCompany = async (companyId, dispatch, params) => {
  try {
    let res = await API.GET(API.detailCompany(companyId), params);
    dispatch(actions.saveDetailCompany(res));
  } catch (error) {
    console.log('Company API error', error);
  }
};
const getListCompanies = async (dispatch, params) => {
  try {
    let res = await API.GET(API.searchCompanies, params);
    dispatch(actions.saveListCompanies(res));
  } catch (error) {
    console.log('Company API error', error);
  }
};
const getListUsers = async (dispatch, params) => {
  try {
    let res = await API.GET(API.searchUsers, params);
    dispatch(actions.saveListUsers(res));
  } catch (error) {
    console.log('Company API error', error);
  }
};

export default {getDetailCompany, getListCompanies, getListUsers};
