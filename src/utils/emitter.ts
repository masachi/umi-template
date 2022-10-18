import EventEmitter from 'eventemitter3';
const eventEmitter = new EventEmitter();
const Emitter = {
  on: (event: string, fn: (data: any) => void) => eventEmitter.on(event, fn),
  once: (event: string, fn: (data: any) => void) =>
    eventEmitter.once(event, fn),
  off: (event: string) => eventEmitter.off(event),
  emit: (event: string, payload: any = null) =>
    eventEmitter.emit(event, payload),
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
};

export { Emitter, EventConstant };
