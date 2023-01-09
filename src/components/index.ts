import UniSelect from '@/components/select/UniSelect';
import DatePicker from '@/components/picker/datepicker';
import FastDateSelect from '@/components/fast-dateselect';
import SegmentInput from '@/components/segment-input';
import { UniInput, UniInputNumber } from '@/components/input';
import {
  ProvinceSelector,
  SeparateProvinceSelector,
} from '@/components/province-selector';
import UniTable from '@/components/table';

export const dynamicComponentsMap = {
  UniSelect: UniSelect,
  UniDatePicker: DatePicker,
  UniRangePicker: DatePicker.RangePicker,
  UniProvinceSelector: ProvinceSelector,
  UniProvinceSeparateSelector: SeparateProvinceSelector,
  UniInput: UniInput,
  UniInputNumber: UniInputNumber,
  UniTable: UniTable,
  UniFastDateSelect: FastDateSelect,
  UniSegmentInput: SegmentInput,
};
