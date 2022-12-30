import EventEmitter from 'eventemitter3';
const eventEmitter = new EventEmitter();
const Emitter = {
  on: (event: string, fn: (data: any) => void) => eventEmitter.on(event, fn),
  onMultiple: (events: string[], fn: (data: any) => void) => {
    events.forEach((event) => {
      eventEmitter.on(event, fn);
    });
  },
  once: (event: string, fn: (data: any) => void) =>
    eventEmitter.once(event, fn),
  off: (event: string) => eventEmitter.off(event),
  offMultiple: (events: string[]) => {
    events.forEach((event) => {
      eventEmitter.off(event);
    });
  },
  emit: (events: string | string[], payload: any = null) => {
    if (typeof events === 'string') {
      eventEmitter.emit(events, payload);
    } else if (Array.isArray(events)) {
      events.forEach((event) => {
        eventEmitter.emit(event, payload);
      });
    }
  },
};
Object.freeze(Emitter);

const EventConstant = {
  LOGOUT: 'LOGOUT',
  TABLE_ROW_CLICK: 'TABLE_ROW_CLICK',
  TABLE_COLUMN_SEARCH_CONFIRM: 'TABLE_COLUMN_SEARCH_CONFIRM',
  TABLE_COLUMN_SEARCH_RESET: 'TABLE_COLUMN_SEARCH_RESET',

  /**
   *
   */
  HEADER_SELECTOR_CHANGE: 'HEADER_SELECTOR_CHANGE',
  HEADER_SEARCH_CLICK: 'HEADER_SEARCH_CLICK',

  SUMMARY_CARD_CLICK: 'SUMMARY_CARD_CLICK',
  SUMMARY_CARD_CLICK_PARENT: 'SUMMARY_CARD_CLICK_PARENT',

  STATIC_TABLE_VALUE_CHANGE: 'STATIC_TABLE_VALUE_CHANGE',
};

export { Emitter, EventConstant };
