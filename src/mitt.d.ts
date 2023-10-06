declare module 'mitt' {
    interface Emitter<T> {
      on(event: string, handler: (payload: T) => void): void;
      off(event: string, handler: (payload: T) => void): void;
      emit(event: string, payload: T): void;
    }
  
    function mitt<T>(): Emitter<T>;
  
    export default mitt;
}
  