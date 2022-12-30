import UniSelect from '@/components/select/UniSelect';
import DatePicker from '@/components/picker/datepicker';
import { UniInput, UniInputNumber } from '@/components/input';
import UniTable from '@/components/table';
import {
  ProvinceSelector,
  SeparateProvinceSelector,
} from '@/components/province-selector';

export const dynamicComponentsMap = {
  UniSelect: UniSelect,
  UniDatePicker: DatePicker,
  UniRangePicker: DatePicker.RangePicker,
  UniProvinceSelector: ProvinceSelector,
  UniProvinceSeparateSelector: SeparateProvinceSelector,
  UniInput: UniInput,
  UniInputNumber: UniInputNumber,
  UniTable: UniTable,
};
