import { Dayjs } from 'dayjs';
import dayjsGenerateConfig from '@/utils/dayjs';
import generatePicker from 'antd/es/date-picker/generatePicker';
import 'antd/es/date-picker/style/index';
import React from 'react';

// 目的是用dayjs替代moment

const Datepicker = generatePicker<Dayjs>(dayjsGenerateConfig);

export default Datepicker;
