import React from 'react';
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import ListUserCompany from '../ListUserCompany_copy';
import {TypeTabReport} from '../TypeTabReport';
const AskDayOffCompany = () => {
  const reportReducer = useSelector((state) => state.reportReducer);
  const {askDayOffInCompany} = reportReducer;
  return (
    <View>
      <ListUserCompany
        typeTab={TypeTabReport.day_off}
        detailData={askDayOffInCompany}
      />
    </View>
  );
};

export default AskDayOffCompany;