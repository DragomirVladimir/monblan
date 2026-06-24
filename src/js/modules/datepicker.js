import flatpickr from 'flatpickr';

const config = {
  wrap: true,
  dateFormat: 'd-m-Y',
  disableMobile: true,
  locale: {
    weekdays: {
      shorthand: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
      longhand: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    },
  },
};

export function initDatepicker() {
  const from = document.querySelector('.js-date-from');
  const to = document.querySelector('.js-date-to');

  if (from) flatpickr(from, { ...config });
  if (to) flatpickr(to, { ...config });
}
