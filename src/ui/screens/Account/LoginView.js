import React, {useState, useEffect} from 'react';
import {Keyboard, StyleSheet, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {isSuccess, POST} from '../../../networking';
import urlAPI from '../../../networking/urlAPI';
import actions from '../../../redux/actions';
import commons from '../../commons';
import {ButtonView, InputView, TextView} from '../../components';
import styles from './styles';

var paramsLogin = {};

const LoginView = (props) => {
  let autoFocus = props.autoFocus == undefined ? false : props.autoFocus;
  const [isVerified, setIsVerified] = useState();
  const dispatch = useDispatch();

  const setParamsLogin = ({id, data}) => {
    paramsLogin[id] = data;
    setIsVerified(paramsLogin.username && paramsLogin.password);
  };
  const handleInputVerify = ({id, data}) => {
    if (!data) {
      return false;
    } else {
      return true;
    }
  };
  const handleRequetsLogin = async () => {
    Keyboard.dismiss();
    console.log('handleRequetsLogin -> paramsLogin', paramsLogin);
    let res = await POST(urlAPI.signin, paramsLogin);
    console.log('getUser -> res', res.status);
    if (isSuccess(res)) {
      let data = {
        userId: res.data.user._id,
        token: res.data.token,
        roleId: res.data.user.roleId._id,
      };
      dispatch(actions.responseLoginSuccess(data));
    } else {
      console.log(isSuccess(res), res.response.data);
      alert(res.response.data.msg);
    }
  };

  const navigateToForgotPassword = () => {
    // refDialog && refDialog.hideDialog();
    // AppNavigate.navigateToForgotPasswrodScreen(navigation.dispatch);
  };
  const navigateToRegister = () => {
    // refDialog && refDialog.hideDialog();
    // AppNavigate.navigateToRegisterScreen(navigation.dispatch);
  };

  let refInput = {};
  const focusTheField = (id) => {
    refInput[id].focus();
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View style={styles.containerFormInput}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: commons.fontSizeHeader,
            color: commons.colorMain,
            fontWeight: 'bold',
          }}>
          Đăng nhập
        </Text>
        <InputView
          id={'username'}
          ref={(input) => (refInput['username'] = input)}
          style={{marginTop: 20}}
          onChangeText={setParamsLogin}
          handleInputVerify={handleInputVerify}
          placeholder={'Nhập tên tài khoản'}
          label={'Tài khoản'}
          iconLeft={'user-name'}
          textError={'Không được để trống tài khoản'}
          autoFocus={autoFocus}
          returnKeyType="next"
          onSubmitEditing={() => {
            focusTheField('password');
          }}
          blurOnSubmit={false}
        />
        <InputView
          id={'password'}
          ref={(input) => (refInput['password'] = input)}
          style={{marginTop: 20}}
          placeholder={'Nhập mật khẩu'}
          label={'Mật khẩu'}
          iconLeft={'password-outline'}
          secureTextEntry={true}
          //   isShowClean={false}
          handleInputVerify={handleInputVerify}
          onChangeText={setParamsLogin}
          textError={'Không được để trống mật khẩu'}
        />

        <ButtonView
          onPress={handleRequetsLogin}
          disabled={!isVerified}
          styleDisabled={styles.styleDisabled}
          title={'Đăng nhập'}
          style={styles.styleButtonFocus}
          styleTitle={styles.styleTextButton}
        />
        {/* <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <TextView
            onPress={navigateToRegister}
            style={styles.styleContainrTextLink}
            styleText={styles.styleTextLink}
            styleContainerText={{
              justifyContent: 'center',
            }}>
            {'Chưa có tài khoản'}
          </TextView>
          <TextView
            onPress={navigateToForgotPassword}
            style={[styles.styleContainrTextLink, {justifyContent: 'flex-end'}]}
            styleText={styles.styleTextLink}
            styleContainerText={{
              justifyContent: 'center',
            }}>
            {'Quên mật khẩu?'}
          </TextView>
        </View> */}
      </View>
    </View>
  );
};

export default LoginView;
